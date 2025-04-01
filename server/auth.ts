import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser, insertUserSchema } from "@shared/schema";
import { ZodError } from "zod";

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
  var currentIp: string;
}

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

function validateRequest(data: any) {
  try {
    return insertUserSchema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      const messages = error.errors.map(e => e.message);
      throw new Error(messages.join(", "));
    }
    throw error;
  }
}

export function setupAuth(app: Express) {
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  // Add brute force protection
  let loginAttempts = new Map<string, { count: number; lastAttempt: number }>();

  passport.use(
    new LocalStrategy(async (username: string, password: string, done: (error: any, user?: any, info?: { message: string }) => void) => {
      try {
        // Отримуємо IP з глобальної змінної
        const ip = global.currentIp;
        const attempts = loginAttempts.get(ip) || { count: 0, lastAttempt: 0 };

        // Check for too many attempts
        if (attempts.count >= 5 && Date.now() - attempts.lastAttempt < 15 * 60 * 1000) {
          return done(null, false, { message: "Забагато спроб входу. Спробуйте пізніше." });
        }

        const user = await storage.getUserByUsername(username);
        if (!user || !(await comparePasswords(password, user.password))) {
          // Update login attempts
          loginAttempts.set(ip, {
            count: attempts.count + 1,
            lastAttempt: Date.now()
          });
          return done(null, false, { message: "Невірний логін або пароль" });
        }

        // Reset attempts on successful login
        loginAttempts.delete(ip);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }),
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  // Middleware для збереження IP
  app.use((req, res, next) => {
    global.currentIp = req.ip;
    next();
  });

  app.post("/api/register", async (req, res, next) => {
    try {
      const validatedData = validateRequest({
        ...req.body,
        ipAddress: req.ip,
        registrationIp: req.ip
      });

      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Користувач з таким іменем вже існує" });
      }

      const existingEmail = await storage.getUserByEmail(validatedData.email);
      if (existingEmail) {
        return res.status(400).json({ message: "Ця email адреса вже використовується" });
      }

      // Make user with admin@nexus.com admin
      const isAdmin = validatedData.email === "admin@nexus.com" && validatedData.username === "admin";

      const user = await storage.createUser({
        ...validatedData,
        password: await hashPassword(validatedData.password),
        isAdmin,
      });

      req.login(user, (err) => {
        if (err) return next(err);
        // Don't send password hash in response
        const { password, ...userWithoutPassword } = user;
        res.status(201).json(userWithoutPassword);
      });
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: { message: string } | undefined) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({ message: info?.message || "Невірний логін або пароль" });
      }
      req.login(user, (err) => {
        if (err) return next(err);
        const { password, ...userWithoutPassword } = user;
        res.status(200).json(userWithoutPassword);
      });
    })(req, res, next);
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const { password, ...userWithoutPassword } = req.user;
    res.json(userWithoutPassword);
  });
}