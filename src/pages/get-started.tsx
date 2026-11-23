import { Page } from "@/components/layout/page";
import { Link } from "@/lib/link";
import { Callout } from "@/components/layout/page";

export function GetStartedPage() {
  return (
    <Page title="Get started">
      <p>Install Pergament, check a release, or file an issue.</p>

      <ul className="list-disc pl-6 mb-4 text-fg">
        <li>
          <Link href="/get-started/install">Install</Link> — Windows, Linux, Mac, Nix, or from source.
        </li>
        <li>
          <Link href="/get-started/releases">Releases</Link> — downloads with SHA-256 digests.
        </li>
        <li>
          <Link href="/get-started/issues">Report a bug or suggest a feature</Link> — file issues on GitHub.
        </li>
      </ul>

      <Callout>
        Need help installing? Start with <Link href="/get-started/install">Install</Link>, then open
        Pergament and run <code>pergament import file.jwpub</code> to add your first publication.
      </Callout>
    </Page>
  );
}