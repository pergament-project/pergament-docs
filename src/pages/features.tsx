import { Page } from "@/components/layout/page";
import { Link } from "@/lib/link";

export function FeaturesPage() {
  return (
    <Page
      title="Features"
      lead="Pergament has today&rsquo;s text, the Bible with a study pane, your library, the meeting material, and your notes and highlights."
    >
      <p>Pergament is a quiet reader for <code>.jwpub</code> publications, with native Linux and portable Windows builds.</p>

      <h2>Home</h2>
      <p>Today&rsquo;s text, favorites, the Teaching Toolbox and What&rsquo;s New. The last two each have their own language. Favorites include all languages in their saved order and are kept in <code>userData.db</code>, with backups and sync.</p>

      <h2>Bible</h2>
      <p>Book tiles, chapter grid and book overviews. `Ctrl+G` goes to a reference such as `Heb 10:24`, and the arrow keys turn chapters. The study pane has the outline, footnotes, cross references, study notes and Research Guide. Bible links open the verses in all your translations side by side.</p>

      <h2>Library</h2>
      <p>The catalog’s publications, video and audio, what you have downloaded, and updates. Recordings play in a built-in player with quality, speed and subtitles.</p>

      <h2>Search</h2>
      <p>Search downloaded publications and Bibles offline, across the library or within a publication. Results open at the matching paragraph or verse. Indexing runs in the background and can take time after downloads; the search view reports incomplete coverage and offers a retry.</p>

      <h2>Meetings</h2>
      <p>The week’s workbook program and Watchtower study article.</p>

      <h2>Personal Study</h2>
      <p>Highlights in six colors, Markdown notes with tags, and bookmarks, all searchable. Notes can move to their own window. There, `Ctrl+L` links a Bible reference and `Ctrl+P` also opens it.</p>

      <h2>Bookmarks</h2>
      <p>The bookmark icon in a publication opens ten colored slots. In the reader, select an empty slot to bookmark the whole section or chapter. Click a verse or paragraph first to bookmark that block instead; click the chapter number, section heading or blank space to target the whole page again. Colored bookmark markers appear beside the saved locations.</p>

      <h2>Backups</h2>
      <p>`.jwlibrary` files, the same format JW Library uses. Restore one, or merge it with your data. Pergament also writes a rolling backup to the `backups` folder in the library folder when you close it and once a day, and keeps the newest ones.</p>

      <h2>Settings</h2>
      <p>English, German, Portuguese (Brazil), French or Italian; light or dark; a centered or full-width layout; an easy-to-read font; and a second display for the year text, recordings and pictures.</p>

      <p>See also: <Link href="/command-line">Command line</Link>, <Link href="/sync">Sync between computers</Link>, <Link href="/before-you-use-it">Before you use it</Link>.</p>
    </Page>
  );
}