export interface NavItem {
  label: string;
  href: string;
  items?: { label: string; href: string }[];
}

export const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Get started",
    href: "/get-started",
    items: [
      { label: "Install", href: "/get-started/install" },
      { label: "Releases", href: "/get-started/releases" },
      { label: "Report a bug", href: "/get-started/issues" },
    ],
  },
  { label: "Contribute", href: "/contribute" },
  { label: "Translating", href: "/translating" },
  { label: ".jwpub format", href: "/format" },
  { label: "Features", href: "/features" },
  { label: "Command line", href: "/command-line" },
  { label: "Sync between computers", href: "/sync" },
  { label: "Before you use it", href: "/before-you-use-it" },
];