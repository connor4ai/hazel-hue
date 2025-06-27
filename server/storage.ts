import { users, orders, userSessions, type User, type InsertUser, type Order, type InsertOrder, type UserSession, type InsertSession } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateStripeCustomerId(userId: number, stripeCustomerId: string): Promise<User>;
  registerUser(email: string, password: string, firstName?: string, lastName?: string): Promise<User>;
  authenticateUser(email: string, password: string): Promise<User | null>;
  
  // Session operations
  createSession(userId: number): Promise<string>;
  getSession(sessionToken: string): Promise<UserSession | undefined>;
  deleteSession(sessionToken: string): Promise<void>;
  getUserFromSession(sessionToken: string): Promise<User | undefined>;

  // Order operations
  getOrder(id: number): Promise<Order | undefined>;
  getOrderByPaymentIntent(paymentIntentId: string): Promise<Order | undefined>;
  getUserOrders(userId: number): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: number, status: string): Promise<Order>;
  updateOrderImages(id: number, images: string[]): Promise<Order>;
  updateOrderAnalysis(id: number, analysisResult: any, pdfPath: string): Promise<Order>;
  updateOrderEmail(id: number, email: string): Promise<Order>;
  updateOrderEmailSent(id: number): Promise<Order>;
  updateOrderPaymentIntent(id: number, paymentIntentId: string): Promise<Order>;
  updateOrderPaymentStatus(id: number, paymentStatus: string): Promise<Order>;
  getAllOrders(): Promise<Order[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateStripeCustomerId(userId: number, stripeCustomerId: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ stripeCustomerId })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async registerUser(email: string, password: string, firstName?: string, lastName?: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);
    const [user] = await db
      .insert(users)
      .values({
        email,
        password: hashedPassword,
        firstName: firstName || null,
        lastName: lastName || null,
      })
      .returning();
    return user;
  }

  async authenticateUser(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if (!user || !user.password) {
      return null;
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    return isValidPassword ? user : null;
  }

  async createSession(userId: number): Promise<string> {
    const sessionToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await db.insert(userSessions).values({
      userId,
      sessionToken,
      expiresAt,
    });

    return sessionToken;
  }

  async getSession(sessionToken: string): Promise<UserSession | undefined> {
    const [session] = await db
      .select()
      .from(userSessions)
      .where(eq(userSessions.sessionToken, sessionToken));
    
    if (!session || session.expiresAt < new Date()) {
      if (session) {
        await this.deleteSession(sessionToken);
      }
      return undefined;
    }
    
    return session;
  }

  async deleteSession(sessionToken: string): Promise<void> {
    await db.delete(userSessions).where(eq(userSessions.sessionToken, sessionToken));
  }

  async getUserFromSession(sessionToken: string): Promise<User | undefined> {
    const session = await this.getSession(sessionToken);
    if (!session) {
      return undefined;
    }
    return this.getUser(session.userId);
  }

  async getOrder(id: number): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order || undefined;
  }

  async getOrderByPaymentIntent(paymentIntentId: string): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.paymentIntentId, paymentIntentId));
    return order || undefined;
  }

  async getUserOrders(userId: number): Promise<Order[]> {
    return db.select().from(orders)
      .where(eq(orders.userId, userId))
      .orderBy(desc(orders.createdAt));
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const [order] = await db
      .insert(orders)
      .values(insertOrder)
      .returning();
    return order;
  }

  async updateOrderStatus(id: number, status: string): Promise<Order> {
    const [order] = await db
      .update(orders)
      .set({ status, updatedAt: new Date() })
      .where(eq(orders.id, id))
      .returning();
    return order;
  }

  async updateOrderImages(id: number, images: string[]): Promise<Order> {
    const [order] = await db
      .update(orders)
      .set({ images, updatedAt: new Date() })
      .where(eq(orders.id, id))
      .returning();
    return order;
  }

  async updateOrderAnalysis(id: number, analysisResult: any, pdfPath: string): Promise<Order> {
    const [order] = await db
      .update(orders)
      .set({ 
        analysisResult, 
        pdfPath, 
        status: 'completed',
        updatedAt: new Date() 
      })
      .where(eq(orders.id, id))
      .returning();
    return order;
  }

  async updateOrderEmailSent(id: number): Promise<Order> {
    const [order] = await db
      .update(orders)
      .set({ emailSent: true, updatedAt: new Date() })
      .where(eq(orders.id, id))
      .returning();
    return order;
  }



  async updateOrderPaymentIntent(id: number, paymentIntentId: string): Promise<Order> {
    const [order] = await db
      .update(orders)
      .set({ paymentIntentId, updatedAt: new Date() })
      .where(eq(orders.id, id))
      .returning();
    return order;
  }

  async updateOrderPaymentStatus(id: number, paymentStatus: string): Promise<Order> {
    const [order] = await db
      .update(orders)
      .set({ paymentStatus, updatedAt: new Date() })
      .where(eq(orders.id, id))
      .returning();
    return order;
  }

  async updateOrderEmail(id: number, email: string): Promise<Order> {
    const [order] = await db
      .update(orders)
      .set({ email, updatedAt: new Date() })
      .where(eq(orders.id, id))
      .returning();
    return order;
  }

  async getAllOrders(): Promise<Order[]> {
    return await db.select().from(orders).orderBy(desc(orders.createdAt));
  }
}

export const storage = new DatabaseStorage();
