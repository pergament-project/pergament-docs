import { Page } from "@/components/layout/page";
import { Callout } from "@/components/layout/page";
import { Link } from "@/lib/link";

export function InstallPage() {
  return (
    <Page title="Install Pergament">
      <p>
        Releases are on the <Link href="https://github.com/pergament-project/pergament/releases">releases
        page</Link>. Check every download against the SHA-256 digest shown next to it before installing
        it.
      </p>

      <h2>Windows (x86_64)</h2>
      <p>Extract the portable zip and run <code>pergament-app.exe</code>. The
        {" "}
        <Link href="https://developer.microsoft.com/microsoft-edge/webview2/">WebView2 Runtime</Link>
        {" "}
        is required; it is already installed on most Windows systems.</p>

      <h2>Linux packages (x86_64)</h2>
      <pre>
        sudo apt install ./Pergament-X.Y.Z-linux-x86_64.deb    # Debian, Ubuntu
sudo dnf install ./Pergament-X.Y.Z-linux-x86_64.rpm     # Fedora
./Pergament-X.Y.Z-x86_64.AppImage
flatpak install --user Pergament-X.Y.Z-linux-x86_64.flatpak
      </pre>
      <p>Installing the <code>.deb</code> also adds the Pergament apt repository
        (<code>https://pergament-project.github.io/pergament/apt/</code>), so later versions arrive
        with the normal system update. The repository is signed with the key
        <code>71162C8E5F5EFABAA6ECB400A8001EBD72C3A8BF</code>. <code>sudo apt remove pergament</code>
        removes the repository again; so does <code>apt purge</code>.</p>

      <h2>Linux zip</h2>
      <p>
        Unpack it and run <code>./install.sh</code>. It needs WebKitGTK 4.1, GTK 3, libsoup 3, OpenSSL
        and SQLite. Video needs <code>gst-libav</code> (<code>gstreamer1-libav</code> on Fedora); the
        packages above already include it.
      </p>

      <h2>Mac (Apple Silicon)</h2>
      <p>
        Open the <code>.dmg</code> and drag Pergament to Applications. The app isn&rsquo;t signed, so
        the first time, right-click it and choose Open.
      </p>

      <h2>Nix</h2>
      <pre>nix profile install github:pergament-project/pergament</pre>

      <h2>From source</h2>
      <p>Clone the repository and run <code>scripts/install.sh</code>. It uses Nix if you have it, and
        otherwise builds with cargo and bun. Run it with <code>--dry-run</code> to see what it would
        do.</p>

      <p>The library is in <code>~/.local/share/pergament</code>. You can change it with
        <code>--library</code> or <code>PERGAMENT_LIBRARY</code>.</p>

      <Callout>
        Already installed before the move to the GitHub organization? The old APT address may no
        longer work. Run the install commands above to replace the source and refresh the signing
        key, then run <code>sudo apt update &amp;&amp; sudo apt upgrade</code>.
      </Callout>
    </Page>
  );
}