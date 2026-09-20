import { StatCard } from "@/components/stat-card"
import { ChartRevenue } from "@/components/chart-revenue"
import { ChartChannels } from "@/components/chart-channels"
import { RecentOrders } from "@/components/recent-orders"
import { TopProducts } from "@/components/top-products"
import { kpis } from "@/data/mock"

export function PageDashboard() {
  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Resumen general de tu operación de facturación.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
          <StatCard
            key={k.id}
            label={k.label}
            value={k.value}
            delta={k.delta}
            detail={k.detail}
          />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <ChartRevenue />
        <ChartChannels />
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <RecentOrders />
        <TopProducts />
      </section>
    </>
  )
}
