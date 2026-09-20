import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { FilePlus2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { StatCard } from "@/components/stat-card"
import {
  billingByMonth,
  billingKpis,
  invoices,
  type InvoiceStatus,
} from "@/data/mock"

const chartConfig = {
  facturado: { label: "Facturado", color: "var(--chart-1)" },
  cobrado: { label: "Cobrado", color: "var(--chart-3)" },
} satisfies ChartConfig

const statusVariant: Record<InvoiceStatus, string> = {
  timbrada: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-transparent",
  pendiente: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-transparent",
  vencida: "bg-red-500/15 text-red-600 dark:text-red-400 border-transparent",
  cancelada: "bg-muted text-muted-foreground border-transparent",
}

export function PageFacturacion() {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Facturación</h1>
          <p className="text-sm text-muted-foreground">
            Emitir, dar seguimiento y conciliar facturas.
          </p>
        </div>
        <Button size="sm">
          <FilePlus2 /> Nueva factura
        </Button>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {billingKpis.map((k) => (
          <StatCard
            key={k.id}
            label={k.label}
            value={k.value}
            delta={k.delta}
            detail={k.detail}
          />
        ))}
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Facturación mensual</CardTitle>
          <CardDescription>Marzo – Agosto 2026 (miles de pesos)</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[280px] w-full">
            <BarChart data={billingByMonth} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="mes" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `$${Number(value) / 1000}k`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="facturado" fill="var(--color-facturado)" radius={4} />
              <Bar dataKey="cobrado" fill="var(--color-cobrado)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Facturas recientes</CardTitle>
          <CardDescription>Últimos documentos emitidos</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Folio</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="hidden md:table-cell">Concepto</TableHead>
                <TableHead className="hidden sm:table-cell">Fecha</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Monto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((f) => (
                <TableRow key={f.folio}>
                  <TableCell className="font-medium">{f.folio}</TableCell>
                  <TableCell>{f.cliente}</TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">
                    {f.concepto}
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground sm:table-cell">
                    {f.fecha}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusVariant[f.estado]}>
                      {f.estado[0].toUpperCase() + f.estado.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{f.monto}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
