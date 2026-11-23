import { Page } from "@/components/layout/page";
import { Link } from "@/lib/link";

export function IssuesPage() {
  return (
    <Page title="Report a bug or suggest a feature">
      <p>
        File issues on GitHub:
        <Link href="https://github.com/pergament-project/pergament/issues/new/choose">
          New issue
        </Link>
        .
      </p>
      <p>Please do not include private library data or publication content in public issues.</p>
    </Page>
  );
}