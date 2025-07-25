```mermaid
erDiagram
    %% ===== User関連（認証・組織管理） =====
    companies ||--o{ departments : contains
    companies ||--o{ users : employs
    companies ||--o{ holidays : defines
    companies ||--o{ monthly_attendance_approvals : manages
    companies ||--o{ group_expense_approvals : manages
    departments ||--o{ users : belongs_to
    departments ||--o{ departments : parent_of
    users ||--|| roles : has
    users ||--o| users : manages
    users ||--o{ accounts : has
    users ||--o{ sessions : has
    
    %% ===== Request関連（申請データ管理） =====
    users ||--o{ attendances : creates
    users ||--o{ expenses : submits
    users ||--o{ monthly_attendance_approvals : submits
    users ||--o{ group_expense_approvals : submits
    attendances ||--|| monthly_attendance_approvals : belongs_to
    expenses ||--|| group_expense_approvals : belongs_to
    monthly_attendance_approvals ||--|| monthly_attendance_summaries : has
    group_expense_approvals ||--|| group_expense_summaries : has
    
    %% ===== Approval関連（承認フロー管理） =====
    users ||--o{ attendance_approval_steps : approves
    users ||--o{ expense_group_approval_steps : approves
    monthly_attendance_approvals ||--o{ attendance_approval_steps : requires
    group_expense_approvals ||--o{ expense_group_approval_steps : requires
    
    %% ===== User関連テーブル =====
    companies {
        text id PK "会社ID"
        text company_name "会社名"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }
    
    departments {
        text id PK "部署ID"
        text company_id FK "会社ID"
        text department_name "部署名"
        text parent_department_id FK "親部署ID"
        text manager_user_id FK "部署長ユーザーID"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }
    
    roles {
        text id PK "役割ID"
        text role_code "役割コード"
        text role_name "役割名"
        boolean is_personal_role "個人役割フラグ"
        boolean is_system_role "システム役割フラグ"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }
    
    users {
        text id PK "ユーザーID (UUID)"
        text name "氏名"
        text email UK "メールアドレス"
        timestamp emailVerified "メール認証日時"
        text hashedPassword "ハッシュ化パスワード"
        text image "プロフィール画像"
        text company_id FK "会社ID"
        text department_id FK "部署ID"
        text role_id FK "役割ID"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }
    
    accounts {
        text userId FK "ユーザーID"
        text type "アカウントタイプ"
        text provider PK "認証プロバイダー"
        text providerAccountId PK "プロバイダーアカウントID"
        text refresh_token "リフレッシュトークン"
        text access_token "アクセストークン"
        integer expires_at "有効期限"
        text token_type "トークンタイプ"
        text scope "スコープ"
        text id_token "IDトークン"
        text session_state "セッション状態"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }
    
    sessions {
        text session_token PK "セッショントークン"
        text user_id FK "ユーザーID"
        timestamp expires "有効期限"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }
    
    holidays {
        text id PK "祝日ID"
        text name "祝日名"
        date holiday_date "祝日"
        text company_id FK "会社ID"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }
    
    %% ===== Request関連テーブル =====
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
    
    %% ===== Approval関連テーブル =====
    attendance_approval_steps {
        text id PK "勤怠承認ステップID"
        text monthly_attendance_approval_id FK "月次勤怠承認ID"
        integer step_order "承認順序"
        text approver_id FK "承認者ID"
        text status_code "承認状態 (Draft, Submitted, Approved, Rejected)"
        timestamp approved_at "承認日時"
        text comment "コメント"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }
    
    expense_group_approval_steps {
        text id PK "経費グループ承認ステップID"
        text group_expense_approval_id FK "経費グループ承認ID"
        integer step_order "承認順序"
        text approver_id FK "承認者ID"
        text status_code "承認状態 (Draft, Submitted, Approved, Rejected)"
        timestamp approved_at "承認日時"
        text comment "コメント"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }