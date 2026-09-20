import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { orders, type OrderStatus } from "@/data/mock"

const statusVariant: Record<OrderStatus, string> = {
  pagado: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-transparent",
  enviado: "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-transparent",
  pendiente: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-transparent",
  cancelado: "bg-red-500/15 text-red-600 dark:text-red-400 border-transparent",
}

const statusLabel: Record<OrderStatus, string> = {
  pagado: "Pagado",
  enviado: "Enviado",
  pendiente: "Pendiente",
  cancelado: "Cancelado",
}

export function RecentOrders() {
  return (
    <Card className="col-span-full xl:col-span-2">
      <CardHeader>
        <CardTitle>Pedidos recientes</CardTitle>
        <CardDescription>
          Últimos {orders.length} pedidos de la tienda
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pedido</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead className="hidden sm:table-cell">Método</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((o) => (
              <TableRow key={o.id}>
                <TableCell className="font-medium">{o.id}</TableCell>
                <TableCell>
                  <div className="grid">
                    <span>{o.cliente}</span>
                    <span className="hidden text-xs text-muted-foreground md:inline">
                      {o.email}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{o.metodo}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusVariant[o.estado]}>
                    {statusLabel[o.estado]}
                  </Badge>
                </TableCell>
                <TableCell className="text-right tabular-nums">{o.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
