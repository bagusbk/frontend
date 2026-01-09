import { z } from "zod";
import { 
  insertSupplierSchema, 
  insertCustomerSchema, 
  insertProductSchema, 
  insertWarehouseSchema,
  trxInFormSchema,
  trxOutFormSchema,
  stockReportSchema
} from "./schema";

export * from "./schema";

export const api = {
  master: {
    suppliers: {
      list: {
        method: "GET",
        path: "/api/suppliers",
        responses: { 200: z.array(insertSupplierSchema) }
      },
    },
    customers: {
      list: {
        method: "GET",
        path: "/api/customers",
        responses: { 200: z.array(insertCustomerSchema) }
      },
    },
    products: {
      list: {
        method: "GET",
        path: "/api/products",
        responses: { 200: z.array(insertProductSchema) }
      },
    },
    warehouses: {
      list: {
        method: "GET",
        path: "/api/warehouses",
        responses: { 200: z.array(insertWarehouseSchema) }
      },
    },
  },
  transactions: {
    in: {
      create: {
        method: "POST",
        path: "/api/trx-in",
        input: trxInFormSchema,
        responses: { 201: z.object({ message: z.string() }) }
      }
    },
    out: {
      create: {
        method: "POST",
        path: "/api/trx-out",
        input: trxOutFormSchema,
        responses: { 201: z.object({ message: z.string() }) }
      }
    }
  },
  reports: {
    stock: {
      get: {
        method: "GET",
        path: "/api/stock-report",
        responses: { 200: z.array(stockReportSchema) }
      }
    }
  }
};
