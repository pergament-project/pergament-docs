import { Page } from "@/components/layout/page";
import { Callout } from "@/components/layout/page";

export function BeforeYouUseItPage() {
  return (
    <Page title="Before you use it">
      <Callout tone="warn">
        Pergament is not affiliated with or endorsed by Jehovah&rsquo;s Witnesses or the Watch Tower Bible
        and Tract Society. &quot;JW Library&quot; is their trademark.
      </Callout>

      <ul className="list-disc pl-6 mb-4 text-fg">
        <li><strong>Your own publications only.</strong> The repository contains none.</li>
        <li><strong>Clean-room.</strong> Nothing was decompiled. The file format is documented in <a href="/format">docs/FORMAT.md</a>.</li>
        <li><strong>Encryption.</strong> Pergament decrypts the text in <code>.jwpub</code> files. Depending on where you live, sharing software that does this may be restricted.</li>
        <li><strong>Free, non-commercial, no telemetry.</strong> It only connects to jw.org’s public catalog and download services, and only when you ask it to.</li>
      </ul>

      <p>The project has no permission from the rights holders. Its use is tolerated at most, which can change at any time. Use it at your own risk: it comes without warranty, and you are responsible for checking that your use is lawful where you live.</p>
      <p>The only official builds are the ones on the GitHub releases page.</p>
    </Page>
  );
}