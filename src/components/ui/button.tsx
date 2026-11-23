"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

export function Button({ className, variant = "default", size = "default", ...props }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    default: "bg-brand text-brand-fg hover:opacity-90",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-line text-fg hover:bg-bar",
    secondary: "bg-tile text-fg hover:brightness-95",
    ghost: "text-fg hover:bg-bar",
  } as const;

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3",
    lg: "h-11 px-6 text-base",
    icon: "h-10 w-10 shrink-0 p-0",
  } as const;

  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}