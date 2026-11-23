import { Page } from "@/components/layout/page";
import { Link } from "@/lib/link";

export function NotFoundPage() {
  return (
    <Page title="Not found">
      <p>This page doesn’t exist. Go back to <Link href="/">Home</Link>.</p>
    </Page>
  );
}