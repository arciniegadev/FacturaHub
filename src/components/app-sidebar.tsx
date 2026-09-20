import {
  CircleHelp,
  FileText,
  LayoutDashboard,
  LifeBuoy,
  Package,
  ReceiptText,
  Settings,
  ShoppingBag,
  Users,
  type LucideIcon,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { NavUser } from "@/components/nav-user"
import { FiraMark } from "@/components/fira-logo"

export type ViewId =
  | "panel"
  | "usuarios"
  | "productos"
  | "pedidos"
  | "reportes"
  | "facturacion"
  | "ajustes"
  | "ayuda"
  | "contacto"

type NavItem = {
  id: ViewId
  title: string
  icon: LucideIcon
}

const general: NavItem[] = [{ id: "panel", title: "Panel", icon: LayoutDashboard }]

const catalogo: NavItem[] = [
  { id: "usuarios", title: "Usuarios", icon: Users },
  { id: "productos", title: "Productos", icon: Package },
]

const procesos: NavItem[] = [
  { id: "pedidos", title: "Pedidos", icon: ShoppingBag },
  { id: "reportes", title: "Reportes", icon: FileText },
]

const modulos: NavItem[] = [
  { id: "facturacion", title: "Facturación", icon: ReceiptText },
]

const soporte: NavItem[] = [
  { id: "ajustes", title: "Ajustes", icon: Settings },
  { id: "ayuda", title: "Ayuda", icon: CircleHelp },
  { id: "contacto", title: "Contacto", icon: LifeBuoy },
]

type AppSidebarProps = {
  view: ViewId
  onViewChange: (view: ViewId) => void
}

export function AppSidebar({ view, onViewChange }: AppSidebarProps) {
  const { isMobile, setOpenMobile } = useSidebar()

  const groups = [
    { label: "General", items: general },
    { label: "Catálogo", items: catalogo },
    { label: "Procesos", items: procesos },
    { label: "Módulos", items: modulos },
    { label: "Soporte", items: soporte },
  ]

  const select = (id: ViewId) => {
    onViewChange(id)
    if (isMobile) setOpenMobile(false)
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <FiraMark variant="transparent" className="size-8 shrink-0" />
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate text-base font-bold tracking-tight">
                    Fira
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    Sistema de facturación
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {groups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={view === item.id}
                      tooltip={item.title}
                      onClick={() => select(item.id)}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
