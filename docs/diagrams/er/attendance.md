```mermaid
erDiagram
    users ||--o{ accounts : has
    users ||--o{ sessions : has
    users ||--o{ attendances : creates
    users ||--o{ leave_requests : submits
    users ||--o{ expense_requests : submits
    users ||--o{ approvals : performs
    users ||--|| role : belongs_to
    leave_requests ||--o{ approvals : requires
    expense_requests ||--o{ approvals : requires
    expense_requests ||--o| route_info : contains
    leave_requests ||--|| status : belongs_to
    expense_requests ||--|| status : belongs_to
    approvals ||--|| status : belongs_to
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
    leave_requests {
        uuid id PK "休暇申請ID"
        uuid user_id FK "ユーザーID"
        date request_date "申請日"
        date start_date "開始日"
        date end_date "終了日"
        uuid status_id FK "状態ID"
        integer leave_days "休暇日数"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }
    expense_requests {
        uuid id PK "経費申請ID"
        uuid user_id FK "ユーザーID"
        date request_date "申請日"
        decimal amount "金額"
        text description "説明"
        uuid status_id FK "状態ID"
        text receipt_url "領収書URL"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }
    route_info {
        uuid id PK "経路情報ID"
        uuid expense_request_id FK "経費申請ID"
        jsonb route_details "経路詳細 (例: { 'from': '東京', 'to': '大阪', 'fare': 14000 })"
        decimal route_cost "経路費用"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }
    approvals {
        uuid id PK "承認ID"
        uuid approver_id FK "承認者ID"
        uuid leave_request_id_nullable FK "休暇申請ID"
        uuid expense_request_id_nullable FK "経費申請ID"
        uuid status_id FK "状態ID"
        text comment "コメント"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }
    status {
        uuid id PK "状態ID"
        text name "状態名 (例: PENDING, APPROVED, REJECTED)"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }