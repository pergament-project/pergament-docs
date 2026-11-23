import { Link } from "@/lib/link";
import { NAV } from "@/data/nav";
import { useLocation } from "@/lib/router";
import { Button } from "@/components/ui/button";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function AppBar({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) {
  const { path } = useLocation();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-3 border-b border-line bg-surface px-4">
      <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen((o) => !o)}>
        {open ? <X size={18} /> : <Menu size={18} />}
      </Button>
      <Link href="/" className="text-[15px] font-semibold text-fg">
        Pergament
      </Link>
      <nav className="ml-auto hidden items-center gap-1 md:flex">
        {NAV.slice(0, 4).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm text-muted hover:bg-bar hover:text-fg",
              path === item.href && "bg-bar text-fg",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </Button>
      {open && (
        <nav className="absolute left-0 right-0 top-14 z-40 flex flex-col gap-1 border-b border-line bg-surface px-4 py-3 md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm text-muted hover:bg-bar hover:text-fg",
                path === item.href && "bg-bar text-fg",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}