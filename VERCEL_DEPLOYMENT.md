# Vercel デプロイ完全ガイド

このガイドでは、Base44プロジェクトをVercelにデプロイし、カスタムドメイン（www.example-kurieito.com）を設定する手順を説明します。

## 前提条件

- GitHubアカウント
- Vercelアカウント
- base44-seo-projectリポジトリがGitHubにプッシュ済み

## ステップ1: Vercelダッシュボードでプロジェクトをインポート

1. [Vercel Dashboard](https://vercel.com/dashboard) にアクセス
2. 「Add New...」をクリック → 「Project」を選択
3. 「Import Git Repository」セクションで「GitHub」を選択
4. GitHubアカウントの認可を求められたら、「Authorize Vercel」をクリック
5. リポジトリリストから `base44-seo-project` を検索して選択

## ステップ2: ビルド設定を確認

インポート画面で以下の設定を確認：

| 項目 | 値 |
|------|-----|
| **Framework Preset** | Other |
| **Build Command** | `pnpm build` |
| **Output Directory** | `dist` |
| **Install Command** | `pnpm install` |
| **Root Directory** | `./` |

設定が正しい場合は「Deploy」をクリック。

## ステップ3: デプロイの進行状況を監視

1. Vercelダッシュボードで自動デプロイが開始されます
2. ビルドログをリアルタイムで確認できます
3. デプロイ完了後、自動生成されたURL（例: `base44-seo-project.vercel.app`）でプレビュー可能

## ステップ4: カスタムドメインを設定

### 4.1 ドメインをVercelに追加

1. Vercelプロジェクト → **Settings** → **Domains**
2. 「Add Domain」をクリック
3. ドメイン名を入力: `www.example-kurieito.com`
4. 「Add」をクリック

### 4.2 DNS設定（ドメインプロバイダーで実施）

Vercelから表示される指示に従い、ドメインプロバイダーで以下のDNS設定を追加：

**推奨設定（CNAME）:**

```
Name: www
Type: CNAME
Value: cname.vercel-dns.com.
TTL: 3600
```

**または Aレコード設定:**

```
Name: www
Type: A
Value: 76.76.19.132
TTL: 3600
```

### 4.3 DNS設定の確認

DNS設定が反映されるまで、通常24-48時間かかります。

コマンドラインで確認：

```bash
# CNAMEレコードの確認
nslookup www.example-kurieito.com

# または
dig www.example-kurieito.com CNAME
```

出力例：
```
www.example-kurieito.com canonical name = cname.vercel-dns.com.
```

### 4.4 SSL証明書の自動発行

DNS設定が反映されると、Vercelが自動的にSSL証明書を発行します。

Vercelダッシュボードで確認：
- Settings → Domains → SSL/TLS
- ステータスが「Valid Certificate」になれば完了

## ステップ5: 環境変数の設定（必要に応じて）

1. Vercelプロジェクト → **Settings** → **Environment Variables**
2. 必要な環境変数を追加

現在のプロジェクトでは特に必須の環境変数はありませんが、将来の拡張に備えて以下を追加することをお勧めします：

```
NODE_ENV = production
```

## ステップ6: デプロイ後の確認

### 6.1 ウェブサイトの動作確認

```bash
# HTTPSでアクセス可能か確認
curl -I https://www.example-kurieito.com

# ステータスコードが200であることを確認
```

### 6.2 ページ内容の確認

```bash
# ページのメタタグを確認
curl https://www.example-kurieito.com | grep -E '<title>|<meta name="description"'
```

期待される出力：
```html
<title>Base44 - Advanced Data Encoding Solutions</title>
<meta name="description" content="Base44 provides cutting-edge Base64 encoding..." />
```

### 6.3 SEOファイルの確認

```bash
# robots.txtの確認
curl https://www.example-kurieito.com/robots.txt

# sitemap.xmlの確認
curl https://www.example-kurieito.com/sitemap.xml
```

### 6.4 セキュリティヘッダーの確認

```bash
curl -I https://www.example-kurieito.com | grep -E 'X-Content-Type-Options|X-Frame-Options|X-XSS-Protection'
```

期待される出力：
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
```

## ステップ7: 自動デプロイの設定

GitHubへのプッシュ時に自動的にVercelにデプロイされるよう設定：

1. Vercelプロジェクト → **Settings** → **Git**
2. **Production Branch** を `main` に設定
3. **Preview Deployments** を有効化（デフォルト）

これで、`main`ブランチへのプッシュ時に自動的にデプロイされます。

## トラブルシューティング

### デプロイが失敗する

**ログを確認：**

1. Vercelダッシュボーム → Deployments
2. 失敗したデプロイをクリック
3. ビルドログを確認

**よくある原因：**

- 依存関係のインストール失敗
  ```bash
  # ローカルで確認
  pnpm install
  pnpm build
  ```

- ビルドコマンドが異なる
  - Settings → Build & Development Settings で確認

### ドメインが接続されない

**確認事項：**

1. DNS設定が正しく反映されているか
   ```bash
   nslookup www.example-kurieito.com
   ```

2. Vercelダッシュボームで「Verify DNS Configuration」を実行

3. SSL証明書が発行されているか確認

### ページが表示されない（404エラー）

**原因：** SPA（Single Page Application）のルーティング設定

**解決方法：** `vercel.json` に以下の設定が含まれていることを確認

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## パフォーマンス最適化

### キャッシュ設定の確認

`vercel.json` でキャッシュヘッダーが正しく設定されていることを確認：

```bash
curl -I https://www.example-kurieito.com | grep Cache-Control
```

期待される出力：
```
Cache-Control: public, max-age=3600, s-maxage=3600
```

### 画像最適化

Vercelの自動画像最適化が有効になっているか確認：

1. Settings → Image Optimization
2. 「Automatic Image Optimization」が有効になっていることを確認

## 次のステップ

1. **Google Search Consoleの設定** → `DEPLOYMENT_GUIDE.md` の「Google Search Console設定」セクションを参照
2. **監視とアナリティクス** → Vercelダッシュボームの Analytics タブで確認
3. **カスタム関数の追加** → 必要に応じてVercel Functions を追加

## 参考リンク

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Deployment Guide](https://vercel.com/docs/concepts/deployments/overview)
- [Custom Domains on Vercel](https://vercel.com/docs/concepts/projects/domains)
- [Vercel CLI](https://vercel.com/cli)

---

**最終更新**: 2026年1月17日
**バージョン**: 1.0
