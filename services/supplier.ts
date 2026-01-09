import { apiRequest } from "./api";
import { Supplier } from "@/types/supplier";

export const SupplierService = {
  getAll: () => apiRequest<Supplier[]>("/suppliers"),
  getById: (id: number) => apiRequest<Supplier>(`/suppliers/${id}`),
  create: (data: Supplier) =>
    apiRequest<Supplier>("/suppliers", { method: "POST", body: JSON.stringify(data) }),
  update: (id: number, data: Supplier) =>
    apiRequest<Supplier>(`/suppliers/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: number) =>
    apiRequest(`/suppliers/${id}`, { method: "DELETE" }),
};
