"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ScrollAreaProps {
  className?: string;
  children: React.ReactNode;
}

/** A plain vertical scroll container. Keeps its own background transparent so
 *  the surface behind it shows through. */
export function ScrollArea({ className, children }: ScrollAreaProps) {
  return <div className={cn("overflow-y-auto overflow-x-hidden", className)}>{children}</div>;
}