import { pgTable, text, serial, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  ipAddress: varchar("ip_address", { length: 45 }).notNull(),
  registrationIp: varchar("registration_ip", { length: 45 }).notNull(),
  registeredAt: timestamp("registered_at").defaultNow().notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
});

// Enhanced validation schema
export const insertUserSchema = createInsertSchema(users)
  .pick({
    username: true,
    email: true,
    password: true,
    ipAddress: true,
    registrationIp: true,
  })
  .extend({
    username: z.string()
      .min(3, "Нікнейм повинен містити принаймні 3 символи")
      .max(30, "Нікнейм не може бути довшим за 30 символів")
      .regex(/^[a-zA-Z0-9_-]+$/, "Нікнейм може містити лише літери, цифри, - та _"),
    email: z.string()
      .email("Невірна адреса електронної пошти")
      .max(255, "Email не може бути довшим за 255 символів"),
    password: z.string()
      .min(8, "Пароль повинен містити принаймні 8 символів")
      .max(72, "Пароль не може бути довшим за 72 символи")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Пароль повинен містити великі та малі літери, та цифри"),
    ipAddress: z.string()
      .ip({ version: "v4", message: "Невірна IP адреса" })
      .or(z.string().ip({ version: "v6", message: "Невірна IP адреса" })),
  });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;