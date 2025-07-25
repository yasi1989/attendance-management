```mermaid
erDiagram
    companies ||--o{ departments : contains
    companies ||--o{ users : employs
    companies ||--o{ holidays : defines
    departments ||--o{ users : belongs_to
    departments ||--o{ departments : parent_of
    users ||--|| roles : has
    users ||--o| users : manages
    users ||--o{ accounts : has
    users ||--o{ sessions : has
    
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