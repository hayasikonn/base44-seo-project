# ローカルマシンからのGitプッシュ手順

このドキュメントでは、ローカルマシンからGitHubリポジトリにコードをプッシュする手順を説明します。

## 前提条件

- Gitがインストールされていること
- GitHubアカウントが作成されていること
- Personal Access Token (PAT) を取得していること

## 手順

### 1. プロジェクトディレクトリに移動

```bash
cd /path/to/base44-seo-project
```

**注意**: `/path/to/` は実際のプロジェクトパスに置き換えてください。

例：
- macOS/Linux: `~/projects/base44-seo-project` または `/home/username/base44-seo-project`
- Windows: `C:\Users\username\base44-seo-project`

### 2. Gitリモートを設定

```bash
git remote set-url origin https://github.com/hayasikonn/base44-seo-project.git
```

**既存のリモートを確認する場合:**
```bash
git remote -v
```

### 3. コードをプッシュ

```bash
git push -u origin main
```

### 4. 認証処理

プッシュ時に以下の認証が求められます：

**ユーザー名:**
```
hayasikonn
```

**パスワード（Personal Access Token）:**
- GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
- 「Generate new token (classic)」をクリック
- トークン名: 任意（例: `base44-seo-project`）
- 有効期限: 90日以上推奨
- スコープ: `repo` にチェック
- 「Generate token」をクリック
- トークンをコピーして保存（再度表示されません）

### 5. プッシュ完了確認

```bash
git log --oneline -5
```

出力例：
```
abc1234 Initial commit
```

## トラブルシューティング

### エラー: "fatal: not a git repository"

**原因**: ディレクトリがGitリポジトリではない

**解決方法**:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/hayasikonn/base44-seo-project.git
git push -u origin main
```

### エラー: "fatal: 'origin' does not appear to be a 'git' repository"

**原因**: リモートが正しく設定されていない

**解決方法**:
```bash
git remote remove origin
git remote add origin https://github.com/hayasikonn/base44-seo-project.git
git push -u origin main
```

### エラー: "fatal: Authentication failed"

**原因**: Personal Access Tokenが正しくない

**解決方法**:
1. Personal Access Tokenを再度確認
2. キャッシュされた認証情報をクリア:
   ```bash
   # macOS/Linux
   git credential-osxkeychain erase
   
   # Windows
   git credential-manager erase https://github.com
   ```
3. 再度プッシュ

### エラー: "Updates were rejected because the remote contains work that you do not have locally"

**原因**: リモートブランチがローカルより進んでいる

**解決方法**:
```bash
git pull origin main
git push -u origin main
```

## Vercelでの自動デプロイ

プッシュ完了後、以下の手順でVercelのデプロイを確認してください：

1. [Vercelダッシュボード](https://vercel.com/dashboard) にアクセス
2. `base44-seo-project` をクリック
3. 「Deployments」タブを確認
4. デプロイが自動的に開始されます（1-5分）
5. ステータスが「Ready」になったら完了

## 次のステップ

1. **ドメイン設定**
   - Vercel → Settings → Domains
   - `www.example-kurieito.com` を追加
   - DNS設定を完了

2. **Google Search Console**
   - サイトマップが正常に処理されているか確認
   - 24-48時間後に検索パフォーマンスを確認

3. **監視**
   - Vercel Analytics でアクセス数を監視
   - Google Search Console で検索パフォーマンスを監視

## 参考リンク

- [GitHub Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [Vercel Deployment](https://vercel.com/docs/deployments/overview)
- [Google Search Console](https://search.google.com/search-console)
