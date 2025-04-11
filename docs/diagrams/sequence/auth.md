```mermaid
sequenceDiagram
    actor User
    participant Frontend as フロントエンド(Next.js)
    participant Auth as NextAuth.js
    participant OAuth as OAuthプロバイダ
    participant DB as データベース(Neon DB)
    
    User->>Frontend: ログイン画面アクセス
    
    alt Credentials認証
        User->>Frontend: メール・パスワード入力
        Frontend->>Auth: 認証リクエスト（メール・パスワード）
        Auth->>DB: ユーザー情報照会（メール・パスワード検証）
        DB->>Auth: ユーザー情報応答
        Auth->>Frontend: セッション確立（JWT発行）
        Frontend->>User: ダッシュボード表示
    else OAuth認証
        User->>Frontend: OAuthプロバイダ選択
        Frontend->>Auth: OAuth認証リクエスト
        Auth->>OAuth: 認証リダイレクト
        User->>OAuth: ログイン・許可
        OAuth->>Auth: コールバック（アクセストークン）
        Auth->>DB: ユーザー情報取得/作成
        DB->>Auth: ユーザー情報応答
        Auth->>Frontend: セッション確立（JWT発行）
        Frontend->>User: ダッシュボード表示
    end