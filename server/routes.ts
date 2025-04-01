import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";

function isAdmin(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
  if (!req.isAuthenticated() || !req.user.isAdmin) {
    return res.status(403).json({ message: "Доступ заборонено" });
  }
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Get IP middleware
  app.use((req, res, next) => {
    req.body.ipAddress = req.ip;
    next();
  });

  setupAuth(app);

  // Admin routes
  app.get("/api/admin/users", isAdmin, async (req, res) => {
    const users = await storage.getAllUsers();
    res.json(users);
  });

  app.get("/api/admin/active-users", isAdmin, async (req, res) => {
    const activeUsers = await storage.getActiveUsers();
    res.json(activeUsers);
  });

  // Make first user admin
  app.post("/api/admin/first-setup", async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      if (users.length === 0) {
        return res.status(400).json({ message: "Немає зареєстрованих користувачів" });
      }

      const adminUsers = users.filter(u => u.isAdmin);
      if (adminUsers.length > 0) {
        return res.status(400).json({ message: "Адміністратор вже існує" });
      }

      const firstUser = users[0];
      const admin = await storage.makeAdmin(firstUser.id);
      res.json(admin);
    } catch (error) {
      console.error('Error in first-setup:', error);
      res.status(500).json({ message: "Помилка при створенні адміністратора" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}