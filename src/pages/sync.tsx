import { Page } from "@/components/layout/page";

export function SyncPage() {
  return (
    <Page title="Sync between computers">
      <p>
        Settings &gt; Library &amp; data &gt; "Automatic backups and sync" can keep several computers
        in step. Choose a folder that Nextcloud, Syncthing, Dropbox or another sync app already keeps
        in sync. Each computer writes its own file there, merges the files of the others when they
        change, and deletions carry over. Pergament only reads and writes that folder; the sync app
        moves the files.
      </p>

      <h2>What happens on a conflict</h2>
      <ul className="list-disc pl-6 mb-4 text-fg">
        <li>If another computer’s file would delete a lot of your items, nothing is deleted yet. Pergament asks first: "Apply deletions" or "Keep my data". "Keep my data" protects only this computer. To get the items back on the other one, restore a backup there.</li>
        <li>An edit always wins over a deletion. When two computers changed the same item differently, both end up with the same version. "Show conflicts" lists these cases.</li>
        <li>If this computer’s data is lost or reset while sync stays on, it counts as a new computer and gets everything back from the others.</li>
        <li>Restoring a backup, or applying deletions, writes a backup of the data first, even with automatic backups turned off. Restoring also changes the data on the other synced computers, and the restore dialog says so.</li>
        <li>"Stop syncing" leaves the folder as it is and keeps your data. If you start again later, this computer’s data is merged back as new: deletions made on other computers in the meantime aren’t applied here.</li>
      </ul>
    </Page>
  );
}