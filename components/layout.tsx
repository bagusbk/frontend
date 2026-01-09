import { Link, useLocation } from "wouter";
import { Package, Truck, ArrowRightLeft, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/penerimaan", label: "Receiving (In)", icon: Truck },
    { href: "/pengeluaran", label: "Issuing (Out)", icon: ArrowRightLeft },
    { href: "/stock", label: "Stock Report", icon: Package },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex-shrink-0 z-10">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg mr-3 shadow-lg shadow-blue-500/20 flex items-center justify-center text-white font-bold font-display">
            W
          </div>
          <span className="font-display font-bold text-xl text-slate-800 tracking-tight">
            WMS Lite
          </span>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href} className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                isActive 
                  ? "bg-primary/10 text-primary shadow-sm" 
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )}>
                <Icon className={cn(
                  "w-5 h-5 transition-colors",
                  isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-600"
                )} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        
        <div className="mt-auto p-6 border-t border-slate-100">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-4 text-white shadow-xl shadow-slate-900/10">
            <h4 className="font-semibold mb-1">Need Help?</h4>
            <p className="text-xs text-slate-300 mb-3">Contact system administrator for support.</p>
            <button className="text-xs bg-white/10 hover:bg-white/20 transition-colors px-3 py-1.5 rounded-lg w-full text-center font-medium border border-white/10">
              Documentation
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10 px-6 flex items-center justify-between">
          <h1 className="font-display font-bold text-lg text-slate-800">
            {navItems.find(i => i.href === location)?.label || "Overview"}
          </h1>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs font-medium text-slate-500">System Online</span>
             </div>
             <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">
                AD
             </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
