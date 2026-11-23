import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import { HomePage } from "@/pages/home";
import { GetStartedPage } from "@/pages/get-started";
import { InstallPage } from "@/pages/get-started/install";
import { ReleasesPage } from "@/pages/get-started/releases";
import { IssuesPage } from "@/pages/get-started/issues";
import { ContributePage } from "@/pages/contribute";
import { TranslatingPage } from "@/pages/translating";
import { FormatPage } from "@/pages/format";
import { FeaturesPage } from "@/pages/features";
import { CommandLinePage } from "@/pages/command-line";
import { SyncPage } from "@/pages/sync";
import { BeforeYouUseItPage } from "@/pages/before-you-use-it";
import { NotFoundPage } from "@/pages/not-found";

export type Page = { path: string; title: string; component: ReactNode };

export const PAGES: Record<string, Page> = {
  "/": { path: "/", title: "Home", component: <HomePage /> },
  "/get-started": { path: "/get-started", title: "Get started", component: <GetStartedPage /> },
  "/get-started/install": { path: "/get-started/install", title: "Install", component: <InstallPage /> },
  "/get-started/releases": { path: "/get-started/releases", title: "Releases", component: <ReleasesPage /> },
  "/get-started/issues": { path: "/get-started/issues", title: "Report a bug", component: <IssuesPage /> },
  "/contribute": { path: "/contribute", title: "Contribute", component: <ContributePage /> },
  "/translating": { path: "/translating", title: "Translating", component: <TranslatingPage /> },
  "/format": { path: "/format", title: "File format", component: <FormatPage /> },
  "/features": { path: "/features", title: "Features", component: <FeaturesPage /> },
  "/command-line": { path: "/command-line", title: "Command line", component: <CommandLinePage /> },
  "/sync": { path: "/sync", title: "Sync", component: <SyncPage /> },
  "/before-you-use-it": { path: "/before-you-use-it", title: "Before you use it", component: <BeforeYouUseItPage /> },
  "/not-found": { path: "/not-found", title: "Not found", component: <NotFoundPage /> },
};

function currentPath(): string {
  return window.location.pathname.replace(/\/+$/, "") || "/";
}

export function useLocation() {
  const [path, setPath] = useState(currentPath);

  useEffect(() => {
    const onPop = () => setPath(currentPath());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = (to: string) => {
    history.pushState(null, "", to);
    setPath(to);
  };

  return { path, navigate };
}