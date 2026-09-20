import type { ReactNode } from "react"

export type FieldType = "text" | "email" | "number" | "select" | "textarea"

export type FieldOption = { value: string; label: string }

export type FieldDef = {
  name: string
  label: string
  type: FieldType
  required?: boolean
  placeholder?: string
  options?: FieldOption[]
  fullWidth?: boolean
}

export type ColumnDef<T> = {
  header: string
  className?: string
  render: (row: T) => ReactNode
}

export type CrudConfig<T extends { id: string }> = {
  entity: string
  entityPlural: string
  title: string
  description: string
  idPrefix: string
  columns: ColumnDef<T>[]
  fields: FieldDef[]
  initialData: T[]
  searchPlaceholder?: string
  pageSize?: number
}

export type Kpi = {
  id: string
  label: string
  value: string
  delta: number
  detail: string
}
