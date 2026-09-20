import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { revenueByMonth } from "@/data/mock"

const chartConfig = {
  ingresos: { label: "Ingresos", color: "var(--chart-1)" },
  gastos: { label: "Gastos", color: "var(--chart-4)" },
} satisfies ChartConfig

export function ChartRevenue() {
  return (
    <Card className="col-span-full xl:col-span-2">
      <CardHeader>
        <CardTitle>Ingresos vs. gastos</CardTitle>
        <CardDescription>Enero – Diciembre 2026</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart data={revenueByMonth} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="mes"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `$${Number(value) / 1000}k`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Area
              dataKey="gastos"
              type="natural"
              fill="var(--color-gastos)"
              fillOpacity={0.15}
              stroke="var(--color-gastos)"
              stackId="a"
            />
            <Area
              dataKey="ingresos"
              type="natural"
              fill="var(--color-ingresos)"
              fillOpacity={0.25}
              stroke="var(--color-ingresos)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
