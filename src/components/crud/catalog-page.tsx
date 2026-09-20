import { useState } from "react"

import { StatCard } from "@/components/stat-card"
import { DataTable } from "@/components/crud/data-table"
import {
  EntityFormDialog,
  type FormValues,
} from "@/components/crud/entity-form-dialog"
import type { CrudConfig, Kpi } from "@/components/crud/types"

type CatalogPageProps<T extends { id: string }> = {
  config: CrudConfig<T>
  kpis?: readonly Kpi[]
}

export function CatalogPage<T extends { id: string }>({
  config,
  kpis,
}: CatalogPageProps<T>) {
  const [items, setItems] = useState<T[]>(config.initialData)
  const [dialog, setDialog] = useState<
    { mode: "create" } | { mode: "edit"; row: T } | null
  >(null)

  const nextId = () => {
    const nums = items
      .map((i) => Number.parseInt(i.id.split("-")[1] ?? "0", 10))
      .filter((n) => !Number.isNaN(n))
    const next = (nums.length > 0 ? Math.max(...nums) : 0) + 1
    return `${config.idPrefix}-${String(next).padStart(3, "0")}`
  }

  const handleSave = (values: FormValues) => {
    if (dialog?.mode === "edit") {
      const target = dialog.row
      setItems((prev) =>
        prev.map((i) => (i.id === target.id ? ({ ...i, ...values } as T) : i)),
      )
    } else {
      const item = { ...values, id: nextId() } as unknown as T
      setItems((prev) => [item, ...prev])
    }
  }

  const handleDelete = (row: T) => {
    setItems((prev) => prev.filter((i) => i.id !== row.id))
  }

  const initialValues: FormValues | undefined =
    dialog?.mode === "edit"
      ? Object.fromEntries(
          config.fields.map((f) => [
            f.name,
            String(
              (dialog.row as unknown as Record<string, unknown>)[f.name] ?? "",
            ),
          ]),
        )
      : undefined

  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{config.title}</h1>
        <p className="text-sm text-muted-foreground">{config.description}</p>
      </div>

      {kpis && kpis.length > 0 && (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpis.map((k) => (
            <StatCard
              key={k.id}
              label={k.label}
              value={k.value}
              delta={k.delta}
              detail={k.detail}
            />
          ))}
        </section>
      )}

      <DataTable
        title={`Catálogo de ${config.entityPlural}`}
        description={`${items.length} ${config.entityPlural} registrados`}
        data={items}
        columns={config.columns}
        searchFields={config.fields.map((f) => f.name as keyof T & string)}
        searchPlaceholder={
          config.searchPlaceholder ?? `Buscar ${config.entity.toLowerCase()}…`
        }
        pageSize={config.pageSize}
        entityLabel={config.entity.toLowerCase()}
        onCreate={() => setDialog({ mode: "create" })}
        onEdit={(row) => setDialog({ mode: "edit", row })}
        onDelete={handleDelete}
      />

      <EntityFormDialog
        open={dialog !== null}
        onOpenChange={(open) => {
          if (!open) setDialog(null)
        }}
        mode={dialog?.mode ?? "create"}
        entityLabel={config.entity.toLowerCase()}
        fields={config.fields}
        initialValues={initialValues}
        onSubmit={handleSave}
      />
    </>
  )
}
