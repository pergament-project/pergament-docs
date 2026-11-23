import { Link } from "@/lib/link";
import { NAV } from "@/data/nav";
import { useLocation } from "@/lib/router";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const { path } = useLocation();
  return (
    <aside className="hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 border-r border-line bg-bar md:block">
      <ScrollArea className="h-full">
        <nav className="flex flex-col gap-0.5 p-3">
          {NAV.map((item) => (
            <div key={item.href} className="flex flex-col">
              <Link
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium text-muted hover:bg-bar hover:text-fg",
                  path === item.href && "bg-bar text-fg",
                )}
              >
                {item.label}
              </Link>
              {item.items && (
                <div className="ml-3 mt-0.5 flex flex-col gap-0.5 border-l border-line pl-3">
                  {item.items.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className={cn(
                        "rounded-md px-2 py-1.5 text-[13px] text-muted hover:bg-bar hover:text-fg",
                        path === sub.href && "bg-bar text-fg",
                      )}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
}