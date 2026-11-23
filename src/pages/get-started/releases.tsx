import { Page } from "@/components/layout/page";
import { Link } from "@/lib/link";

export function ReleasesPage() {
  return (
    <Page title="Releases">
      <p>
        Downloads are on the <Link href="https://github.com/pergament-project/pergament/releases">releases page</Link>. Check every download against the SHA-256 digest shown next to it before installing it.
      </p>
      <p>
        Versions follow <Link href="https://semver.org">semantic versioning</Link>. A release is made
        through a pull request, as are all changes to <code>main</code>.
      </p>
    </Page>
  );
}