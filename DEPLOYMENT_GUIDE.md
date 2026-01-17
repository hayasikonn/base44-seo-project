# Base44 SEO Project - Deployment & GitHub Integration Guide

このドキュメントでは、Base44プロジェクトをGitHub、Vercel、Google Search Consoleと連携させるための完全な手順を説明します。

## 目次

1. [GitHub連携](#github連携)
2. [Vercelへのデプロイ](#vercelへのデプロイ)
3. [Google Search Console設定](#google-search-console設定)
4. [SEO最適化チェックリスト](#seo最適化チェックリスト)
5. [トラブルシューティング](#トラブルシューティング)

---

## GitHub連携

### ステップ1: GitHubリポジトリの作成

1. [GitHub](https://github.com)にログイン
2. 右上の「+」アイコン → 「New repository」を選択
3. リポジトリ名: `base44-seo-project`
4. 説明: `Advanced Base64 encoding and data transformation solutions`
5. 「Create repository」をクリック

### ステップ2: ローカルリポジトリをGitHubにプッシュ

```bash
cd /home/ubuntu/base44-seo-project

# GitHubのリモートを設定
git remote add origin https://github.com/YOUR_USERNAME/base44-seo-project.git
git branch -M main
git push -u origin main
```

### ステップ3: 自動デプロイの設定

GitHub Actionsを使用して自動テストとデプロイを設定します。

`.github/workflows/deploy.yml`を作成：

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 10.4.1
      - uses: actions/setup-node@v3
        with:
          node-version: '22'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Build
        run: pnpm build
      
      - name: Deploy to Vercel
        uses: vercel/action@v4
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## Vercelへのデプロイ

### ステップ1: Vercelプロジェクトの作成

1. [Vercel Dashboard](https://vercel.com/dashboard)にアクセス
2. 「Add New...」→ 「Project」を選択
3. GitHubリポジトリ `base44-seo-project` を選択
4. 以下の設定を確認：
   - **Framework Preset**: Other
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`
   - **Install Command**: `pnpm install`

### ステップ2: 環境変数の設定

Vercelプロジェクト設定 → Settings → Environment Variables

以下を追加（必要に応じて）：

```
NODE_ENV=production
```

### ステップ3: カスタムドメインの設定

1. Vercelプロジェクト → Settings → Domains
2. 「Add Domain」をクリック
3. ドメイン名 `www.example-kurieito.com` を入力
4. DNS設定に従ってドメインプロバイダーで設定

**DNS設定例（Vercel推奨）:**

```
Name: www
Type: CNAME
Value: cname.vercel-dns.com
```

### ステップ4: デプロイの確認

```bash
# ローカルでビルドテスト
pnpm build
pnpm preview

# Vercelダッシュボードでデプロイ状態を確認
```

---

## Google Search Console設定

### ステップ1: プロパティの追加

1. [Google Search Console](https://search.google.com/search-console)にアクセス
2. 「プロパティを追加」をクリック
3. **URL プレフィックス**を選択
4. URL: `https://www.example-kurieito.com` を入力

### ステップ2: サイト所有権の確認

#### 方法A: HTMLファイルアップロード（推奨）

1. Google Search Consoleから提供されたHTMLファイルをダウンロード
2. ファイルを `client/public/` に配置
3. Vercelにデプロイ
4. Google Search Consoleで「確認」をクリック

#### 方法B: メタタグ

既に `client/index.html` に以下のメタタグが含まれています：

```html
<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
```

Google Search Consoleから提供されたコードを上記に置き換えてください。

### ステップ3: サイトマップの送信

1. Google Search Console → Sitemaps
2. 「新しいサイトマップの追加」をクリック
3. `https://www.example-kurieito.com/sitemap.xml` を入力
4. 「送信」をクリック

### ステップ4: robots.txtの確認

1. Google Search Console → Settings → Crawl stats
2. `https://www.example-kurieito.com/robots.txt` が正しく読み込まれていることを確認

### ステップ5: 構造化データの検証

1. Google Search Console → Enhancements
2. 「Rich Results Test」で構造化データを検証
3. URL: `https://www.example-kurieito.com` を入力

---

## SEO最適化チェックリスト

### メタタグ・基本設定
- [x] ページタイトル設定（60文字以下）
- [x] メタディスクリプション設定（160文字以下）
- [x] メタキーワード設定
- [x] OGP（Open Graph Protocol）タグ設定
- [x] Twitter Card タグ設定
- [x] Canonical タグ設定
- [x] Viewport メタタグ設定

### コンテンツ最適化
- [x] H1タグの使用（1つのみ）
- [x] H2-H3タグの適切な使用
- [x] 画像のALTテキスト設定
- [x] 内部リンクの最適化
- [x] キーワード密度の確認（1-3%）

### 技術的SEO
- [x] robots.txt設定
- [x] sitemap.xml作成・送信
- [x] 構造化データ（Schema.org）実装
- [x] SSL/HTTPS対応
- [x] モバイルレスポンシブ対応
- [x] ページ速度最適化
- [x] キャッシュヘッダー設定

### セキュリティ
- [x] X-Content-Type-Options ヘッダー
- [x] X-Frame-Options ヘッダー
- [x] X-XSS-Protection ヘッダー
- [x] HTTPS強制

---

## トラブルシューティング

### Google Search Consoleで「カバレッジの問題」が表示される

**原因**: robots.txtまたはmeta robotsタグでページがブロックされている

**解決方法**:
1. `client/public/robots.txt` を確認
2. `Disallow` ルールを確認・修正
3. Vercelに再デプロイ
4. Google Search Consoleで「リクエストのインデックス登録」を実行

### Vercelデプロイが失敗する

**原因**: ビルドエラーまたは依存関係の問題

**解決方法**:
```bash
# ローカルでビルドテスト
pnpm install
pnpm build

# エラーログを確認
pnpm build 2>&1 | tail -50
```

### ドメイン接続がうまくいかない

**原因**: DNS設定の遅延またはDNSプロバイダーの設定ミス

**解決方法**:
1. DNS設定が正しく反映されるまで24-48時間待つ
2. `nslookup www.example-kurieito.com` で確認
3. Vercelダッシュボードで「Verify DNS Configuration」を実行

### サイトマップが認識されない

**原因**: サイトマップのURL形式が不正

**解決方法**:
1. `client/public/sitemap.xml` を確認
2. XMLフォーマットが正しいか検証
3. URLが完全なURLであることを確認（相対パスではなく）

---

## デプロイ後の確認項目

1. **ウェブサイトの動作確認**
   ```bash
   curl -I https://www.example-kurieito.com
   ```

2. **SEOメタタグの確認**
   ```bash
   curl https://www.example-kurieito.com | grep -E '<title>|<meta name="description"'
   ```

3. **robots.txtの確認**
   ```bash
   curl https://www.example-kurieito.com/robots.txt
   ```

4. **sitemap.xmlの確認**
   ```bash
   curl https://www.example-kurieito.com/sitemap.xml
   ```

5. **Google Search Consoleでの確認**
   - インデックス登録状況
   - カバレッジレポート
   - 検査ツール

---

## 参考リンク

- [Vercel Documentation](https://vercel.com/docs)
- [Google Search Console Help](https://support.google.com/webmasters)
- [Schema.org Documentation](https://schema.org)
- [Web.dev SEO Guide](https://web.dev/lighthouse-seo/)

---

**最終更新**: 2026年1月17日
**バージョン**: 1.0
