import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  stripeCustomerId: text("stripe_customer_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  paymentIntentId: text("payment_intent_id").notNull().unique(),
  amount: integer("amount").notNull(), // in cents
  status: text("status").notNull().default("pending"), // pending, paid, processing, completed, failed
  images: jsonb("images"), // array of image file paths
  analysisResult: jsonb("analysis_result"), // color analysis results
  pdfPath: text("pdf_path"), // path to generated PDF
  emailSent: boolean("email_sent").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
});

export const insertOrderSchema = createInsertSchema(orders).pick({
  userId: true,
  paymentIntentId: true,
  amount: true,
  status: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;
