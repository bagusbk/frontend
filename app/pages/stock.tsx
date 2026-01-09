import { useStockReport } from "@/hooks/use-transactions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Download, Package, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StockPage() {
  const { data: stock, isLoading, isError, refetch } = useStockReport();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-display font-bold text-slate-900">Current Stock</h2>
          <p className="text-slate-500 mt-1">Real-time inventory levels by warehouse</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => refetch()} className="gap-2">
            <RefreshCw className="w-4 h-4" /> Refresh
          </Button>
          <Button variant="secondary" className="gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
        </div>
      </div>

      <Card className="shadow-lg shadow-slate-200/40 border-slate-200/60 overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4">
          <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            Inventory Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="h-12 w-full" />
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="p-12 text-center text-red-500 bg-red-50">
              Failed to load stock data. Please try again.
            </div>
          ) : stock?.length === 0 ? (
             <div className="p-12 text-center text-slate-500">
               No stock data available.
             </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-slate-600">Warehouse</th>
                    <th className="px-6 py-4 font-semibold text-slate-600">Product</th>
                    <th className="px-6 py-4 font-semibold text-slate-600 text-right">Qty (Dus)</th>
                    <th className="px-6 py-4 font-semibold text-slate-600 text-right">Qty (Pcs)</th>
                    <th className="px-6 py-4 font-semibold text-slate-600 text-right">Total Pcs</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {stock?.map((item, i) => (
                    <tr key={i} className="bg-white hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">{item.warehouse}</td>
                      <td className="px-6 py-4 text-slate-700">{item.product}</td>
                      <td className="px-6 py-4 text-right font-mono text-slate-600">{item.qtyDus}</td>
                      <td className="px-6 py-4 text-right font-mono text-slate-600">{item.qtyPcs}</td>
                      <td className="px-6 py-4 text-right">
                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                           {item.qtyDus * 12 + item.qtyPcs} {/* Assuming 1 Dus = 12 Pcs for display purposes, adjust logic if needed */}
                         </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
