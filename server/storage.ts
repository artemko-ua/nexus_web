import { User, InsertUser } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  getActiveUsers(): Promise<number>;
  sessionStore: session.Store;
  makeAdmin(userId: number): Promise<User | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  currentId: number;
  sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = {
      ...insertUser,
      id,
      registeredAt: new Date(),
      isAdmin: false // Додаємо поле isAdmin зі значенням false за замовчуванням
    };
    this.users.set(id, user);
    return user;s.set(id, user);
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async getActiveUsers(): Promise<number> {
    return new Promise((resolve) => {
      this.sessionStore.all((err, sessions) => {
        if (err) resolve(0);
        else resolve(Object.keys(sessions || {}).length);
      });
    });
  }

  async makeAdmin(userId: number): Promise<User | undefined> {
    const user = this.users.get(userId);
    if (user) {
      const updatedUser = { ...user, isAdmin: true };
      this.users.set(userId, updatedUser);
      return updatedUser;
    }
    return undefined;
  }
}

export const storage = new MemStorage();