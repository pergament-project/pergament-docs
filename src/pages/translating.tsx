import { Page } from "@/components/layout/page";
import { Link } from "@/lib/link";

export function TranslatingPage() {
  return (
    <Page title="Translating Pergament">
      <p>
        The interface is available in English, German, Portuguese (Brazil), French and Italian.
        Adding another language is one new file and one line in a list. You do not need to know
        TypeScript; the file is a list of English texts with room for yours next to them.
      </p>

      <p>This is about the <strong>interface</strong>. The language of publications is a separate
        choice (the language menu in the top right corner), because the texts of a publication come
        from jw.org.</p>

      <h2>How it works</h2>
      <p>
        Every text in the app is written in English where it is used, for example
        <code>t("Save")</code>. A language file maps those English texts to its own:
      </p>
      <pre>
        export const fr: Record&lt;string, string&gt; = &#123;
  &quot;Save&quot;: &quot;Enregistrer&quot;,
  &quot;Imported &#123;title&#125;&quot;: &quot;&#123;title&#125; importé&quot;,
&#125;;
      </pre>
      <ul className="list-disc pl-6 mb-4 text-fg">
        <li>An empty text (<code>""</code>) or a missing one stays English until someone translates it, so a half-finished translation works.</li>
        <li><code>&#123;title&#125;</code>, <code>&#123;count&#125;</code> and similar markers are filled in by the app. Keep them exactly as they are, but move them wherever your language needs them.</li>
        <li>A few texts begin or end with a space (<code> from &#123;device&#125;</code>, because the app puts them after another text). Keep that space.</li>
      </ul>

      <h2>Add a language</h2>
      <p>You need bun (<code>nix develop</code> in the repository has it).</p>
      <ol className="list-decimal pl-6 mb-4 text-fg">
        <li>
          Make your branch and start the language, with its code, its own name and a{" "}
          <Link href="https://www.w3.org/International/articles/language-tags/">language tag</Link>:
          <pre>
            git switch -c translate-es
bun run i18n:new es &quot;Español&quot; es-ES
          </pre>
          <p>
            For example, this creates <code>ui/src/locales/es.ts</code> with every text still to
            translate and adds the language to <code>ui/src/locales/index.ts</code>. Choose a code
            and syntactically valid BCP 47 tag for your language; the code must not already be
            registered.
          </p>
        </li>
        <li>
          Open <code>ui/src/locales/es.ts</code> and fill in the empty texts. They are grouped by
          screen, in the order they appear in the app. Texts you leave empty stay English.
        </li>
        <li>
          Check your work as often as you like:
          <pre>
            bun run i18n                # how much is translated, and what is wrong
bun run i18n -- --missing   # also lists every text still to do
bun run test --run          # the checks every language must pass
bun run format:locales      # puts the file back into its layout
          </pre>
          <p>
            The i18n check reports duplicate codes and mismatched
            <code>&#123;markers&#125;</code>; the tests also check language-tag syntax and spaces at
            the edges of translated texts. Missing texts are not an error.
          </p>
        </li>
        <li>
          Look at it in the app: <code>bun run tauri dev</code>, then Settings, then the interface
          language. Long texts can be too wide for a button; shorten them if they are.
        </li>
        <li>
          Open a pull request. Changes to <code>main</code> come in through pull requests, so please
          do not push there directly. One language per pull request, with a title such as
          <code>feat: add Spanish translation</code>.
        </li>
      </ol>

      <p>
        Without bun you can do the same by hand: copy <code>ui/src/locales/de.ts</code> to
        <code>ui/src/locales/es.ts</code>, translate the values, rename the exported object, add an
        import and a line to <code>ui/src/locales/index.ts</code>, and run the tests.
      </p>

      <h2>Limits</h2>
      <ul className="list-disc pl-6 mb-4 text-fg">
        <li>
          Dates and week ranges follow the language tag. English and German have hand-written week
          ranges; any other language uses the browser&rsquo;s own format.
        </li>
        <li>
          Relative times ("3 days ago") have one singular and one plural text. A language with more
          plural forms needs a change in the code first; please open an issue.
        </li>
        <li>Right-to-left languages are not supported yet.</li>
      </ul>
    </Page>
  );
}