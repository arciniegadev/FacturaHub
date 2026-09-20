import { useEffect, useState } from "react"
import {
  CircleHelp,
  FileText,
  LifeBuoy,
  Settings,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import {
  AppSidebar,
  type ViewId,
} from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { PagePlaceholder } from "@/components/page-placeholder"
import { PageDashboard } from "@/pages/page-dashboard"
import { PageUsuarios } from "@/pages/page-usuarios"
import { PageProductos } from "@/pages/page-productos"
import { PageFacturacion } from "@/pages/page-facturacion"
import { useAuth } from "@/auth/auth-context"
import { LoginPage } from "@/auth/login-page"
import { FiraMark } from "@/components/fira-logo"

const viewTitles: Record<ViewId, string> = {
  panel: "Panel",
  usuarios: "Usuarios",
  productos: "Productos",
  pedidos: "Pedidos",
  reportes: "Reportes",
  facturacion: "Facturación",
  ajustes: "Ajustes",
  ayuda: "Ayuda",
  contacto: "Contacto",
}

const viewMeta: Record<Exclude<ViewId, "panel" | "usuarios" | "productos" | "facturacion">, { icon: LucideIcon; description: string }> = {
  pedidos: { icon: ShoppingBag, description: "Da seguimiento a los pedidos de la tienda." },
  reportes: { icon: FileText, description: "Genera y descarga reportes del negocio." },
  ajustes: { icon: Settings, description: "Configura las preferencias del panel." },
  ayuda: { icon: CircleHelp, description: "Encuentra guías y respuestas rápidas." },
  contacto: { icon: LifeBuoy, description: "Comunícate con el equipo de soporte." },
}

export default function App() {
  const { user, loading } = useAuth()
  const [view, setView] = useState<ViewId>("panel")

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [view])

  if (loading) {
    return (
      <div className="grid min-h-svh place-items-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <FiraMark variant="transparent" className="size-12 animate-pulse text-primary" />
          <p className="text-sm text-muted-foreground">Cargando Fira…</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginPage />
  }

  const meta = view in viewMeta ? viewMeta[view as keyof typeof viewMeta] : undefined

  return (
    <SidebarProvider>
      <AppSidebar view={view} onViewChange={setView} />
      <SidebarInset>
        <SiteHeader title={viewTitles[view]} />

        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
          {view === "panel" && <PageDashboard />}
          {view === "usuarios" && <PageUsuarios />}
          {view === "productos" && <PageProductos />}
          {view === "facturacion" && <PageFacturacion />}
          {meta && (
            <PagePlaceholder
              title={viewTitles[view]}
              description={meta.description}
              icon={meta.icon}
            />
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
