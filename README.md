## 1問だけの選択式アンケートを作成し、URLを配布して回答を収集するシステム

### 使用技術
- バックエンド: NestJS, TypeScript, TypeORM, MySQL, GraphQL
- フロントエンド: Next.js


### 基本機能
- ログインによるアクセス制御: 管理画面にログインすることでアクセスを制限。
- アンケート作成: 管理画面から単一選択式の質問を持つアンケートを作成可能。
- 質問構成:
  - 1つの質問文
  - 1個以上の選択肢
- 回答URLの発行: アンケート作成時に回答用のURLを発行。
- 回答画面:
  - URLにアクセスするとアンケートが表示される。
  - ユーザーは選択肢から1つを選んで回答可能。
- 集計結果の表示:
  - 回答状況を選択肢ごとの回答者数および%で棒グラフに表示。

### DB設計, ER図

```mermaid
erDiagram

    AdminUsers {
        bigint id PK "管理ユーザーID"
        varchar name "管理ユーザー名"
        varchar password_digest "パスワードダイジェスト"
        timestamp session_id "セッションID"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }

    Questions {
        bigint id PK "アンケートID"
        varchar title "アンケート質問文"
        varchar url "アンケートURL"
        bigint admin_user_id "アンケートを作成した管理ユーザーID"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }

    Options {
        bigint id PK "選択肢ID"
        varchar option_text "選択肢説明文"
        bigint question_id FK "属する質問ID"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }

    Answers {
        bigint id PK "回答ID"
        bigint option_id FK "選択した選択肢ID"
        bigint question_id FK "回答が属する質問ID"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }

    %% リレーションシップ
    AdminUsers ||--o{ Questions : "creates"
    Questions ||--|{ Options : "has many"
    Questions ||--o{ Answers : "has many"
    Options ||--o{ Answers : "belongs to"
```
