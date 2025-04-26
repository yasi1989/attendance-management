```mermaid
erDiagram
    users ||--o{ approvals : performs
    approvals ||--o{ attendances : references
    approvals ||--o{ expense_requests : references
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
        uuid attendance_id FK "勤怠ID"
        uuid expense_request_id FK "経費申請ID"
        uuid status_id FK "状態ID"
        text comment "コメント"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }
    attendances {
        uuid id PK "勤怠ID"
        uuid user_id FK "ユーザーID"
        date date "勤務日"
        timestamp check_in "出勤時間"
        timestamp check_out "退勤時間"
        uuid attendance_type_id FK "勤怠種別ID"
        boolean is_half_day "半休フラグ"
        text period "時間帯（例：MORNING, AFTERNOON）"
        text reason "理由（有給申請時）"
        uuid status_id FK "状態ID"
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
        text name "状態名 (例: DRAFT, PENDING, APPROVED, REJECTED)"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }