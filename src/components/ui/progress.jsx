import * as React from "react"
import { cn } from "./lib/utils"

function Progress({ value = 0, className, color = "bg-primary" }) {
  return (
    <div className={cn("relative w-full h-3 rounded-full bg-muted", className)}>
      <div
        className={cn(
          "absolute h-full rounded-full transition-all duration-300 ease-in-out",
          color
        )}
        style={{ width: `${value}%` }}
      />
    </div>
  )
}

export { Progress }
