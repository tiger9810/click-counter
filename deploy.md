# Netlifyデプロイ作業記述書（SOW: Statement of Work）

## プロジェクト概要

- **プロジェクト名**: click-counter（複利カウンター）
- **フレームワーク**: Next.js 16.0.1
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS 4
- **ビルドツール**: Turbopack
- **デプロイ先**: Netlify
- **デプロイ方法**: GitHub不要（CLIまたはドラッグ&ドロップ）

---

## 前提条件

- Netlifyアカウント（無料で作成可能: https://app.netlify.com）
- Node.js 18以上がインストール済み
- インターネット接続

---

## デプロイ前の準備

### ステップ1: Next.jsの静的エクスポート設定

このアプリは完全にクライアントサイドのみのため、静的サイトとしてエクスポート可能です。

#### 1.1 `next.config.ts`の修正

`next.config.ts`を以下のように修正します：

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

**変更内容の説明**:
- `output: 'export'`: 静的HTMLファイルとしてエクスポート
- `images: { unoptimized: true }`: 静的エクスポート時は画像最適化を無効化

#### 1.2 ビルドの確認

設定変更後、ローカルでビルドが成功するか確認：

```bash
cd /Users/tiger/Documents/script/counter/click-counter
npm run build
```

ビルドが成功すると、`out`ディレクトリが作成されます。このディレクトリがNetlifyにデプロイするファイルです。

---

## 方法1: Netlify CLIを使ったデプロイ（推奨）

### ステップ1: Netlify CLIのインストール

```bash
npm install -g netlify-cli
```

または、プロジェクトローカルにインストール：

```bash
cd /Users/tiger/Documents/script/counter/click-counter
npm install --save-dev netlify-cli
```

### ステップ2: Netlifyにログイン

```bash
netlify login
```

ブラウザが開き、Netlifyアカウントでログインします。

### ステップ3: プロジェクトの初期化

```bash
cd /Users/tiger/Documents/script/counter/click-counter
netlify init
```

対話形式で以下を設定：

1. **Create & configure a new site**: 新しいサイトを作成
2. **Team**: 個人アカウントまたはチームを選択
3. **Site name**: サイト名を入力（例: `click-counter`）またはEnterで自動生成
4. **Build command**: `npm run build`
5. **Directory to deploy**: `out`（静的エクスポートの出力ディレクトリ）
6. **Netlify functions folder**: Enterでスキップ（このプロジェクトでは不要）

### ステップ4: デプロイの実行

```bash
netlify deploy --prod
```

初回デプロイ時は、ビルドが実行され、デプロイが完了します。

### ステップ5: デプロイURLの確認

デプロイ完了後、以下のようなURLが表示されます：

```
Website URL: https://your-site-name.netlify.app
```

### 今後のデプロイ

設定ファイル（`.netlify/state.json`）が作成されているため、次回以降は：

```bash
netlify deploy --prod
```

を実行するだけでデプロイできます。

### 便利なコマンド

```bash
# プレビューデプロイ（本番環境に反映されない）
netlify deploy

# サイト情報の確認
netlify status

# サイト設定の確認
netlify sites:list
```

---

## 方法2: ドラッグ&ドロップ（Netlify Drop）を使ったデプロイ

### ステップ1: 静的ファイルのビルド

```bash
cd /Users/tiger/Documents/script/counter/click-counter
npm run build
```

ビルドが完了すると、`out`ディレクトリが作成されます。

### ステップ2: Netlify Dropにアクセス

1. ブラウザで https://app.netlify.com/drop にアクセス
2. Netlifyアカウントでログイン（未登録の場合は新規登録）

### ステップ3: ファイルのドラッグ&ドロップ

1. `out`ディレクトリの内容をすべて選択
2. Netlify Dropのエリアにドラッグ&ドロップ
3. 自動的にアップロードとデプロイが開始されます

### ステップ4: デプロイURLの確認

デプロイ完了後、ランダムなURLが生成されます（例: `https://random-name-12345.netlify.app`）

### 注意事項

- ドラッグ&ドロップ方式は、毎回手動でアップロードする必要があります
- サイト名を変更するには、Netlifyダッシュボードで設定が必要です
- 自動デプロイ機能は使用できません

---

## 方法3: Netlifyダッシュボードから手動デプロイ

### ステップ1: サイトの作成

1. https://app.netlify.com にアクセス
2. "Add new site" → "Deploy manually"を選択
3. サイト名を入力（オプション）

### ステップ2: ビルドファイルの準備

```bash
cd /Users/tiger/Documents/script/counter/click-counter
npm run build
```

### ステップ3: ファイルのアップロード

1. `out`ディレクトリをZIPファイルに圧縮
2. NetlifyダッシュボードのデプロイエリアにZIPファイルをドラッグ&ドロップ
3. 自動的に展開とデプロイが開始されます

---

## デプロイ後の設定

### カスタムドメインの設定

1. Netlifyダッシュボード → Site settings → Domain management
2. "Add custom domain"をクリック
3. ドメイン名を入力
4. DNS設定を指示に従って実施

### サイト名の変更

1. Netlifyダッシュボード → Site settings → General
2. "Site details" → "Change site name"
3. 新しいサイト名を入力

### 環境変数の設定（必要な場合）

このプロジェクトでは環境変数は不要ですが、将来的に必要になった場合：

1. Netlifyダッシュボード → Site settings → Environment variables
2. "Add a variable"をクリック
3. 変数名と値を入力

---

## デプロイ前のチェックリスト

### コードの確認

- [ ] `next.config.ts`に`output: 'export'`が設定されている
- [ ] リントエラーがない（`npm run lint`）
- [ ] ビルドが成功する（`npm run build`）
- [ ] `out`ディレクトリが作成されている
- [ ] ローカルで動作確認（`npm run dev`）

### ファイルの確認

- [ ] `.env.local`が`.gitignore`に含まれている（機密情報の漏洩防止）
- [ ] `node_modules`がデプロイ対象に含まれていない
- [ ] `out`ディレクトリの内容が正しい

---

## トラブルシューティング

### ビルドエラー

**問題**: `npm run build`でエラーが発生

**解決策**:
1. `node_modules`を削除して再インストール:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
2. `.next`ディレクトリを削除:
   ```bash
   rm -rf .next out
   ```
3. キャッシュをクリア:
   ```bash
   npm cache clean --force
   ```

### デプロイ後の404エラー

**問題**: デプロイ後、ページが表示されない

**解決策**:
1. `out`ディレクトリの内容を確認
2. `index.html`が存在するか確認
3. Netlifyのビルドログを確認（CLI使用時: `netlify logs`）

### 画像が表示されない

**問題**: 画像が正しく表示されない

**解決策**:
1. `next.config.ts`で`images: { unoptimized: true }`が設定されているか確認
2. 画像のパスが正しいか確認（`/`で始まる絶対パスを使用）

### Netlify CLIのログインエラー

**問題**: `netlify login`が失敗する

**解決策**:
1. ブラウザのポップアップブロッカーを無効化
2. 手動でログイン:
   ```bash
   netlify login --browser
   ```

### 静的エクスポートのエラー

**問題**: `output: 'export'`を設定してもエラーが発生

**解決策**:
1. Next.jsのバージョンを確認（16.0.1で問題なし）
2. サーバーサイド機能（API Routes、getServerSideProps等）を使用していないか確認
3. このプロジェクトは完全にクライアントサイドのみなので問題ありません

---

## デプロイ後の確認事項

- [ ] サイトが正常に表示される
- [ ] すべての機能が動作する（利率入力、初期金額入力、計算等）
- [ ] モバイル表示が正常
- [ ] HTTPSが有効になっている（Netlifyで自動設定）
- [ ] パフォーマンスが良好

---

## 今後の更新方法

### Netlify CLIを使用している場合

```bash
# コードを変更後
npm run build
netlify deploy --prod
```

### ドラッグ&ドロップを使用している場合

1. コードを変更
2. `npm run build`を実行
3. `out`ディレクトリの内容を再度ドラッグ&ドロップ

---

## 参考リンク

- [Netlify公式ドキュメント](https://docs.netlify.com/)
- [Netlify CLIドキュメント](https://cli.netlify.com/)
- [Next.js静的エクスポート](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Netlify Drop](https://app.netlify.com/drop)

---

## 補足: 自動デプロイを設定する場合（オプション）

将来的にGitHubと連携して自動デプロイを設定したい場合：

1. GitHubにリポジトリを作成
2. Netlifyダッシュボード → Site settings → Build & deploy
3. "Link to Git provider"をクリック
4. GitHubアカウントを連携
5. リポジトリを選択
6. ビルド設定:
   - **Build command**: `npm run build`
   - **Publish directory**: `out`

これにより、GitHubにプッシュするたびに自動デプロイが実行されます。
