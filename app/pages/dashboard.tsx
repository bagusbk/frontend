import { Link } from "wouter";
import { Truck, ArrowRightLeft, Package, Boxes, TrendingUp, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";
import { useStockReport } from "@/hooks/use-transactions";

export default function Dashboard() {
  const { data: stock } = useStockReport();

  // Simple calculation for dashboard stats
  const totalStockItems = stock?.length || 0;
  const totalQuantity = stock?.reduce((acc, curr) => acc + curr.qtyDus * 12 + curr.qtyPcs, 0) || 0;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 p-8 text-white shadow-xl shadow-slate-900/10">
        <div className="relative z-10">
          <h1 className="font-display text-3xl font-bold md:text-4xl">
            Welcome to WMS Lite
          </h1>
          <p className="mt-4 max-w-xl text-slate-300 text-lg">
            Manage your inventory with precision. Track incoming shipments, handle outgoing orders, and monitor stock levels in real-time.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/penerimaan">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-semibold shadow-none border-0">
                <Truck className="mr-2 h-5 w-5" />
                Inbound (Masuk)
              </Button>
            </Link>
            <Link href="/pengeluaran">
              <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10 hover:text-white">
                <ArrowRightLeft className="mr-2 h-5 w-5" />
                Outbound (Keluar)
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Decorative Background Pattern */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-primary/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-40 w-40 rounded-full bg-accent/20 blur-2xl"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Products"
          value={totalStockItems}
          icon={Boxes}
          trend="2.5%"
          trendUp={true}
        />
        <StatCard
          label="Total Items (Pcs)"
          value={totalQuantity}
          icon={Package}
          trend="120 this week"
          trendUp={true}
        />
         <StatCard
          label="Inbound Today"
          value="12"
          icon={TrendingUp}
          className="border-emerald-200/50 bg-emerald-50/30"
        />
        <StatCard
          label="Low Stock Alerts"
          value="3"
          icon={AlertTriangle}
          className="border-amber-200/50 bg-amber-50/30"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
           <h3 className="font-display font-bold text-lg text-slate-800 mb-4">Quick Navigation</h3>
           <div className="grid grid-cols-2 gap-4">
              <Link href="/stock" className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100">
                  <Package className="w-8 h-8 text-primary mb-2" />
                  <span className="font-medium text-slate-700">Stock Report</span>
              </Link>
              <Link href="/penerimaan" className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100">
                  <Truck className="w-8 h-8 text-green-600 mb-2" />
                  <span className="font-medium text-slate-700">Receiving</span>
              </Link>
           </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
           <h3 className="font-display font-bold text-lg text-slate-800 mb-4">System Status</h3>
           <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-100">
                 <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="font-medium text-green-900">Backend API</span>
                 </div>
                 <span className="text-xs text-green-700 font-mono">ONLINE</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                 <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                    <span className="font-medium text-slate-700">Last Sync</span>
                 </div>
                 <span className="text-xs text-slate-500">Just now</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
