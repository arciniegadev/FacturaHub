import { Badge } from "@/components/ui/badge"
import { CatalogPage } from "@/components/crud/catalog-page"
import type { CrudConfig } from "@/components/crud/types"
import { products, productKpis, type ProductStatus } from "@/data/mock"

const statusVariant: Record<ProductStatus, string> = {
  activo: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-transparent",
  agotado: "bg-red-500/15 text-red-600 dark:text-red-400 border-transparent",
  archivado: "bg-muted text-muted-foreground border-transparent",
}

type ProductRow = (typeof products)[number]

const config: CrudConfig<ProductRow> = {
  entity: "Producto",
  entityPlural: "productos",
  title: "Productos",
  description: "Administra el catálogo de productos y sus precios.",
  idPrefix: "PRD",
  initialData: products,
  searchPlaceholder: "Buscar por nombre o SKU…",
  columns: [
    {
      header: "Producto",
      render: (p) => (
        <div className="grid">
          <span className="font-medium">{p.nombre}</span>
          <span className="text-xs text-muted-foreground">{p.sku}</span>
        </div>
      ),
    },
    {
      header: "Categoría",
      render: (p) => <Badge variant="secondary">{p.categoria}</Badge>,
    },
    {
      header: "Precio",
      className: "hidden sm:table-cell",
      render: (p) => (
        <span className="tabular-nums">
          ${Number(p.precio).toLocaleString("es-MX")}
        </span>
      ),
    },
    {
      header: "Stock",
      className: "hidden md:table-cell",
      render: (p) => (
        <span className="tabular-nums text-muted-foreground">
          {Number(p.stock).toLocaleString("es-MX")}
        </span>
      ),
    },
    {
      header: "Estado",
      render: (p) => (
        <Badge variant="outline" className={statusVariant[p.estado]}>
          {p.estado[0].toUpperCase() + p.estado.slice(1)}
        </Badge>
      ),
    },
  ],
  fields: [
    { name: "nombre", label: "Nombre", type: "text", required: true, placeholder: "Ej. Plan Business" },
    { name: "sku", label: "SKU", type: "text", required: true, placeholder: "Ej. PLA-BUS-09" },
    {
      name: "categoria",
      label: "Categoría",
      type: "select",
      required: true,
      options: [
        { value: "Suscripciones", label: "Suscripciones" },
        { value: "Software", label: "Software" },
        { value: "Servicios", label: "Servicios" },
      ],
    },
    { name: "precio", label: "Precio (MXN)", type: "number", required: true, placeholder: "0.00" },
    { name: "stock", label: "Existencias", type: "number", required: true, placeholder: "0" },
    {
      name: "estado",
      label: "Estado",
      type: "select",
      required: true,
      options: [
        { value: "activo", label: "Activo" },
        { value: "agotado", label: "Agotado" },
        { value: "archivado", label: "Archivado" },
      ],
    },
  ],
}

export function PageProductos() {
  return <CatalogPage config={config} kpis={productKpis} />
}
