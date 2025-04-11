```mermaid
sequenceDiagram
    actor Employee as 従業員
    actor Manager as 承認者
    participant Frontend as フロントエンド(Next.js)
    participant Backend as バックエンド(Hono)
    participant DB as データベース(Neon DB)
    
    alt 有給申請フロー
        Employee->>Frontend: 有給申請画面アクセス
        Frontend->>Backend: 有給残日数リクエスト
        Backend->>DB: 有給データ照会
        DB->>Backend: 有給データ応答
        Backend->>Frontend: 有給データ送信
        Frontend->>Employee: 申請フォーム表示
        
        Employee->>Frontend: 有給申請情報入力・送信
        Frontend->>Backend: 有給申請データ送信
        Backend->>DB: 申請データ保存
        DB->>Backend: 保存確認
        Backend->>Frontend: 処理完了応答
        Frontend->>Employee: 申請完了通知
        
        Manager->>Frontend: 承認画面アクセス
        Frontend->>Backend: 承認待ちデータリクエスト
        Backend->>DB: 承認待ちデータ照会
        DB->>Backend: 承認待ちデータ応答
        Backend->>Frontend: 承認待ちデータ送信
        Frontend->>Manager: 承認一覧表示
        
        Manager->>Frontend: 承認/却下操作
        Frontend->>Backend: 承認/却下データ送信
        Backend->>DB: ステータス更新
        DB->>Backend: 更新確認
        Backend->>Frontend: 処理完了応答
        Frontend->>Manager: 完了通知
        
        Note over Backend, DB: 通知処理
        Backend->>Employee: 承認/却下通知
    else 経費申請フロー
        Employee->>Frontend: 経費申請画面アクセス
        Frontend->>Employee: 申請フォーム表示
        
        Employee->>Frontend: 経費申請情報入力
        
        alt ジョルダンAPI連携
            Employee->>Frontend: ジョルダン連携選択
            Frontend->>Backend: ジョルダンAPI認証
            Backend->>Frontend: 認証情報要求
            Frontend->>Backend: ジョルダンAPI呼び出し
            Backend->>Frontend: 経路情報返却
            Frontend->>Employee: 経路情報表示
            Employee->>Frontend: 経路確認・申請
        else 手動入力/レシートアップロード
            Employee->>Frontend: 経費情報手動入力
            Employee->>Frontend: レシート画像アップロード
        end
        
        Frontend->>Backend: 経費申請データ送信
        Backend->>DB: 申請データ保存
        DB->>Backend: 保存確認
        Backend->>Frontend: 処理完了応答
        Frontend->>Employee: 申請完了通知
        
        Manager->>Frontend: 承認画面アクセス
        Frontend->>Backend: 承認待ちデータリクエスト
        Backend->>DB: 承認待ちデータ照会
        DB->>Backend: 承認待ちデータ応答
        Backend->>Frontend: 承認待ちデータ送信
        Frontend->>Manager: 承認一覧表示
        
        Manager->>Frontend: 承認/却下操作
        Frontend->>Backend: 承認/却下データ送信
        Backend->>DB: ステータス更新
        DB->>Backend: 更新確認
        Backend->>Frontend: 処理完了応答
        Frontend->>Manager: 完了通知
        
        Note over Backend, DB: 通知処理
        Backend->>Employee: 承認/却下通知
    end
