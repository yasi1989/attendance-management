```mermaid
erDiagram
    users ||--o{ leave_requests : submits
    users ||--o{ expense_requests : submits
    expense_requests ||--o| route_info : contains
    leave_requests ||--|| status : belongs_to
    expense_requests ||--|| status : belongs_to
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
    status {
        uuid id PK "状態ID"
        text name "状態名 (例: PENDING, APPROVED, REJECTED)"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }