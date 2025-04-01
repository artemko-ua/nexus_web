
import { db } from "./db";
import { users } from "@shared/schema";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function createAdmin() {
  try {
    // Перевіряємо чи адмін вже існує
    const existingAdmin = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.username, "admin")
    });

    if (existingAdmin) {
      console.log("Адміністратор вже існує");
      return;
    }

    // Створюємо адміністратора
    const hashedPassword = await hashPassword("Admin123");
    const adminIp = "127.0.0.1"; // Локальний IP для адміністратора

    await db.insert(users).values({
      username: "admin",
      email: "admin@nexus.com",
      password: hashedPassword,
      ipAddress: adminIp,
      registrationIp: adminIp,
      isAdmin: true,
      registeredAt: new Date()
    });

    console.log("Адміністратора успішно створено");
  } catch (error) {
    console.error("Помилка при створенні адміністратора:", error);
  } finally {
    process.exit(0);
  }
}

createAdmin();
