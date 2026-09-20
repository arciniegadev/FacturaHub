import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { topProducts } from "@/data/mock"

export function TopProducts() {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Productos más vendidos</CardTitle>
        <CardDescription>Ranking por ingresos este trimestre</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5">
        {topProducts.map((p) => (
          <div key={p.nombre} className="grid gap-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{p.nombre}</span>
              <span className="tabular-nums text-muted-foreground">
                {p.ingresos} · {p.ventas.toLocaleString("es-MX")} ventas
              </span>
            </div>
            <Progress value={p.progreso} aria-label={p.nombre} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
