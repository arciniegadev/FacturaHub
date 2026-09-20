import { useEffect, useState } from "react"
import { Bell, Moon, Search, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

const notifications = [
  { title: "Nuevo pedido ORD-7841", time: "hace 2 min" },
  { title: "Stock bajo en “Suite Analytics”", time: "hace 1 h" },
  { title: "3 usuarios nuevos registrados", time: "hace 3 h" },
]

type SiteHeaderProps = {
  title?: string
}

export function SiteHeader({ title }: SiteHeaderProps) {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 !h-4" />
      <span className="text-sm font-medium text-muted-foreground">{title}</span>

      <div className="relative hidden max-w-sm flex-1 md:block">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Buscar…" className="pl-8" />
      </div>

      <div className="ml-auto flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative" aria-label="Notificaciones">
              <Bell />
              <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-red-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <div className="px-2 py-1.5 text-sm font-medium">Notificaciones</div>
            <div className="border-t" />
            {notifications.map((n) => (
              <div key={n.title} className="flex items-start gap-2 px-2 py-2.5 text-sm hover:bg-accent">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <div className="grid gap-0.5">
                  <span>{n.title}</span>
                  <span className="text-xs text-muted-foreground">{n.time}</span>
                </div>
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Cambiar tema"
          onClick={() => setDark((d) => !d)}
        >
          {dark ? <Sun /> : <Moon />}
        </Button>
      </div>
    </header>
  )
}
