"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function Separator({ className, ...props }: { className?: string } & React.HTMLAttributes<HTMLHRElement>) {
  return (
    <hr
      className={cn("my-6 border-y border-line", className)}
      {...props}
    />
  );
}