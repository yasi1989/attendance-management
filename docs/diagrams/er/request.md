```mermaid
erDiagram
    users ||--o{ attendances : creates
    users ||--o{ expenses : submits
    users ||--o{ monthly_attendance_approvals : submits
    users ||--o{ group_expense_approvals : submits
    companies ||--o{ monthly_attendance_approvals : manages
    companies ||--o{ group_expense_approvals : manages
    companies ||--o{ monthly_attendance_approvals : manages
    companies ||--o{ group_expense_approvals : manages
    attendances ||--|| monthly_attendance_approvals : belongs_to
    expenses ||--|| group_expense_approvals : belongs_to
    monthly_attendance_approvals ||--|| monthly_attendance_summaries : has
    group_expense_approvals ||--|| group_expense_summaries : has
    
    users {
        text id PK "ユーザーID"
        text name "氏名"
        text email UK "メールアドレス"
        text company_id FK "会社ID"
        text department_id FK "部署ID"
        text role_id FK "役割ID"
    }
    
    companies {
        text id PK "会社ID"
        text company_name "会社名"
    }
    
    status {
        text status_code "状態コード (Draft, Submitted, Approved, Rejected)"
    }
    
    attendances {
        text id PK "勤怠ID"
        text user_id FK "ユーザーID"
        text monthly_attendance_approval_id FK "月次勤怠承認ID"
        date work_date "勤務日"
        integer start_time "開始時間（分）"
        integer end_time "終了時間（分）"
        integer break_time "休憩時間（分）"
        text attendance_type "勤怠種別 (Work, Paid, Absence, Special)"
        boolean is_half_day "半休フラグ"
        text half_day_type "半日種別 (Am, Pm)"
        text comment "コメント"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }
    
    expenses {
        text id PK "経費ID"
        text user_id FK "ユーザーID"
        text group_expense_approval_id FK "経費グループ承認ID"
        date expense_date "経費発生日"
        decimal amount "金額"
        text description "説明"
        text expense_type "経費種別 (Transport, General)"
        text receipt_url "領収書URL"
        jsonb route_details "経路詳細（交通費の場合）"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }
    
    monthly_attendance_approvals {
        text id PK "月次勤怠承認ID"
        text user_id FK "ユーザーID"
        text company_id FK "会社ID"
        text status_code "状態コード (Draft, Submitted, Approved, Rejected)"
        date target_month "対象月"
        timestamp submitted_at "提出日時"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }
    
    monthly_attendance_summaries {
        text id PK "月次勤怠サマリーID"
        text monthly_attendance_approval_id FK "月次勤怠承認ID"
        integer total_work_days "総勤務日数"
        integer actual_work_days "実勤務日数"
        decimal total_work_hours "総勤務時間"
        decimal regular_hours "通常勤務時間"
        decimal overtime_hours "残業時間"
        jsonb category_breakdown "種別別内訳"
        text[] issues "課題リスト"
        timestamp calculated_at "計算実行日時"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }
    
    group_expense_approvals {
        text id PK "経費グループ承認ID"
        text user_id FK "ユーザーID"
        text company_id FK "会社ID"
        text status_code "状態コード (Draft, Submitted, Approved, Rejected)"
        timestamp submitted_at "申請日時"
        text purpose "申請目的・理由"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }
    
    group_expense_summaries {
        text id PK "経費グループサマリーID"
        text group_expense_approval_id FK "経費グループ承認ID"
        decimal total_amount "合計金額"
        integer item_count "項目数"
        jsonb category_breakdown "カテゴリ別内訳"
        text[] issues "課題リスト"
        timestamp calculated_at "計算実行日時"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }