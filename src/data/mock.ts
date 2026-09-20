export type Delta = { value: number; label: string }

export const kpis = [
  {
    id: "ingresos",
    label: "Ingresos totales",
    value: "$84,254",
    delta: 12.5,
    detail: "+$2,140 vs. mes anterior",
  },
  {
    id: "pedidos",
    label: "Pedidos",
    value: "3,642",
    delta: 8.2,
    detail: "+275 vs. mes anterior",
  },
  {
    id: "usuarios",
    label: "Usuarios nuevos",
    value: "1,208",
    delta: -3.1,
    detail: "-39 vs. mes anterior",
  },
  {
    id: "conversion",
    label: "Tasa de conversión",
    value: "4.8%",
    delta: 0.6,
    detail: "+0.3 pts vs. mes anterior",
  },
] as const

export const revenueByMonth = [
  { mes: "Ene", ingresos: 4200, gastos: 2400 },
  { mes: "Feb", ingresos: 4800, gastos: 2600 },
  { mes: "Mar", ingresos: 4500, gastos: 2900 },
  { mes: "Abr", ingresos: 5600, gastos: 3100 },
  { mes: "May", ingresos: 6100, gastos: 3400 },
  { mes: "Jun", ingresos: 5900, gastos: 3200 },
  { mes: "Jul", ingresos: 7200, gastos: 3800 },
  { mes: "Ago", ingresos: 8100, gastos: 4100 },
  { mes: "Sep", ingresos: 7600, gastos: 3900 },
  { mes: "Oct", ingresos: 9200, gastos: 4600 },
  { mes: "Nov", ingresos: 10400, gastos: 5200 },
  { mes: "Dic", ingresos: 12654, gastos: 5800 },
]

export const channels = [
  { canal: "Orgánico", visitas: 4820, fill: "var(--color-organico)" },
  { canal: "Directo", visitas: 3150, fill: "var(--color-directo)" },
  { canal: "Redes sociales", visitas: 2470, fill: "var(--color-social)" },
  { canal: "Email", visitas: 1580, fill: "var(--color-email)" },
  { canal: "Referidos", visitas: 940, fill: "var(--color-referidos)" },
]

export type OrderStatus = "pagado" | "pendiente" | "enviado" | "cancelado"

export const orders: {
  id: string
  cliente: string
  email: string
  estado: OrderStatus
  metodo: string
  total: string
}[] = [
  { id: "ORD-7841", cliente: "Lucía Fernández", email: "lucia.f@example.com", estado: "pagado", metodo: "Tarjeta", total: "$249.00" },
  { id: "ORD-7840", cliente: "Marcos Ruiz", email: "m.ruiz@example.com", estado: "enviado", metodo: "PayPal", total: "$129.90" },
  { id: "ORD-7839", cliente: "Ana Torres", email: "ana.torres@example.com", estado: "pendiente", metodo: "Transferencia", total: "$89.50" },
  { id: "ORD-7838", cliente: "Javier Molina", email: "j.molina@example.com", estado: "pagado", metodo: "Tarjeta", total: "$512.00" },
  { id: "ORD-7837", cliente: "Sofía Herrera", email: "sofia.h@example.com", estado: "cancelado", metodo: "Tarjeta", total: "$74.20" },
  { id: "ORD-7836", cliente: "Diego Navarro", email: "d.navarro@example.com", estado: "enviado", metodo: "Stripe", total: "$198.75" },
  { id: "ORD-7835", cliente: "Carmen Ibáñez", email: "c.ibanez@example.com", estado: "pagado", metodo: "PayPal", total: "$330.00" },
]

export const topProducts = [
  { nombre: "Plan Pro Anual", ventas: 1240, ingresos: "$38,400", progreso: 86 },
  { nombre: "Suite Analytics", ventas: 980, ingresos: "$24,500", progreso: 72 },
  { nombre: "Add-on IA Reports", ventas: 645, ingresos: "$12,900", progreso: 58 },
  { nombre: "Plan Starter", ventas: 430, ingresos: "$6,450", progreso: 34 },
  { nombre: "Soporte Premium", ventas: 210, ingresos: "$4,200", progreso: 21 },
]

export type UserRole = "Administrador" | "Editor" | "Vendedor" | "Soporte"
export type UserStatus = "activo" | "suspendido" | "invitado"

export const users: {
  id: string
  nombre: string
  email: string
  rol: UserRole
  estado: UserStatus
  ultimoAcceso: string
}[] = [
  { id: "USR-001", nombre: "Karina Ríos", email: "karina@panel.app", rol: "Administrador", estado: "activo", ultimoAcceso: "Hoy, 09:42" },
  { id: "USR-002", nombre: "Marcos Ruiz", email: "m.ruiz@example.com", rol: "Editor", estado: "activo", ultimoAcceso: "Hoy, 08:15" },
  { id: "USR-003", nombre: "Ana Torres", email: "ana.torres@example.com", rol: "Vendedor", estado: "activo", ultimoAcceso: "Ayer, 18:30" },
  { id: "USR-004", nombre: "Javier Molina", email: "j.molina@example.com", rol: "Editor", estado: "suspendido", ultimoAcceso: "Hace 12 días" },
  { id: "USR-005", nombre: "Sofía Herrera", email: "sofia.h@example.com", rol: "Soporte", estado: "activo", ultimoAcceso: "Hoy, 07:58" },
  { id: "USR-006", nombre: "Diego Navarro", email: "d.navarro@example.com", rol: "Vendedor", estado: "invitado", ultimoAcceso: "Sin acceso" },
  { id: "USR-007", nombre: "Carmen Ibáñez", email: "c.ibanez@example.com", rol: "Editor", estado: "activo", ultimoAcceso: "Ayer, 21:04" },
  { id: "USR-008", nombre: "Luis Peña", email: "l.pena@example.com", rol: "Soporte", estado: "suspendido", ultimoAcceso: "Hace 30 días" },
]

export const userKpis = [
  { id: "total", label: "Usuarios totales", value: "1,208", delta: 8.4, detail: "+94 vs. mes anterior" },
  { id: "activos", label: "Activos", value: "1,092", delta: 5.1, detail: "90.4% del total" },
  { id: "nuevos", label: "Nuevos este mes", value: "94", delta: 12.9, detail: "+11 vs. mes anterior" },
  { id: "suspendidos", label: "Suspendidos", value: "22", delta: -8.0, detail: "-2 vs. mes anterior" },
] as const

export type InvoiceStatus = "timbrada" | "pendiente" | "vencida" | "cancelada"

export const invoices: {
  folio: string
  cliente: string
  fecha: string
  concepto: string
  estado: InvoiceStatus
  monto: string
}[] = [
  { folio: "FAC-2026-0342", cliente: "Grupo Vanta S.A.", fecha: "18 Ago 2026", concepto: "Suscripción anual Pro", estado: "timbrada", monto: "$38,400.00" },
  { folio: "FAC-2026-0341", cliente: "Comercial del Norte", fecha: "17 Ago 2026", concepto: "Suite Analytics", estado: "timbrada", monto: "$12,500.00" },
  { folio: "FAC-2026-0340", cliente: "Laura Méndez", fecha: "16 Ago 2026", concepto: "Plan Starter", estado: "pendiente", monto: "$1,290.00" },
  { folio: "FAC-2026-0339", cliente: "TecnoLogística", fecha: "14 Ago 2026", concepto: "Add-on IA Reports", estado: "timbrada", monto: "$6,450.00" },
  { folio: "FAC-2026-0338", cliente: "Boutique Aura", fecha: "10 Ago 2026", concepto: "Plan Starter", estado: "vencida", monto: "$1,290.00" },
  { folio: "FAC-2026-0337", cliente: "Servicios Kappa", fecha: "05 Ago 2026", concepto: "Soporte Premium", estado: "cancelada", monto: "$4,200.00" },
  { folio: "FAC-2026-0336", cliente: "Distribuidora Sol", fecha: "02 Ago 2026", concepto: "Suite Analytics", estado: "timbrada", monto: "$24,500.00" },
]

export const billingByMonth = [
  { mes: "Mar", facturado: 45200, cobrado: 41800 },
  { mes: "Abr", facturado: 51200, cobrado: 47600 },
  { mes: "May", facturado: 48900, cobrado: 46200 },
  { mes: "Jun", facturado: 56400, cobrado: 53100 },
  { mes: "Jul", facturado: 61800, cobrado: 58900 },
  { mes: "Ago", facturado: 88540, cobrado: 70300 },
]

export const billingKpis = [
  { id: "facturado", label: "Facturado (ago)", value: "$88,540", delta: 43.3, detail: "+$26,740 vs. jul" },
  { id: "por-cobrar", label: "Por cobrar", value: "$18,240", delta: -4.2, detail: "3 facturas pendientes" },
  { id: "emitidas", label: "Facturas emitidas", value: "342", delta: 9.6, detail: "+30 vs. mes anterior" },
  { id: "mrr", label: "MRR", value: "$42,300", delta: 6.8, detail: "Crecimiento sostenido" },
] as const

export type ProductStatus = "activo" | "agotado" | "archivado"

export const products: {
  id: string
  nombre: string
  sku: string
  categoria: string
  precio: string
  stock: string
  estado: ProductStatus
}[] = [
  { id: "PRD-001", nombre: "Plan Pro Anual", sku: "PRO-ANU-01", categoria: "Suscripciones", precio: "3200", stock: "999", estado: "activo" },
  { id: "PRD-002", nombre: "Suite Analytics", sku: "SUI-ANA-02", categoria: "Software", precio: "1250", stock: "999", estado: "activo" },
  { id: "PRD-003", nombre: "Add-on IA Reports", sku: "ADD-IAR-03", categoria: "Software", precio: "450", stock: "128", estado: "activo" },
  { id: "PRD-004", nombre: "Plan Starter", sku: "PLA-STA-04", categoria: "Suscripciones", precio: "290", stock: "999", estado: "activo" },
  { id: "PRD-005", nombre: "Soporte Premium", sku: "SOP-PRE-05", categoria: "Servicios", precio: "200", stock: "0", estado: "agotado" },
  { id: "PRD-006", nombre: "Migración de datos", sku: "MIG-DAT-06", categoria: "Servicios", precio: "5800", stock: "12", estado: "activo" },
  { id: "PRD-007", nombre: "Capacitación on-site", sku: "CAP-ONS-07", categoria: "Servicios", precio: "9500", stock: "4", estado: "activo" },
  { id: "PRD-008", nombre: "Licencia legado v1", sku: "LIC-LGD-08", categoria: "Software", precio: "150", stock: "0", estado: "archivado" },
]

export const productKpis = [
  { id: "total", label: "Productos", value: "248", delta: 4.2, detail: "+10 vs. mes anterior" },
  { id: "activos", label: "Activos", value: "214", delta: 3.1, detail: "86.3% del catálogo" },
  { id: "agotados", label: "Agotados", value: "9", delta: -25.0, detail: "-3 vs. mes anterior" },
  { id: "valor", label: "Valor inventario", value: "$1.2M", delta: 7.7, detail: "Estimado a precio lista" },
] as const
