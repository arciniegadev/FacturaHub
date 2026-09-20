import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CatalogPage } from "@/components/crud/catalog-page"
import type { CrudConfig } from "@/components/crud/types"
import { users, userKpis, type UserStatus } from "@/data/mock"

const statusVariant: Record<UserStatus, string> = {
  activo: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-transparent",
  suspendido: "bg-red-500/15 text-red-600 dark:text-red-400 border-transparent",
  invitado: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-transparent",
}

type UserRow = (typeof users)[number]

const config: CrudConfig<UserRow> = {
  entity: "Usuario",
  entityPlural: "usuarios",
  title: "Usuarios",
  description: "Administra los usuarios y sus permisos de acceso.",
  idPrefix: "USR",
  initialData: users,
  searchPlaceholder: "Buscar por nombre o correo…",
  columns: [
    {
      header: "Usuario",
      render: (u) => (
        <div className="flex items-center gap-3">
          <Avatar className="size-8">
            <AvatarFallback className="text-xs">
              {u.nombre
                .split(" ")
                .map((p) => p[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="grid">
            <span className="font-medium">{u.nombre}</span>
            <span className="text-xs text-muted-foreground">{u.email}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Rol",
      render: (u) => <Badge variant="outline">{u.rol}</Badge>,
    },
    {
      header: "Estado",
      render: (u) => (
        <Badge variant="outline" className={statusVariant[u.estado]}>
          {u.estado[0].toUpperCase() + u.estado.slice(1)}
        </Badge>
      ),
    },
    {
      header: "Último acceso",
      className: "hidden md:table-cell",
      render: (u) => (
        <span className="text-muted-foreground">{u.ultimoAcceso}</span>
      ),
    },
  ],
  fields: [
    { name: "nombre", label: "Nombre completo", type: "text", required: true, placeholder: "Ej. María López" },
    { name: "email", label: "Correo electrónico", type: "email", required: true, placeholder: "maria@panel.app" },
    {
      name: "rol",
      label: "Rol",
      type: "select",
      required: true,
      options: [
        { value: "Administrador", label: "Administrador" },
        { value: "Editor", label: "Editor" },
        { value: "Vendedor", label: "Vendedor" },
        { value: "Soporte", label: "Soporte" },
      ],
    },
    {
      name: "estado",
      label: "Estado",
      type: "select",
      required: true,
      options: [
        { value: "activo", label: "Activo" },
        { value: "invitado", label: "Invitado" },
        { value: "suspendido", label: "Suspendido" },
      ],
    },
    { name: "ultimoAcceso", label: "Último acceso", type: "text", placeholder: "Hoy, 10:30" },
  ],
}

export function PageUsuarios() {
  return <CatalogPage config={config} kpis={userKpis} />
}
