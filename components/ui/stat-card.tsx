import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ElementType;
  trend?: string;
  trendUp?: boolean;
  className?: string;
}

export function StatCard({ label, value, icon: Icon, trend, trendUp, className }: StatCardProps) {
  return (
    <div className={cn(
      "bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow duration-300",
      className
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-2 font-display">{value}</h3>
          {trend && (
            <div className={cn(
              "flex items-center gap-1 mt-2 text-xs font-medium",
              trendUp ? "text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full w-fit" : "text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full w-fit"
            )}>
              {trendUp ? "+" : "-"}{trend}
            </div>
          )}
        </div>
        <div className="p-3 bg-slate-50 rounded-xl">
          <Icon className="w-5 h-5 text-slate-600" />
        </div>
      </div>
    </div>
  );
}
