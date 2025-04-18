```mermaid
erDiagram
    users ||--o{ accounts : has
    users ||--o{ sessions : has
    users ||--o{ attendances : creates
    users ||--|| role : belongs_to
    users {
        uuid id PK "ユーザーID"
        text name "氏名"
        text email UK "メールアドレス"
        timestamp email_verified "メール認証日時"
        text hashed_password "ハッシュ化パスワード"
        text image "プロフィール画像"
        uuid role_id FK "役割ID"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }
    role {
        uuid id PK "役割ID"
        text name "役割名 (例: EMPLOYEE, MANAGER, ADMIN)"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }
    accounts {
        uuid user_id FK "ユーザーID"
        text provider PK "認証プロバイダー"
        text provider_account_id PK "プロバイダーアカウントID"
        text refresh_token "リフレッシュトークン"
        text access_token "アクセストークン"
        timestamp expires_at "有効期限"
        text token_type "トークンタイプ"
        text scope "スコープ"
        text id_token "IDトークン"
        text session_state "セッション状態"
    }
    sessions {
        text session_token PK "セッショントークン"
        uuid user_id FK "ユーザーID"
        timestamp expires "有効期限"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }
    attendances {
        uuid id PK "勤怠ID"
        uuid user_id FK "ユーザーID"
        date date "日付"
        timestamp check_in "出勤時間"
        timestamp check_out "退勤時間"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }