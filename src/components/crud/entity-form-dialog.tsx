import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { FieldDef } from "@/components/crud/types"

export type FormValues = Record<string, string>

type EntityFormDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: "create" | "edit"
  entityLabel: string
  fields: FieldDef[]
  initialValues?: FormValues
  onSubmit: (values: FormValues) => void
}

function defaultsFor(fields: FieldDef[]): FormValues {
  return Object.fromEntries(
    fields.map((f) => [
      f.name,
      f.type === "select" ? (f.options?.[0]?.value ?? "") : "",
    ]),
  )
}

export function EntityFormDialog({
  open,
  onOpenChange,
  mode,
  entityLabel,
  fields,
  initialValues,
  onSubmit,
}: EntityFormDialogProps) {
  const [values, setValues] = useState<FormValues>(() =>
    defaultsFor(fields),
  )

  useEffect(() => {
    if (open) {
      setValues({ ...defaultsFor(fields), ...initialValues })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialValues])

  const setValue = (name: string, value: string) =>
    setValues((prev) => ({ ...prev, [name]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(values)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? `Nuevo ${entityLabel}` : `Editar ${entityLabel}`}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? `Completa los datos para registrar un ${entityLabel.toLowerCase()}.`
              : `Modifica los datos del ${entityLabel.toLowerCase()} y guarda los cambios.`}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <div
              key={field.name}
              className={`grid gap-2 ${field.fullWidth ? "sm:col-span-2" : ""}`}
            >
              <Label htmlFor={`field-${field.name}`}>
                {field.label}
                {field.required && <span className="text-destructive"> *</span>}
              </Label>

              {field.type === "select" ? (
                <Select
                  value={values[field.name] ?? ""}
                  onValueChange={(v) => setValue(field.name, v)}
                  required={field.required}
                >
                  <SelectTrigger id={`field-${field.name}`} className="w-full">
                    <SelectValue placeholder={`Selecciona ${field.label.toLowerCase()}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : field.type === "textarea" ? (
                <Textarea
                  id={`field-${field.name}`}
                  value={values[field.name] ?? ""}
                  onChange={(e) => setValue(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                  rows={3}
                />
              ) : (
                <Input
                  id={`field-${field.name}`}
                  type={field.type}
                  value={values[field.name] ?? ""}
                  onChange={(e) => setValue(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                  step="any"
                />
              )}
            </div>
          ))}

          <DialogFooter className="col-span-full mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">
              {mode === "create" ? "Crear" : "Guardar cambios"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
