{
  description = "Pergament documentation site (Vite + React + Tailwind)";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          name = "pergament-docs-dev";
          nativeBuildInputs = with pkgs; [
            nodejs_22
            bun
            pkg-config
          ];
          shellHook = ''
            echo "Pergament docs dev shell: node $(node --version), bun $(bun --version)"
            echo "Start the dev server with: bun run dev"
          '';
        };

        packages.default = null;
      }
    );
}
