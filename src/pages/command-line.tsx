import { Page } from "@/components/layout/page";

export function CommandLinePage() {
  return (
    <Page title="Command line">
      <pre>
        pergament import file.jwpub                       # add to the library
pergament list                                    # imported publications
pergament show nwtsty 19:23 &gt; psalm23.html        # a Bible chapter as HTML
pergament grep &apos;living water&apos; --bible           # search the imported publications
pergament search X wachtturm                      # search the catalog
pergament download wp --lang X --issue 20260900   # download and import
      </pre>
      <p>
        The library is in <code>~/.local/share/pergament</code>. You can change it with
        <code>--library</code> or <code>PERGAMENT_LIBRARY</code>.
      </p>
    </Page>
  );
}