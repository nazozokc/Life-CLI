{
  description = "Life-CLI — Personal CLI tool";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
    treefmt-nix.url = "github:numtide/treefmt-nix";
    # bun.lock → bun.nix を生成し、依存を Nix store からオフライン取得する
    bun2nix.url = "github:nix-community/bun2nix";
  };

  nixConfig = {
    extra-substituters = [ "https://nix-community.cachix.org" ];
    extra-trusted-public-keys = [
      "nix-community.cachix.org-1:mB9FSh9qf2dCimDSUo8Zy7bkq5CX+/rkCWyvRCYg3Fs="
    ];
  };

  outputs =
    inputs@{
      self,
      nixpkgs,
      flake-parts,
      treefmt-nix,
      bun2nix,
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
        {
          system,
          self',
          ...
        }:
        let
          pkgs = nixpkgs.legacyPackages.${system};
          # .gitignore に従って node_modules などを除外したソース
          src = pkgs.lib.cleanSource ./apps/life;
          # package.json を唯一のバージョン情報源にする
          version = (pkgs.lib.importJSON ./apps/life/package.json).version;
          bun2nix' = bun2nix.packages.${system}.bun2nix;
          # bun.nix から作った bun 互換キャッシュ（sandbox 内のオフライン install 用）
          bunDeps = bun2nix'.fetchBunDeps { bunNix = ./apps/life/bun.nix; };
        in
        {
          # -----------------------------------------------------------------
          # packages
          # -----------------------------------------------------------------
          packages.default = pkgs.stdenv.mkDerivation {
            pname = "life";
            inherit src version bunDeps;

            nativeBuildInputs = [
              pkgs.bun
              pkgs.makeWrapper
              bun2nix'.hook
            ];

            # bun2nix の既定ビルド（bun build --compile）は使わない。
            # bun build --compile は bun 1.3.13 で segfault するため
            # bundle → makeWrapper 方式を採用
            dontUseBunBuild = true;
            dontUseBunCheck = true;

            buildPhase = ''
              bun build ./src/index.ts --outfile ./life.js --target bun
            '';

            installPhase = ''
              install -Dm755 life.js $out/libexec/life/life.js
              makeWrapper ${pkgs.bun}/bin/bun $out/bin/life \
                --add-flags "$out/libexec/life/life.js"
            '';

            meta = {
              description = "Personal CLI tool for managing life";
              homepage = "https://github.com/nazozokc/Life-CLI";
              license = pkgs.lib.licenses.mit;
              mainProgram = "life";
              platforms = pkgs.lib.platforms.all;
            };
          };

          # -----------------------------------------------------------------
          # apps
          # -----------------------------------------------------------------
          apps.default = {
            type = "app";
            program = "${pkgs.lib.getExe self'.packages.default}";
          };

          # -----------------------------------------------------------------
          # checks
          # -----------------------------------------------------------------
          checks.tests = pkgs.stdenv.mkDerivation {
            pname = "life-tests";
            inherit src version bunDeps;

            nativeBuildInputs = [
              pkgs.bun
              bun2nix'.hook
            ];

            dontUseBunBuild = true;
            doCheck = true;

            # テストファイルが無いと bun test は exit 1 を返すため、
            # 存在する場合のみ実行する（現在 test/ は空）
            checkPhase = ''
              if find . -type f \( -name "*.test.ts" -o -name "*.spec.ts" \) | grep -q .; then
                bun test
              fi
            '';

            installPhase = ''
              mkdir -p $out
            '';
          };

          # -----------------------------------------------------------------
          # devShell
          # -----------------------------------------------------------------
          # mkShellNoCC: コンパイラ不要の shell なので stdenvNoCC を使い、
          # gcc/binutils 等のダウンロードを避けて direnv の読み込みを高速化する
          devShells.default = pkgs.mkShellNoCC {
            name = "life-cli";
            packages = with pkgs; [
              bun
              treefmt
            ];
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
            programs.prettier.enable = true;
            settings.global.excludes = [
              # bun.lock は trailing comma を含む JSON なので prettier 不可
              "apps/life/bun.lock"
            ];
          };
        };
    };
}
