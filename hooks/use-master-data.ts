import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

// Master Data Hooks

export function useSuppliers() {
  return useQuery({
    queryKey: [api.master.suppliers.list.path],
    queryFn: async () => {
      const res = await fetch(api.master.suppliers.list.path);
      if (!res.ok) throw new Error("Failed to fetch suppliers");
      return api.master.suppliers.list.responses[200].parse(await res.json());
    },
  });
}

export function useCustomers() {
  return useQuery({
    queryKey: [api.master.customers.list.path],
    queryFn: async () => {
      const res = await fetch(api.master.customers.list.path);
      if (!res.ok) throw new Error("Failed to fetch customers");
      return api.master.customers.list.responses[200].parse(await res.json());
    },
  });
}

export function useProducts() {
  return useQuery({
    queryKey: [api.master.products.list.path],
    queryFn: async () => {
      const res = await fetch(api.master.products.list.path);
      if (!res.ok) throw new Error("Failed to fetch products");
      return api.master.products.list.responses[200].parse(await res.json());
    },
  });
}

export function useWarehouses() {
  return useQuery({
    queryKey: [api.master.warehouses.list.path],
    queryFn: async () => {
      const res = await fetch(api.master.warehouses.list.path);
      if (!res.ok) throw new Error("Failed to fetch warehouses");
      return api.master.warehouses.list.responses[200].parse(await res.json());
    },
  });
}
