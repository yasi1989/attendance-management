```mermaid
erDiagram
    users ||--o{ approvals : performs
    leave_requests ||--o{ approvals : requires
    expense_requests ||--o{ approvals : requires
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
    status {
        uuid id PK "状態ID"
        text name "状態名 (例: PENDING, APPROVED, REJECTED)"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }