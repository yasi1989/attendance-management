```mermaid
sequenceDiagram
    actor User
    participant Frontend as フロントエンド(Next.js)
    participant Backend as バックエンド(Hono)
    participant DB as データベース(Neon DB)
    
    User->>Frontend: カレンダー画面アクセス
    Frontend->>Backend: 当月の勤怠データリクエスト
    Backend->>DB: 勤怠データ照会
    DB->>Backend: 勤怠データ応答
    Backend->>Frontend: 勤怠データ送信
    Frontend->>User: カレンダー表示（出勤・退勤ボタン含む）
    
    alt ボタンによる出勤記録
        User->>Frontend: 出勤ボタン押下
        Frontend->>Backend: 出勤記録リクエスト（現在時刻）
        Backend->>DB: 出勤データ保存（新規または上書き）
        DB->>Backend: 保存確認
        Backend->>Frontend: 処理完了応答
        Frontend->>User: 出勤完了通知
    else ボタンによる退勤記録
        User->>Frontend: 退勤ボタン押下
        Frontend->>Backend: 退勤記録リクエスト（現在時刻）
        Backend->>DB: 退勤データ更新
        DB->>Backend: 更新確認
        Backend->>Frontend: 処理完了応答
        Frontend->>User: 退勤完了通知
    end
    
    User->>Frontend: 日付選択
    Frontend->>Backend: 選択日の詳細データリクエスト
    Backend->>DB: 詳細データ照会
    DB->>Backend: 詳細データ応答
    Backend->>Frontend: 詳細データ送信
    Frontend->>User: 詳細画面表示（時刻入力フォーム・編集/削除ボタン）
    
    alt 手動で出勤データ編集
        User->>Frontend: 出勤時刻入力・更新ボタン押下
        Frontend->>Backend: 出勤データ更新リクエスト（日付・時刻）
        Backend->>DB: 出勤データ更新（上書きまたは新規保存）
        DB->>Backend: 更新確認
        Backend->>Frontend: 処理完了応答
        Frontend->>User: 更新完了通知
    else 手動で退勤データ編集
        User->>Frontend: 退勤時刻入力・更新ボタン押下
        Frontend->>Backend: 退勤データ更新リクエスト（日付・時刻）
        Backend->>DB: 退勤データ更新（上書きまたは新規保存）
        DB->>Backend: 更新確認
        Backend->>Frontend: 処理完了応答
        Frontend->>User: 更新完了通知
    else 手動でデータ削除
        User->>Frontend: 削除ボタン押下
        Frontend->>Backend: データ削除リクエスト（日付指定）
        Backend->>DB: 指定日の出退勤データ削除
        DB->>Backend: 削除確認
        Backend->>Frontend: 処理完了応答
        Frontend->>User: 削除完了通知
    end