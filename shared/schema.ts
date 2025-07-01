import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password"), // hashed password
  firstName: text("first_name"),
  lastName: text("last_name"),
  stripeCustomerId: text("stripe_customer_id"),
  emailVerified: boolean("email_verified").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  paymentIntentId: text("payment_intent_id").unique(),
  amount: integer("amount").notNull(), // in cents
  originalAmount: integer("original_amount"), // original price before discount
  promoCodeId: integer("promo_code_id").references(() => promoCodes.id),
  discountAmount: integer("discount_amount").default(0), // discount applied in cents
  status: text("status").notNull().default("pending"), // pending, processing, completed, failed
  paymentStatus: text("payment_status").notNull().default("unpaid"), // unpaid, paid
  email: text("email"), // customer email for guest orders
  images: jsonb("images"), // array of image file paths
  analysisResult: jsonb("analysis_result"), // color analysis results
  pdfPath: text("pdf_path"), // path to generated PDF
  emailSent: boolean("email_sent").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const userSessions = pgTable("user_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  sessionToken: text("session_token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const promoCodes = pgTable("promo_codes", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  discountPercent: integer("discount_percent").notNull(), // 0-100
  discountAmount: integer("discount_amount"), // in cents, alternative to percentage
  isActive: boolean("is_active").default(true),
  expiresAt: timestamp("expires_at"),
  usageLimit: integer("usage_limit"), // null = unlimited
  usageCount: integer("usage_count").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  password: true,
  firstName: true,
  lastName: true,
}).extend({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export const registerUserSchema = insertUserSchema.extend({
  confirmPassword: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const insertOrderSchema = createInsertSchema(orders).pick({
  userId: true,
  paymentIntentId: true,
  amount: true,
  originalAmount: true,
  promoCodeId: true,
  discountAmount: true,
  status: true,
  paymentStatus: true,
}).extend({
  images: z.array(z.string()).optional(),
});

export const insertSessionSchema = createInsertSchema(userSessions).pick({
  userId: true,
  sessionToken: true,
  expiresAt: true,
});

export const insertPromoCodeSchema = createInsertSchema(promoCodes).pick({
  code: true,
  discountPercent: true,
  discountAmount: true,
  isActive: true,
  expiresAt: true,
  usageLimit: true,
});

export const validatePromoCodeSchema = z.object({
  code: z.string().min(1, "Promo code is required"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type RegisterUser = z.infer<typeof registerUserSchema>;
export type LoginUser = z.infer<typeof loginSchema>;
export type User = typeof users.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;
export type UserSession = typeof userSessions.$inferSelect;
export type InsertSession = z.infer<typeof insertSessionSchema>;
export type PromoCode = typeof promoCodes.$inferSelect;
export type InsertPromoCode = z.infer<typeof insertPromoCodeSchema>;
export type ValidatePromoCode = z.infer<typeof validatePromoCodeSchema>;
