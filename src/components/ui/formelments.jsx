import * as React from "react"
import { cn } from "./lib/utils"

// Label component
function Label({ htmlFor, className, children, ...props }) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("block text-sm font-medium text-foreground mb-1", className)}
      {...props}
    >
      {children}
    </label>
  )
}

// Input component
function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
        className
      )}
      {...props}
    />
  )
}

// Checkbox component
function Checkbox({ className, ...props }) {
  return (
    <input
      type="checkbox"
      className={cn(
        "h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary",
        className
      )}
      {...props}
    />
  )
}

export { Label, Input, Checkbox }
