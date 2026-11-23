"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface DropdownMenuProps {
  className?: string;
  children: React.ReactNode;
}

export function DropdownMenu({ className, children }: DropdownMenuProps) {
  return (
    <div
      className={cn("z-50", className)}
    >
      {children}
    </div>
  );
}