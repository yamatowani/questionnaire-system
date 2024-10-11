# 概要
1問だけの選択式アンケートを作成し、URLを配布して回答を収集するシステム

## 使用技術
- サーバーサイド: NestJS, TypeScript, TypeORM, MySQL, GraphQL
- クライアントサイド: Next.js, React, TypeScript, Material UI, react-chartjs-2

## 基本機能
- **ログインによるアクセス制御**: 管理画面にログインすることでアクセスを制限します。
- **アンケート作成**: 管理画面から単一選択式の質問を持つアンケートを作成可能です。
  - **質問構成**:
    - 1つの質問文
    - 1個以上の選択肢
- **回答URLの発行**: アンケート作成時に回答用のURLを発行
- **回答画面**:
  - URLにアクセスするとアンケートが表示されます
  - ユーザーは選択肢から1つを選んで回答可能です
- **集計結果の表示**:
  - 回答状況を選択肢ごとの回答者数および%で棒グラフに表示します。

## URL, ドメイン設計
| URL                  | 説明                                                             |
|----------------------|------------------------------------------------------------------|
| `/`                  | アンケート一覧画面。ログインしているユーザーに紐づくアンケートを表示。 |
| `/question`          | アンケート作成画面。作成時にログインしているユーザーのIDを付与。   |
| `/question/:url`     | アンケート回答画面。URL(パスパラメータ)に紐づくアンケート表示。任意の回答者(ログイン不要)がアンケートに答えることができる。 |
| `/answer`            | アンケートの結果一覧。ログインしているユーザーが作成したアンケートの結果をグラフ形式で表示。 |

## 認証ロジック
### ユーザー作成
#### ユーザー情報の入力
- ユーザーから以下の情報を受け取ります：
  - `name`: ユーザー名
  - `email`: ユーザーのメールアドレス
  - `password`: ユーザーのパスワード

#### サーバーでの処理
1. 受け取ったユーザー情報を`UserService`に渡しす
2. パスワードを以下の手順で処理：
   - bcryptを使用してパスワードをハッシュ化
   - ハッシュ化したパスワードを`password_digest`として保存
3. ユーザー情報をデータベースに保存し、成功メッセージを返却
  - メールアドレスが既に存在する場合は、エラーメッセージを返却

---

### ログイン
#### リダイレクト処理
- 未ログイン状態の場合`/`,`/question`,`/answer`にアクセスした場合、`/login`にリダイレクトされる

#### ログイン情報の入力
- 管理者ユーザーに以下の情報を入力させる：
  - `email`: ユーザーのメールアドレス
  - `password`: ユーザーのパスワード

#### 認証処理
1. クライアント側
  - ユーザーがページにアクセスするとuseAuthフックがlocalStorageから認証トークンを確認
  - クライアントは認証トークンを含むリクエスト(QueryやMutation)を送信する
2. サーバー側
  - JwtAuthGuardがリクエストのトークンを検証する
  - 認証が成功した場合、リクエスト内にAdminUserIdをセットし、各リゾルバ内で使用する 

##  GraphQL API仕様
### Queries

| Query                | Description                                            | Input Type        | Output Type       |
|----------------------|-------------------------------------------------------|--------------------|--------------------|
| `questionByUrl`      | 指定したURLに基づいてアンケートを取得             | `url: String!`     | `Question!`        |
| `questions`          | 指定された管理者ユーザーの質問リストを取得     | NULL | `[Question!]!`     |
| `questionResults`    | 管理者ユーザーによって作成された質問の結果を取得| NULL | `[QuestionWithAnswerCounts!]!` |

### Input/Output仕様

##### **`questionByUrl`**
- **Input**:
  - `url` (String!): アンケートURL
- **Output**:
  - `Question!`:
    - `id` (ID!): アンケートID
    - `title` (String!): アンケートタイトル
    - `url` (String!): アンケートURL
    - `admin_user` (AdminUser!): アンケートを作成した管理者ユーザー
    - `options` ([Option!]!): アンケートの持つ選択肢
    - `created_at` (DateTime!): 作成日時
    - `updated_at` (DateTime!): 更新日時

##### `questions`
- **Output**:
  - `[Question!]!`:
    - `id` (ID!): アンケートID
    - `title` (String!): アンケートタイトル
    - `url` (String!): アンケートURL
    - `created_at` (DateTime!): 作成日時
    - `updated_at` (DateTime!): 更新日時

##### `questionResults`
- **Output**:
  - `[QuestionWithAnswerCounts!]!`:
    - `questionId` (Int!): アンケートID
    - `title` (String!): アンケートタイトル
    - `options` ([AnswerCount!]!):
      - `option_id` (Int!): 選択肢ID
      - `option_text` (String!): 選択肢テキスト
      - `count` (Int!): 選択肢の回答数

---

### Mutations

| Mutation                     | Description                                     | Input Type                                            | Output Type                    |
|------------------------------|------------------------------------------------|------------------------------------------------------|---------------------------------|
| `registerAdminUser`          | 管理者ユーザーの登録                  | `registerAdminUserInput: RegisterAdminUserInput!`  | `RegisterAdminUserOutput!`     |
| `submitQuestion`             | アンケートを作成                             | `submitQuestionInput: SubmitQuestionInput!` | `SubmitQuestionOutput!`        |
| `submitAnswer`               | アンケートに回答                             | `submitAnswerInput: SubmitAnswerInput!`            | `SubmitAnswerOutput!`          |
| `authenticateAdminUser`      | 管理者ユーザーの認証                 | `authenticateAdminUserInput: AuthenticateAdminUserInput!` | `AuthResponse!`                |

#### Input/Output仕様

##### `registerAdminUser`
- **Input**:
  - `registerAdminUserInput` (RegisterAdminUserInput!):
    - `name` (String!): 管理者ユーザー名
    - `email` (String!): 管理者ユーザーのメールアドレス
    - `password` (String!): 管理者ユーザーの作成したパスワード
- **Output**:
  - `RegisterAdminUserOutput!`:
    - `success` (Boolean!): 成功したかをBooleanで返す
    - `errorMessage` (String, nullable): エラーメッセージ
    - `user` (AdminUser, nullable):
      - `id` (ID!): 管理者ユーザーID。
      - `name` (String!): 管理者ユーザー名
      - `email` (String!): 管理者ユーザーのメールアドレス
      - `created_at` (DateTime!): 作成日時
      - `updated_at` (DateTime!): 更新日時

##### `submitQuestion`
- **Input**:
  - `submitQuestionInput` (SubmitQuestionInput!):
    - `title` (String!): アンケートタイトル
    - `options` ([SubmitOptionInput!]!):
      - `SubmitOptionInput`:
        - `option_text` (String!): 選択肢のテキスト。
- **Output**:
  - `SubmitQuestionOutput!`:
    - `success` (Boolean!): 成功したかをBooleanで返す
    - `errorMessage` (String, nullable): エラーメッセージ
    - `question` (Question, nullable):
      - `id` (ID!): アンケートID
      - `title` (String!): アンケートタイトル
      - `url` (String!): アンケートURL
      - `admin_user` (AdminUser!): アンケートを作成した管理者ユーザー
      - `options` ([Option!]!): 質問の選択肢
      - `created_at` (DateTime!): 作成日時
      - `updated_at` (DateTime!): 更新日時

##### `submitAnswer`
- **Input**:
  - `submitAnswerInput` (SubmitAnswerInput!):
    - `option_id` (Int!): 選択肢ID
    - `question_id` (Int!): アンケートID
- **Output**:
  - `SubmitAnswerOutput!`:
    - `success` (Boolean!): 成功したかをBooleanで返す
    - `errorMessage` (String, nullable): エラーメッセージ
    - `answer` (Answer): 回答
      - `id` (ID!): 回答ID
      - `question` (Question!): 回答したアンケート
      - `option` (Option!): 選択した選択肢

##### `authenticateAdminUser`
- **Input**:
  - `authenticateAdminUserInput` (AuthenticateAdminUserInput!):
    - `email` (String!): 管理者ユーザーのメールアドレス
    - `password` (String!): 管理者ユーザーの作成したパスワード
- **Output**:
  - `AuthResponse!`:
    - `access_token` (String!): 認証トークン

## DB設計, ER図

```mermaid
erDiagram

    AdminUsers {
        int id PK "管理者ユーザーID"
        varchar name "管理ユーザー名"
        varchar email "管理者ユーザーのメールアドレス"
        varchar password_digest "ハッシュ化した管理者ユーザーのパスワード"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }

    Surveys {
        int id PK "アンケートID"
        varchar title "アンケートタイトル"
        varchar url "アンケートURL"
        bigint admin_user_id FK "アンケートを作成した管理ユーザーID"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }

    Questions {
        int id PK "質問ID"
        varchar question_text "質問項目"
        bigint survey_id FK "質問が属するアンケートID"
        boolean has_multiple_options "複数選択が可能か"
        boolean allows_other "その他の自由回答を許可するか"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }

    Options {
        int id PK "選択肢ID"
        varchar option_text "選択肢文"
        bigint question_id FK "属する質問ID"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }

    OptionAnswers {
        int id PK "OptionAnswersID"
        bigint option_id FK "選択肢ID"
        bigint answer_id FK "回答ID"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }

    Answers {
        int id PK "回答ID"
        bigint question_id FK "回答が属する質問ID"
        varchar other_response "自由回答用のテキスト"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }

    %% リレーションシップ
    AdminUsers ||--o{ Surveys : "作成する"
    Surveys ||--o{ Questions : "複数の質問を持つ"
    Questions ||--|{ Options : "複数の選択肢を持つ"
    Questions ||--o{ Answers : "複数の回答を持つ"
    Options ||--o{ OptionAnswers : "0以上の回答を持つ"
    Answers ||--o{ OptionAnswers : "回答は選択肢に属する"

```
