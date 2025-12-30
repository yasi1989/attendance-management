```mermaid
erDiagram
    users ||--o{ attendance_approval_steps : approves
    users ||--o{ expense_group_approval_steps : approves
    monthly_attendance_approvals ||--o{ attendance_approval_steps : requires
    group_expense_approvals ||--o{ expense_group_approval_steps : requires
    
    users {
        text id PK "ユーザーID"
        text name "氏名"
        text email UK "メールアドレス"
        text company_id FK "会社ID"
        text department_id FK "部署ID"
        text role_id FK "役割ID"
    }
    
    monthly_attendance_approvals {
        text id PK "月次勤怠承認ID"
        text user_id FK "ユーザーID"
        text company_id FK "会社ID"
        text status_code "状態コード (Draft, Submitted, Approved, Rejected)"
        date target_month "対象月"
        timestamp submitted_at "提出日時"
    }
    
    group_expense_approvals {
        text id PK "経費グループ承認ID"
        text user_id FK "ユーザーID"
        text company_id FK "会社ID"
        text status_code "状態コード (Draft, Submitted, Approved, Rejected)"
        timestamp submitted_at "申請日時"
        text purpose "申請目的・理由"
    }
    
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