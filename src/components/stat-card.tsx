import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type StatCardProps = {
  label: string
  value: string
  delta: number
  detail: string
}

export function StatCard({ label, value, delta, detail }: StatCardProps) {
  const positive = delta >= 0

  return (
    <Card>
      <CardHeader>
        <CardDescription>{label}</CardDescription>
        <CardTitle className="text-3xl font-semibold tabular-nums">
          {value}
        </CardTitle>
        <Badge
          variant="outline"
          className={cn(
            "mt-1 w-fit gap-1",
            positive
              ? "text-emerald-600 dark:text-emerald-400 [&>svg]:size-3"
              : "text-red-600 dark:text-red-400 [&>svg]:size-3",
          )}
        >
          {positive ? "▲" : "▼"} {Math.abs(delta)}%
        </Badge>
      </CardHeader>
      <CardFooter className="text-xs text-muted-foreground">{detail}</CardFooter>
    </Card>
  )
}
