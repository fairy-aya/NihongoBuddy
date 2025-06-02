# GitHub デプロイメント戦略

## 1. リポジトリ設定

### リポジトリ情報
- **リポジトリ名**: fairy-aya/NihongoBuddy
- **説明**: インタラクティブなバイリンガル日本語学習アプリケーション「Nihongo Tandem」
- **可視性**: Public
- **ライセンス**: MIT License

### ブランチ戦略
- **メインブランチ**: `main` - 安定版コード、本番環境用
- **開発ブランチ**: `develop` - 開発中のコード、次回リリース用
- **機能ブランチ**: `feature/*` - 新機能開発用
- **バグ修正ブランチ**: `bugfix/*` - バグ修正用
- **リリースブランチ**: `release/*` - リリース準備用

### ブランチ保護ルール
- `main`と`develop`ブランチへの直接プッシュを禁止
- プルリクエストのレビューと承認を必須化
- ステータスチェック（CI）の通過を必須化

## 2. プロジェクト構造

```
NihongoBuddy/
├── .github/                    # GitHub関連設定
│   ├── workflows/              # GitHub Actions ワークフロー
│   └── ISSUE_TEMPLATE/         # Issue テンプレート
├── docs/                       # プロジェクトドキュメント
│   ├── design/                 # 設計ドキュメント
│   ├── api/                    # API ドキュメント
│   └── user-guide/             # ユーザーガイド
├── src/                        # ソースコード
│   ├── assets/                 # 静的アセット（画像、音声など）
│   ├── components/             # 再利用可能なUIコンポーネント
│   ├── screens/                # アプリ画面
│   ├── navigation/             # ナビゲーション設定
│   ├── services/               # APIサービス、ユーティリティ
│   ├── store/                  # 状態管理（Redux）
│   ├── hooks/                  # カスタムReact Hooks
│   ├── utils/                  # ユーティリティ関数
│   └── constants/              # 定数定義
├── firebase/                   # Firebase関連設定
│   ├── functions/              # Cloud Functions
│   └── firestore-rules/        # Firestoreセキュリティルール
├── __tests__/                  # テストコード
├── .gitignore                  # Git除外ファイル設定
├── package.json                # プロジェクト依存関係
├── README.md                   # プロジェクト概要
└── LICENSE                     # ライセンス情報
```

## 3. CI/CD パイプライン

### GitHub Actions ワークフロー

#### 1. コード品質チェック
```yaml
name: Code Quality

on:
  push:
    branches: [ develop, feature/*, bugfix/* ]
  pull_request:
    branches: [ main, develop ]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - name: Install dependencies
        run: npm ci
      - name: Run ESLint
        run: npm run lint
      - name: Run TypeScript check
        run: npm run typecheck
```

#### 2. テスト実行
```yaml
name: Tests

on:
  push:
    branches: [ develop, feature/*, bugfix/* ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
```

#### 3. ビルド検証
```yaml
name: Build

on:
  push:
    branches: [ develop, release/* ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - name: Install dependencies
        run: npm ci
      - name: Build project
        run: npm run build
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build-files
          path: build/
```

#### 4. Firebase デプロイ
```yaml
name: Deploy to Firebase

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - name: Install dependencies
        run: npm ci
      - name: Build project
        run: npm run build
      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: nihongo-tandem
```

## 4. デプロイメント手順

### 初期セットアップ

1. GitHub リポジトリの作成
   - リポジトリ名: `fairy-aya/NihongoBuddy`
   - 説明とライセンスの設定
   - README.md の初期化

2. ブランチ保護ルールの設定
   - `main`と`develop`ブランチの保護設定
   - プルリクエストとレビュー要件の設定

3. プロジェクト構造の初期化
   - 基本ディレクトリ構造の作成
   - .gitignore ファイルの設定
   - 初期ドキュメントの配置

4. GitHub Actions ワークフローの設定
   - ワークフローYAMLファイルの作成
   - シークレット変数の設定

### コード管理ワークフロー

1. 機能開発
   - `develop`ブランチから`feature/[機能名]`ブランチを作成
   - 機能実装とテスト
   - プルリクエストを`develop`ブランチに対して作成
   - コードレビューと承認
   - マージ

2. バグ修正
   - `develop`または`main`から`bugfix/[バグ名]`ブランチを作成
   - 修正実装とテスト
   - プルリクエストを対象ブランチに作成
   - コードレビューと承認
   - マージ

3. リリース準備
   - `develop`から`release/v[バージョン]`ブランチを作成
   - 最終テストと調整
   - プルリクエストを`main`ブランチに作成
   - 最終レビューと承認
   - `main`へのマージと自動デプロイ
   - リリースタグの作成

## 5. バージョン管理

### セマンティックバージョニング

- **メジャーバージョン** (x.0.0): 互換性のない変更
- **マイナーバージョン** (0.x.0): 後方互換性のある機能追加
- **パッチバージョン** (0.0.x): バグ修正や小さな改善

### リリースノート

- 各リリースごとに詳細なリリースノートを作成
- 新機能、改善点、バグ修正を明記
- スクリーンショットや動画による視覚的な説明を追加

## 6. ドキュメント管理

### 技術ドキュメント

- API仕様書
- コンポーネント設計書
- データモデル図
- アーキテクチャ概要

### ユーザードキュメント

- インストールガイド
- 使用方法マニュアル
- よくある質問（FAQ）
- トラブルシューティングガイド

## 7. セキュリティ対策

- 定期的な依存関係の更新
- セキュリティスキャンの実施
- Firebase セキュリティルールの厳格な設定
- 認証情報の安全な管理

## 8. パフォーマンスモニタリング

- Firebase Performance Monitoring の活用
- エラー追跡と分析
- ユーザーフィードバックの収集と分析
- 継続的な最適化

## 9. 次のステップ

1. GitHub リポジトリの初期セットアップ
2. 基本プロジェクト構造の作成
3. CI/CD パイプラインの構築
4. 初期コードのプッシュ
5. 開発サイクルの開始
