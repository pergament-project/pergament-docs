"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ScrollAreaProps {
  className?: string;
  children: React.ReactNode;
}

export function ScrollArea({ className, children }: ScrollAreaProps) {
  return (
    <div
      className={cn("overflow-hidden", "scrollbar-thin scrollbar-track-neutral", className)}
    >
      <div
        className={cn("p-1", "scrollbar-thumb-neutral bg-gray-200 dark:bg-gray-700")}
      >
        {children}
      </div>
    </div>
  );
}