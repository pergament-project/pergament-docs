import { Page } from "@/components/layout/page";
import { Link } from "@/lib/link";
import { Callout } from "@/components/layout/page";

export function HomePage() {
  return (
    <Page
      title="Pergament documentation"
      lead="Pergament is an unofficial, community-built reader for <code>.jwpub</code> publications. It is not affiliated with or endorsed by Jehovah&rsquo;s Witnesses or the Watch Tower Bible and Tract Society."
    >
      <h2>Get started</h2>
      <ul className="list-disc pl-6 mb-4 text-fg">
        <li>
          <Link href="/get-started/install">Install and use Pergament</Link> — Windows, Linux, Mac, Nix, or from source.
        </li>
        <li>
          <Link href="/get-started/releases">Download a release</Link> — check each download against the SHA-256 digest shown next to it before installing.
        </li>
        <li>
          <Link href="/get-started/issues">Report a bug or suggest a feature</Link> — file issues on GitHub.
        </li>
      </ul>

      <h2>Contribute</h2>
      <ul className="list-disc pl-6 mb-4 text-fg">
        <li>
          <Link href="/contribute">Contributor guide and development setup</Link> — run from source with <code>nix develop</code>, checks, and releasing.
        </li>
        <li>
          <Link href="/translating">Translate the interface</Link> — English, German, Portuguese (Brazil), French and Italian; add another language with one new file and one line in a list.
        </li>
        <li>
          <Link href="/format">File format notes</Link> — what Pergament knows about <code>.jwpub</code> files.
        </li>
      </ul>

      <Callout tone="warn">
        The guides live alongside the code so they can be updated in the same pull request as the
        feature they describe. Contributions from translators and developers on every platform are
        welcome. Please do not include private library data or publication content in public issues.
      </Callout>

      <h2>What Pergament reads</h2>
      <p>
        Today’s text, the Bible with a study pane, your library, the meeting material, and your notes
        and highlights — with native Linux and portable Windows builds, plus an untested build for
        Apple Silicon Macs.
      </p>
      <p>
        Pergament is unofficial. Read <Link href="/before-you-use-it">Before you use it</Link> first.
      </p>
    </Page>
  );
}