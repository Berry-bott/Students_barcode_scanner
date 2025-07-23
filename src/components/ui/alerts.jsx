import * as React from "react"
import { cn } from "./lib/utils"
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  XCircle
} from "lucide-react"

const icons = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
}

const styles = {
  info: "bg-blue-50 text-blue-800 border-blue-200",
  success: "bg-green-50 text-green-800 border-green-200",
  warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
  error: "bg-red-50 text-red-800 border-red-200",
}

function Alert({ variant = "info", title, children, className, ...props }) {
  const Icon = icons[variant]

  return (
    <div
      role="alert"
      className={cn(
        "w-full flex items-start gap-3 border rounded-md p-4 text-sm",
        styles[variant],
        className
      )}
      {...props}
    >
      <Icon className="h-5 w-5 mt-0.5" />
      <div>
        {title && <p className="font-semibold mb-1">{title}</p>}
        {children}
      </div>
    </div>
  )
}

function AlertDescription({ className, children, ...props }) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </p>
  )
}

export { Alert, AlertDescription }
