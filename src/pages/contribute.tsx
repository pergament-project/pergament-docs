import { Page } from "@/components/layout/page";
import { Callout } from "@/components/layout/page";

export function ContributePage() {
  return (
    <Page title="Contributing">
      <p>
        Pull requests and translations are welcome. Changes to <code>main</code> come in through pull
        requests; please do not push there directly. Keep commits small and use conventional titles
        (<code>feat:</code>, <code>fix:</code>, <code>docs:</code> …). The title of a pull request ends
        up in the release notes, so make it read well as one line.
      </p>

      <h2>Running from source</h2>
      <pre>
        nix develop          # or: direnv allow
bun install
bun run tauri dev
      </pre>
      <p>
        <code>bun run tauri build --debug --no-bundle</code> builds
        <code>target/debug/pergament-app</code> with the frontend embedded. The flake has a dev shell
        and a package (<code>nix build .#pergament</code>) with the desktop app
        <code>pergament-app</code>, its desktop entry and icons, and the command line tool
        <code>pergament</code>. <code>nix run .#pergament</code> starts the app.
      </p>

      <h2>Checks</h2>
      <pre>
        cargo fmt --all --check
cargo clippy --workspace --all-targets -- -D warnings
cargo test --workspace
bun run lint
bun run test --run
bun run i18n
bun run format:locales:check
      </pre>
      <p>
        The language files in <code>ui/src/locales</code> have one fixed layout (one
        <code>"English": "translation",</code> per line, keys quoted);
        <code>bun run format:locales</code> puts them back into it.
      </p>

      <Callout>
        Platform maintainers: see <a href="https://github.com/pergament-project/pergament/blob/main/MAINTAINERS.md">MAINTAINERS.md</a>
        for Windows maintainer permissions, Scoop bucket requirements, and the Windows portable smoke test.
      </Callout>
    </Page>
  );
}