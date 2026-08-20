# life

タスク・メモ・日記を CLI から管理する個人用ライフ管理ツール。

すべてのデータはローカルの `~/.life/` にプレーンテキスト形式で保存される。エディタで直接編集することもできる。

## 特徴

- **タスク管理** — タスクの追加・編集・削除・一覧表示
- **メモ管理** — Markdown 形式のメモを追加・編集・削除
- **日記** — 日付ごとの Markdown 日記を作成・編集・削除
- **検索** — タスク・メモ・日記を横断してキーワード検索
- **エディタ連携** — 編集は `$EDITOR` でファイルを直接開く
- **データは全てローカル** — `~/.life/` 配下に JSON / Markdown で保存

## インストール

### npm / bun

Node.js 22 以上が必要。

```bash
npm install -g @nazozokc/life
# または
bun add -g @nazozokc/life
```

### Nix flake

```bash
# 一時的に実行
nix run github:nazozokc/Life-CLI

# プロファイルへインストール
nix profile install github:nazozokc/Life-CLI
```

## 使い方

```bash
life <command> <subcommand>
```

### task — タスク管理

タスクは `~/.life/task/*.json` に保存される。

| コマンド | 説明 |
| :------- | :--- |
| `life task add` | タスクを追加（見出し・本文・期限を対話的に入力） |
| `life task edit` | タスクを選択してエディタで編集 |
| `life task del` | タスクを選択して削除 |
| `life task list` | タスク一覧をテーブル表示 |

```bash
$ life task add
? task head 買い物
? task text 牛乳と卵を買う
? goal date 2026-08-21

$ life task list
┌────────┬──────────────────┬────────────┬───────┐
│ head   │ text             │ date       │ done  │
├────────┼──────────────────┼────────────┼───────┤
│ 買い物 │ 牛乳と卵を買う    │ 2026-08-21 │ false │
└────────┴──────────────────┴────────────┴───────┘
```

### note — メモ管理

メモは `~/.life/note/*.md` に保存される。

| コマンド | 説明 |
| :------- | :--- |
| `life note add` | ファイル名を入力してメモを作成しエディタで開く |
| `life note edit` | メモを選択してエディタで編集 |
| `life note del` | メモを複数選択して削除 |

### diary — 日記

日記は `~/.life/diary/YYYY/MM/YYYY-MM-DD.md` に保存される。

| コマンド | 説明 |
| :------- | :--- |
| `life diary add` | 今日の日記を作成しエディタで開く |
| `life diary edit` | 年・月・日を入力して日記を編集 |
| `life diary del` | 年・月・日を入力して日記を削除 |

```bash
$ life diary add
# ~/.life/diary/2026/08/2026-08-20.md がエディタで開く
```

### search — 横断検索

タスク・メモ・日記からキーワードに一致する内容を検索して表示する。

| コマンド | 説明 |
| :------- | :--- |
| `life search string <keyword>` | タスク・メモ・日記を横断してキーワード検索 |

```bash
$ life search string 牛乳
/home/user/.life/note/買い物.md
# 牛乳と卵を買う
```

### ヘルプ / バージョン

```bash
life --help
life --version
```

## データの保存場所

すべてのデータは `~/.life/` 配下に保存される。

```
~/.life/
├── task/            # タスク (JSON)
│   └── <uuid>.json
├── note/            # メモ (Markdown)
│   └── <name>.md
└── diary/           # 日記 (Markdown)
    └── YYYY/
        └── MM/
            └── YYYY-MM-DD.md
```

タスクの JSON は以下の形式。

```json
{
  "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "head": "買い物",
  "text": "牛乳と卵を買う",
  "date": "2026-08-21",
  "done": false,
  "createdAt": "2026-08-20T04:00:00.000Z"
}
```

## 開発

Nix flake の devShell を使う。`direnv` を導入していればリポジトリに入るだけで環境が整う。

```bash
# 依存関係のインストール
bun install

# ビルド (dist/index.mjs を生成)
bun run build

# ローカルで実行
bun run src/index.ts
```

テストは `bun test`。テストファイルは `test/` 以下に置く。

## License

MIT