import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trxOutFormSchema, type TrxOutForm } from "@shared/routes";
import { useCreateTrxOut } from "@/hooks/use-transactions";
import { useCustomers, useProducts } from "@/hooks/use-master-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Plus, Trash2, Save, Loader2, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PengeluaranPage() {
  const [, setLocation] = useLocation();
  const { mutate: createTrx, isPending } = useCreateTrxOut();
  const { data: customers } = useCustomers();
  const { data: products } = useProducts();

  const form = useForm<TrxOutForm>({
    resolver: zodResolver(trxOutFormSchema),
    defaultValues: {
      noTrx: `TRX-OUT-${new Date().getTime()}`,
      date: new Date().toISOString().split('T')[0],
      details: [{ productId: 0, qtyDus: 0, qtyPcs: 0 }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "details"
  });

  const onSubmit = (data: TrxOutForm) => {
    createTrx(data, {
      onSuccess: () => {
        setLocation("/stock");
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-display font-bold text-slate-900">Goods Issuing</h2>
          <p className="text-slate-500 mt-1">Record outgoing stock to customers</p>
        </div>
        <Link href="/">
           <Button variant="outline" className="gap-2">
             <ArrowLeft className="w-4 h-4" /> Back
           </Button>
        </Link>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Header Section */}
          <Card className="shadow-lg shadow-slate-200/40 border-slate-200/60">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
                Transaction Header
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <FormField
                control={form.control}
                name="noTrx"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transaction No.</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="TRX-OUT-..." className="font-mono bg-slate-50" readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer</FormLabel>
                    <Select 
                      onValueChange={(val) => field.onChange(Number(val))} 
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a customer" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {customers?.map((c) => (
                          <SelectItem key={c.id} value={c.id.toString()}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Additional information..." className="resize-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Details Section */}
          <Card className="shadow-lg shadow-slate-200/40 border-slate-200/60 overflow-hidden">
             <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4 flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <span className="w-1 h-6 bg-accent rounded-full"></span>
                Product Details
              </CardTitle>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => append({ productId: 0, qtyDus: 0, qtyPcs: 0 })}
                className="gap-2 text-primary hover:text-primary border-primary/20 hover:bg-primary/5"
              >
                <Plus className="w-4 h-4" /> Add Item
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-3 font-medium w-[40%]">Product</th>
                      <th className="px-6 py-3 font-medium w-[20%]">Qty (Dus)</th>
                      <th className="px-6 py-3 font-medium w-[20%]">Qty (Pcs)</th>
                      <th className="px-6 py-3 font-medium w-[10%] text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {fields.map((field, index) => (
                      <tr key={field.id} className="bg-white hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <FormField
                            control={form.control}
                            name={`details.${index}.productId`}
                            render={({ field }) => (
                              <FormItem>
                                <Select 
                                  onValueChange={(val) => field.onChange(Number(val))} 
                                  value={field.value?.toString() === "0" ? undefined : field.value?.toString()}
                                >
                                  <FormControl>
                                    <SelectTrigger className="border-0 shadow-none bg-transparent hover:bg-slate-100 px-2 -ml-2 h-9">
                                      <SelectValue placeholder="Select Product" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {products?.map((p) => (
                                      <SelectItem key={p.id} value={p.id.toString()}>
                                        {p.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <FormField
                            control={form.control}
                            name={`details.${index}.qtyDus`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    {...field} 
                                    className="h-9 border-slate-200 focus:border-primary"
                                    min={0}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <FormField
                            control={form.control}
                            name={`details.${index}.qtyPcs`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    {...field} 
                                    className="h-9 border-slate-200 focus:border-primary" 
                                    min={0}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </td>
                        <td className="px-6 py-4 text-center">
                          {fields.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => remove(index)}
                              className="text-slate-400 hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end pt-4">
            <Button 
              type="submit" 
              size="lg" 
              disabled={isPending}
              className="bg-orange-600 hover:bg-orange-700 shadow-lg shadow-orange-500/25 min-w-[150px]"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Transaction
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
