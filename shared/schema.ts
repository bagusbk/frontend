import { pgTable, text, serial, integer, date, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { sql } from "drizzle-orm";

// NOTE: This schema is used primarily for Frontend Generation types.
// The Backend is implemented in Golang (see /backend) using GORM/MySQL.

export const suppliers = pgTable("suppliers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const customers = pgTable("customers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const warehouses = pgTable("warehouses", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

// Transactions - In (Penerimaan)
export const trxInHeader = pgTable("trx_in_header", {
  id: serial("id").primaryKey(),
  noTrx: text("no_trx").notNull(),
  date: text("date").notNull(), // YYYY-MM-DD
  supplierId: integer("supplier_id").notNull(),
  notes: text("notes"),
});

export const trxInDetail = pgTable("trx_in_detail", {
  id: serial("id").primaryKey(),
  headerId: integer("header_id").notNull(),
  productId: integer("product_id").notNull(),
  qtyDus: integer("qty_dus").notNull(),
  qtyPcs: integer("qty_pcs").notNull(),
});

// Transactions - Out (Pengeluaran)
export const trxOutHeader = pgTable("trx_out_header", {
  id: serial("id").primaryKey(),
  noTrx: text("no_trx").notNull(),
  date: text("date").notNull(), // YYYY-MM-DD
  customerId: integer("customer_id").notNull(),
  notes: text("notes"),
});

export const trxOutDetail = pgTable("trx_out_detail", {
  id: serial("id").primaryKey(),
  headerId: integer("header_id").notNull(),
  productId: integer("product_id").notNull(),
  qtyDus: integer("qty_dus").notNull(),
  qtyPcs: integer("qty_pcs").notNull(),
});

// Report Type
export const stockReportSchema = z.object({
  warehouse: z.string(),
  product: z.string(),
  qtyDus: z.number(),
  qtyPcs: z.number(),
});

// Insert Schemas
export const insertSupplierSchema = createInsertSchema(suppliers);
export const insertCustomerSchema = createInsertSchema(customers);
export const insertProductSchema = createInsertSchema(products);
export const insertWarehouseSchema = createInsertSchema(warehouses);
export const insertTrxInHeaderSchema = createInsertSchema(trxInHeader);
export const insertTrxInDetailSchema = createInsertSchema(trxInDetail);
export const insertTrxOutHeaderSchema = createInsertSchema(trxOutHeader);
export const insertTrxOutDetailSchema = createInsertSchema(trxOutDetail);

// Combined Form Schemas for Frontend
export const trxInFormSchema = z.object({
  noTrx: z.string(),
  date: z.string(),
  supplierId: z.coerce.number(),
  notes: z.string().optional(),
  details: z.array(z.object({
    productId: z.coerce.number(),
    qtyDus: z.coerce.number(),
    qtyPcs: z.coerce.number(),
  })),
});

export const trxOutFormSchema = z.object({
  noTrx: z.string(),
  date: z.string(),
  customerId: z.coerce.number(),
  notes: z.string().optional(),
  details: z.array(z.object({
    productId: z.coerce.number(),
    qtyDus: z.coerce.number(),
    qtyPcs: z.coerce.number(),
  })),
});

export type TrxInForm = z.infer<typeof trxInFormSchema>;
export type TrxOutForm = z.infer<typeof trxOutFormSchema>;

// === LEGACY/UNUSED (Required for legacy Node backend to compile) ===
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
