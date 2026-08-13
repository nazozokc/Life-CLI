{
  description = "Life-CLI — Personal CLI tool";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
    treefmt-nix.url = "github:numtide/treefmt-nix";
  };

  outputs =
    inputs@{
      self,
      nixpkgs,
      flake-parts,
      treefmt-nix,
      ...
    }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "x86_64-darwin"
        "aarch64-darwin"
      ];

      imports = [
        treefmt-nix.flakeModule
      ];

      perSystem =
        { system, ... }:
        let
          pkgs = nixpkgs.legacyPackages.${system};
          # .gitignore に従って node_modules などを除外したソース
          src = pkgs.lib.cleanSource ./apps/life;
        in
        {
          # -----------------------------------------------------------------
          # packages
          # -----------------------------------------------------------------
          packages = {
            default = pkgs.stdenv.mkDerivation {
              pname = "life";
              version = "0.1.0";
              inherit src;

              # bun build --compile は bun 1.3.13 で segfault するため
              # bundle → makeWrapper 方式を採用
              nativeBuildInputs = [ pkgs.makeWrapper ];
              buildInputs = [ pkgs.bun ];

              buildPhase = ''
                bun install --frozen-lockfile
                bun build ./src/index.ts --outfile ./life.js --target bun
              '';

              installPhase = ''
                install -Dm755 life.js $out/libexec/life/life.js
                makeWrapper ${pkgs.bun}/bin/bun $out/bin/life \
                  --add-flags "$out/libexec/life/life.js"
              '';
            };
          };

          # -----------------------------------------------------------------
          # devShell
          # -----------------------------------------------------------------
          # mkShellNoCC: コンパイラ不要の shell なので stdenvNoCC を使い、
          # gcc/binutils 等のダウンロードを避けて direnv の読み込みを高速化する
          devShells.default = pkgs.mkShellNoCC {
            name = "life-cli";
            packages = with pkgs; [ bun ];
            shellHook = ''
              echo "[devShell:life-cli] bun $(bun --version)"
            '';
          };

          # -----------------------------------------------------------------
          # formatter
          # -----------------------------------------------------------------
          treefmt.config = {
            projectRootFile = "flake.nix";
            programs.nixfmt.enable = true;
          };
        };
    };
}
