import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, type TrxInForm, type TrxOutForm } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

// Transaction Hooks

export function useCreateTrxIn() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: TrxInForm) => {
      const res = await fetch(api.transactions.in.create.path, {
        method: api.transactions.in.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || "Failed to create transaction");
      }
      
      return api.transactions.in.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Receiving transaction recorded successfully.",
      });
      queryClient.invalidateQueries({ queryKey: [api.reports.stock.get.path] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });
}

export function useCreateTrxOut() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: TrxOutForm) => {
      const res = await fetch(api.transactions.out.create.path, {
        method: api.transactions.out.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || "Failed to create transaction");
      }

      return api.transactions.out.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Issuing transaction recorded successfully.",
      });
      queryClient.invalidateQueries({ queryKey: [api.reports.stock.get.path] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });
}

export function useStockReport() {
  return useQuery({
    queryKey: [api.reports.stock.get.path],
    queryFn: async () => {
      const res = await fetch(api.reports.stock.get.path);
      if (!res.ok) throw new Error("Failed to fetch stock report");
      return api.reports.stock.get.responses[200].parse(await res.json());
    },
  });
}
