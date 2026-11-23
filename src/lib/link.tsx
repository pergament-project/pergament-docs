import type { AnchorHTMLAttributes, ReactNode } from "react";
import { useLocation } from "@/lib/router";

interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  children: ReactNode;
}

/** Client-side link: intercepts plain left-clicks and navigates via history, so the SPA works. */
export function Link({ href, children, onClick, ...props }: LinkProps) {
  const { navigate } = useLocation();
  return (
    <a
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        // Only hijack plain left-clicks; respect modifiers, new tabs, downloads.
        if (e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
          e.preventDefault();
          navigate(href);
          window.scrollTo(0, 0);
        }
      }}
      {...props}
    >
      {children}
    </a>
  );
}