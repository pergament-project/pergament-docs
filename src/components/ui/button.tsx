"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

export function Button({ className, variant = "default", size = "default", asChild = false, ...props }: ButtonProps) {
  const sizeClasses = {
    default: "h-10 py-2 text-sm",
    sm: "h-9 py-1.5 text-sm",
    lg: "h-11 py-3 text-base",
    icon: "h-10 w-10",
  }[size];

  const baseClasses = "inline-flex items-center justify rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variantClasses = {
    default: "bg-background hover:bg-accent active:bg-accent-active disabled:bg-muted",
    destructive: "bg-red-500 hover:bg-red-600 active:bg-red-700",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground active:bg-accent active:text-accent-foreground",
    secondary: "bg-secondary hover:bg-secondary-foreground active:bg-secondary-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  }[variant];

  const sizeValue = size === "icon" ? "h-10 w-10" : sizeClasses;

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses,
        sizeValue,
        "gap-2",
        className,
      )}
      {...props}
    />
  );
}