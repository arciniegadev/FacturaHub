import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { channels } from "@/data/mock"

const chartConfig = {
  visitas: { label: "Visitas" },
  organico: { label: "Orgánico", color: "var(--chart-1)" },
  directo: { label: "Directo", color: "var(--chart-2)" },
  social: { label: "Redes sociales", color: "var(--chart-3)" },
  email: { label: "Email", color: "var(--chart-4)" },
  referidos: { label: "Referidos", color: "var(--chart-5)" },
} satisfies ChartConfig

export function ChartChannels() {
  const total = channels.reduce((acc, c) => acc + c.visitas, 0)

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Tráfico por canal</CardTitle>
        <CardDescription>Últimos 30 días</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto h-[300px] w-full">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={channels}
              dataKey="visitas"
              nameKey="canal"
              innerRadius={60}
              strokeWidth={4}
            />
            <div
              className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
              role="presentation"
            >
              <span className="text-2xl font-semibold tabular-nums">
                {(total / 1000).toFixed(1)}k
              </span>
              <span className="text-xs text-muted-foreground">visitas</span>
            </div>
          </PieChart>
        </ChartContainer>

        <ul className="mt-2 grid gap-1.5 text-sm">
          {channels.map((c) => (
            <li key={c.canal} className="flex items-center gap-2">
              <span
                className="size-2.5 shrink-0 rounded-[2px]"
                style={{ background: c.fill }}
              />
              <span className="text-muted-foreground">{c.canal}</span>
              <span className="ml-auto font-medium tabular-nums">
                {c.visitas.toLocaleString("es-MX")}
              </span>
              <span className="w-12 text-right tabular-nums text-muted-foreground">
                {((c.visitas / total) * 100).toFixed(1)}%
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
