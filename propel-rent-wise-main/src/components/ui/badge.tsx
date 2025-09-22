import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "success" | "destructive";
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ variant = "default", className, ...props }, ref) => {
    const base = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold";
    const variants: Record<string, string> = {
      default: "bg-gray-200 text-gray-800",
      secondary: "bg-blue-200 text-blue-800",
      success: "bg-green-200 text-green-800",
      destructive: "bg-red-200 text-red-800",
    };

    return (
      <div ref={ref} className={cn(base, variants[variant], className)} {...props} />
    );
  }
);

Badge.displayName = "Badge";
