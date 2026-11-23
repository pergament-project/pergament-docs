import { useTheme } from "@/lib/theme";
import { AppBar } from "@/components/layout/app-bar";
import { Sidebar } from "@/components/layout/sidebar";
import { useLocation } from "@/lib/router";
import { PAGES } from "@/lib/router";
import type { ReactNode } from "react";

export function App() {
  const { theme, toggle } = useTheme();
  const { path } = useLocation();
  const page = PAGES[path] ?? PAGES["/not-found"];

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-bg text-fg">
      <AppBar theme={theme} toggleTheme={toggle} />
      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <main className="min-h-0 flex-1 overflow-y-auto px-4 py-8 min-[720px]:px-10">
          <div className="mx-auto max-w-3xl">
            <PageContainer page={page} />
          </div>
        </main>
      </div>
    </div>
  );
}

function PageContainer({ page }: { page: { component: ReactNode } }) {
  return <>{page.component}</>;
}