import { Page } from "@/components/layout/page";
import { Callout } from "@/components/layout/page";

export function FormatPage() {
  return (
    <Page title="The .jwpub format">
      <p>
        What Pergament knows about <code>.jwpub</code> files, where each fact comes from, and how
        sure we are. Everything under "Verified" was checked against real files; everything under
        "Unknown" is explicitly not relied upon.
      </p>

      <Callout>
        This page is a summary of <code>docs/FORMAT.md</code>. The full reference lists sources
        (jwapi, meeting-schedules-parser, own inspection), the SQLite schema, content encoding,
        download services, user data, and merging rules.
      </Callout>

      <h2>Verified</h2>
      <h3>Outer container</h3>
      <ul className="list-disc pl-6 mb-4 text-fg">
        <li>A regular ZIP (deflate). The archive comment is <code>JASPER</code>.</li>
        <li>Exactly two entries: <code>manifest.json</code> and <code>contents</code>.</li>
      </ul>

      <h3>manifest.json</h3>
      <ul className="list-disc pl-6 mb-4 text-fg">
        <li><code>name</code> — file name, <code>&lt;symbol&gt;_&lt;langcode&gt;[_&lt;issue&gt;].jwpub</code>.</li>
        <li><code>hash</code> — SHA-256 of the raw <code>contents</code> entry bytes (hex).</li>
        <li><code>expandedSize</code> — sum of the uncompressed sizes of the entries in <code>contents</code>.</li>
        <li><code>contentFormat</code> — <code>"z-a"</code> in all samples.</li>
        <li><code>publication.fileName</code> — name of the SQLite DB inside <code>contents</code>.</li>
        <li><code>publication.hash</code> — SHA-1 of the extracted <code>.db</code> file (hex).</li>
        <li><code>publication.symbol</code>, <code>.language</code>, <code>.year</code>, <code>.issueId</code>, <code>.title</code>, <code>.publicationType</code>, <code>.type</code> — publication metadata; <code>language</code> is the MEPS language index.</li>
      </ul>

      <h3>contents</h3>
      <ul className="list-disc pl-6 mb-4 text-fg">
        <li>A ZIP using the <strong>store</strong> method (no compression).</li>
        <li>Holds the SQLite DB (<code>publication.fileName</code>) and JPEG images referenced by <code>Multimedia.FilePath</code>.</li>
      </ul>

      <h3>SQLite schema</h3>
      <p>
        <code>schemaVersion</code> 9 in all fixtures. Key tables include <code>Publication</code>,
        <code>Document</code> (encrypted HTML <code>Content</code>), <code>DocumentParagraph</code>,
        <code>PublicationViewItem</code>, <code>Multimedia</code>, <code>Footnote</code>,
        <code>BibleCitation</code>, <code>BibleBook</code> (66 rows), <code>BibleChapter</code> (1189
        rows), <code>BibleVerse</code> (31194 rows, IDs start at 0), <code>VerseCommentary</code>,
        <code>BiblePublication</code>, and <code>Word</code>/<code>SearchIndex*</code>.
      </p>
      <p>Plain-text columns include all <code>Title*</code> columns, <code>BibleVerse.Label</code>,
        <code>Multimedia.Label</code>, and <code>PublicationViewItem.Title</code>.</p>

      <h3>Content encoding</h3>
      <p>
        All of <code>Document.Content</code>, <code>BibleChapter.Content</code>,
        <code>BibleVerse.Content</code>, <code>Footnote.Content</code>, <code>Extract.Content</code>,
        <code>VerseCommentary.Content</code>, and <code>Multimedia.CaptionContent</code> use the same
        scheme.
      </p>
      <ol className="list-decimal pl-6 mb-4 text-fg">
        <li>
          Build the publication card from the <code>Publication</code> row:
          <code>&#123;MepsLanguageIndex&#125;_&#123;Symbol&#125;_&#123;Year&#125;</code>, plus
          <code>_&#123;IssueTagNumber&#125;</code> when the tag is not <code>0</code> or empty.
        </li>
        <li><code>h = SHA-256(card)</code> (one round, UTF-8).</li>
        <li><code>k = h XOR C</code>, where <code>C</code> is a fixed 32-byte constant.</li>
        <li>AES-128-CBC with key <code>k[0..16]</code> and IV <code>k[16..32]</code>, PKCS#7 padding.</li>
        <li>zlib inflate (RFC 1950 header). The result is UTF-8 HTML.</li>
      </ol>

      <h2>Download services</h2>
      <ul className="list-disc pl-6 mb-4 text-fg">
        <li>
          Publication catalog:
          <code>GET https://app.jw-cdn.org/catalogs/publications/v4/manifest.json</code> returns
          <code>&#123;"version": 1, "current": "&lt;uuid&gt;"&#125;</code>. Then
          <code>GET https://app.jw-cdn.org/catalogs/publications/v4/&lt;uuid&gt;/catalog.db.gz</code>
          returns a gzipped SQLite database (58 MB gzipped, 216 MB unpacked).
        </li>
        <li>
          Language list:
          <code>GET https://www.jw.org/en/languages/</code> returns JSON
          <code>&#123;"languages": [...]&#125;</code>. It has no MEPS ids.
        </li>
        <li>
          Download links:
          <code>GET https://b.jw-cdn.org/apis/pub-media/GETPUBMEDIALINKS?output=json&amp;pub=&#123;KeySymbol&#125;&amp;issue=&#123;YYYYMM&#125;&amp;fileformat=JWPUB&amp;alllangs=0&amp;langwritten=&#123;CODE&#125;</code>
          returns <code>files.&#123;CODE&#125;.JWPUB[]</code> with file URLs on
          <code>https://cfp2.jw-cdn.org/</code>.
        </li>
        <li>
          Recordings:
          <code>GET https://b.jw-cdn.org/apis/pub-media/GETPUBMEDIALINKS?output=json&amp;pub=&#123;KeySymbol&#125;&amp;track=&#123;N&#125;&amp;fileformat=MP4&amp;alllangs=0&amp;langwritten=&#123;CODE&#125;</code>
          returns one entry per quality (240p, 360p, …).
        </li>
      </ul>

      <h2>User data (.jwlibrary backups)</h2>
      <p>
        A <code>.jwlibrary</code> backup is a ZIP with <code>manifest.json</code>,
        <code>userData.db</code> and <code>default_thumbnail.png</code>. The database holds
        <code>Location</code>, <code>UserMark</code> (highlights), <code>Note</code>, <code>Tag</code>,
        <code>TagMap</code>, <code>Bookmark</code>, <code>InputField</code>,
        <code>ReadingPlan</code>, and <code>ReadingPlanDay</code> tables.
      </p>
      <p>
        Merge rules: locations are matched by <code>Type</code>, <code>Track</code>,
        <code>KeySymbol</code>, <code>MepsLanguage</code>, <code>IssueTagNumber</code>,
        <code>DocumentId</code>, <code>BookNumber</code>, <code>ChapterNumber</code>. Matching keys
        include <code>UserMarkGuid</code> (highlights), <code>Guid</code> (notes),
        <code>TagMap</code> (tags/favorites), and bookmark slots. Newer rows win; conflicts are
        reported. Folder sync is three-way with a base snapshot.
      </p>

      <h2>Unknown / not relied upon</h2>
      <ul className="list-disc pl-6 mb-4 text-fg">
        <li>What the <code>C</code> constant protects beyond obfuscation.</li>
        <li><code>BibleVerse.AdjustmentInfo</code> meaning.</li>
        <li>Exact semantics of <code>data-xtid</code>, <code>data-bid</code>, <code>data-vlid</code>.</li>
        <li><code>BibleCitation.SortPosition</code>.</li>
        <li>The suffix in publication links like
          <code>jwpub://p/X:1001070144/1-1</code>.</li>
        <li><code>VerseMultimediaMap</code> (media attached to verses) is not shown yet.</li>
      </ul>
    </Page>
  );
}