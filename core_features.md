# Nihongo Tandem コア学習機能詳細設計

## 1. 概要

Nihongo Tandemのコア学習機能は、ユーザーが効果的かつ体系的に日本語を学ぶための基盤となるモジュールです。これらの機能は、様々な学習スタイルと目標を持つユーザーに対応し、特にペア学習の体験を最適化するよう設計されています。

本ドキュメントでは、カテゴリ別学習モジュール、コンテンツ表示方法、読み方のバリエーションなど、コア学習機能の詳細設計を記述します。

## 2. カテゴリ別学習モジュール

### 2.1 カテゴリ構成

Nihongo Tandemは、実用的かつ体系的な学習を促進するために、以下のカテゴリを提供します。各カテゴリは、初級・中級・上級の3つの難易度レベルに分かれています。

#### 2.1.1 基礎カテゴリ

1. **日常挨拶編**
   - 初級: 基本的な挨拶（おはよう、こんにちは、さようなら等）
   - 中級: 時間帯や状況に応じた挨拶のバリエーション
   - 上級: フォーマル/インフォーマルな挨拶、ビジネスシーンでの挨拶

2. **自己紹介編**
   - 初級: 名前、出身、職業の基本表現
   - 中級: 趣味、家族、学歴などの詳細情報
   - 上級: 詳細な自己PR、経歴紹介

3. **数字編**
   - 初級: 1〜100の数え方、基本的な助数詞
   - 中級: 大きな数字、様々な助数詞、順序数
   - 上級: 複雑な数量表現、統計や比率の表現

4. **時間と日付編**
   - 初級: 時刻、曜日、月、年の表現
   - 中級: 期間、予定、スケジュールの表現
   - 上級: 複雑な時間表現、歴史的年代

#### 2.1.2 実用カテゴリ

5. **買い物編**
   - 初級: 基本的な買い物フレーズ、値段の尋ね方
   - 中級: 商品の特徴や好みの表現、値段交渉
   - 上級: クレーム対応、返品・交換の表現

6. **レストラン編**
   - 初級: メニューの読み方、基本的な注文フレーズ
   - 中級: 食べ物の好み、特別注文、予約
   - 上級: 料理の詳細な説明、食文化についての会話

7. **交通機関編**
   - 初級: 基本的な乗り物、行き先の尋ね方
   - 中級: 乗り換え案内、遅延・トラブル対応
   - 上級: 複雑な経路案内、交通システムについての議論

8. **宿泊編**
   - 初級: ホテルチェックイン、基本的な要望
   - 中級: 施設の利用方法、問題報告
   - 上級: 詳細な要望、クレーム対応

9. **緊急・医療編**
   - 初級: 基本的な症状の伝え方、助けの求め方
   - 中級: 詳細な症状説明、薬局での会話
   - 上級: 医療機関での詳細な説明、保険手続き

#### 2.1.3 特殊カテゴリ

10. **ビジネス会話編**
    - 初級: オフィスでの基本的な挨拶、自己紹介
    - 中級: 会議、プレゼンテーション、電話対応
    - 上級: 交渉、契約、ビジネスマナー

11. **友達との会話編**
    - 初級: カジュアルな挨拶、基本的な雑談
    - 中級: 趣味、意見交換、感情表現
    - 上級: 冗談、スラング、若者言葉

12. **文化体験編**
    - 初級: 基本的な文化活動（お祭り、温泉など）
    - 中級: 伝統文化、マナー、習慣
    - 上級: 文化的背景、歴史的文脈

13. **オタク文化編**
    - 初級: アニメ・マンガの基本用語
    - 中級: ジャンル別専門用語、ファン文化
    - 上級: 作品分析、クリエイティブな表現

### 2.2 カテゴリ選択インターフェース

カテゴリ選択は、ユーザーの学習体験の入り口となる重要な機能です。以下の特徴を持つインターフェースを設計します：

1. **視覚的なカテゴリ表示**
   - 各カテゴリを象徴的なアイコンと共に表示
   - カテゴリごとに異なる色調を使用し、視覚的な区別を容易に
   - グリッドレイアウトで一覧性を確保

2. **パーソナライズされた推奨**
   - ユーザーの学習履歴と目標に基づいた推奨カテゴリ
   - 「あなたへのおすすめ」セクションを上部に配置
   - 最近学習したカテゴリへの簡単なアクセス

3. **ペア学習の最適化**
   - パートナーと共有しているカテゴリを特別表示
   - 二人の進捗状況を小さなインジケーターで表示
   - 「一緒に学ぶ」ボタンで同期学習を開始可能

4. **検索とフィルタリング**
   - キーワード検索機能
   - 難易度、進捗状況、学習目標によるフィルタリング
   - お気に入りカテゴリのブックマーク機能

## 3. コンテンツ表示

各カテゴリ内のフレーズや単語は、以下の情報を包括的に表示します。

### 3.1 日本語音声

1. **ネイティブスピーカーによる高品質録音**
   - 男性・女性の両方の声を用意
   - クリアで自然な発音
   - スタジオ品質の録音

2. **再生コントロール**
   - 再生/一時停止/繰り返しボタン
   - 再生速度調整（0.75x, 1x, 1.25x）
   - フレーズ内の特定部分を選択して再生する機能

3. **音声波形表示**
   - 発話のリズムとイントネーションを視覚化
   - 強調される部分のハイライト表示
   - ネイティブの発音と自分の発音の比較表示

### 3.2 日本語テキスト

1. **正確な表記**
   - 適切な漢字、ひらがな、カタカナの使用
   - 現代的で標準的な表記法
   - 必要に応じたルビ（ふりがな）表示

2. **テキスト表示オプション**
   - フォントサイズの調整
   - ルビ表示/非表示の切り替え
   - ダークモード対応

3. **テキストハイライト**
   - 音声再生に合わせた同期ハイライト
   - 重要な文法要素や表現のマーキング
   - タップして単語の詳細情報を表示

### 3.3 ローマ字表記

1. **標準的なローマ字表記**
   - ヘボン式ローマ字を基本として使用
   - 長音の適切な表記（ō, ū など）
   - 発音の微妙なニュアンスを反映

2. **表示オプション**
   - ローマ字表示/非表示の切り替え
   - 日本語テキストの下に小さく表示
   - 初心者モードでは大きく表示、上級者モードでは非表示をデフォルトに

3. **発音ガイド**
   - 特に難しい発音の部分に特別なマーキング
   - 英語の近似音との比較
   - 口の形や舌の位置の図解（詳細表示時）

### 3.4 英語での意味・解説

1. **正確な英語訳**
   - 文脈に適した自然な英語表現
   - 直訳と意訳の両方を提供（必要に応じて）
   - 複数の訳語がある場合は代替訳も表示

2. **文法・表現の解説**
   - 簡潔で分かりやすい文法説明
   - 使用される文法パターンの図解
   - 関連する文法ルールへのリンク

3. **文化的背景**
   - 表現の背後にある文化的文脈
   - 使用する際の注意点やニュアンス
   - 文化的に興味深い情報や豆知識

### 3.5 会話スクリプト例

1. **実用的な会話例**
   - 学習中のフレーズが使われる自然な会話（2〜4往復）
   - 日本語と英語訳を並列表示
   - 状況設定と話者の関係性の説明

2. **バリエーション**
   - 同じフレーズの異なる使用状況
   - フォーマル/インフォーマルなバージョン
   - 地域や年齢層による言い回しの違い

3. **インタラクティブ要素**
   - ロールプレイ機能（会話の一方の役を担当）
   - 空欄補充練習
   - 会話の続きを予測する練習

## 4. 読み方のバリエーション

### 4.1 アクセントとイントネーション

1. **地域差のある発音**
   - 標準語（東京方言）をベースに提供
   - 関西弁など主要な方言のバリエーション
   - 地域による発音の違いの解説

2. **イントネーションパターン**
   - 質問文と平叙文の違い
   - 感情表現によるイントネーションの変化
   - 強調やニュアンスを表すイントネーション

3. **視覚化ツール**
   - ピッチカーブの表示
   - 高低アクセントのマーキング
   - アニメーションによる変化の表示

### 4.2 フォーマル/インフォーマル表現

1. **敬語レベル**
   - 丁寧語（です・ます調）
   - 尊敬語・謙譲語
   - カジュアルな表現（タメ口）

2. **状況別バリエーション**
   - ビジネスシーンでの表現
   - 友人間での表現
   - 家族内での表現

3. **切り替え機能**
   - 同じ内容の異なる敬語レベルの表示
   - 状況に応じた適切な表現の推奨
   - 敬語レベルの違いの視覚的表示

### 4.3 音声再生速度調整

1. **速度オプション**
   - 低速（0.75x）: 初心者向け、発音の詳細を聞き取りやすい
   - 標準（1x）: 自然な会話速度
   - 高速（1.25x）: 実際の会話に近いスピード、上級者向け

2. **段階的練習**
   - 低速から始めて徐々に速度を上げる練習モード
   - 速度ごとの理解度チェック
   - 目標速度の設定と達成トラッキング

3. **区間リピート**
   - 特定の難しい部分を選択して繰り返し練習
   - 速度を変えながらの区間練習
   - マスターするまで繰り返す自動練習機能

## 5. 学習進捗管理

### 5.1 個人進捗トラッキング

1. **学習状況の可視化**
   - カテゴリごとの完了率
   - 学習時間の記録と分析
   - 習得フレーズ数のカウント

2. **復習スケジュール**
   - 間隔反復システムに基づく最適な復習タイミングの提案
   - 忘却曲線に基づいた復習リマインダー
   - 弱点カテゴリの特定と集中復習の推奨

3. **達成バッジとマイルストーン**
   - 学習継続日数、習得フレーズ数などに応じたバッジ
   - 重要なマイルストーン達成時の祝福メッセージ
   - 長期目標の進捗状況表示

### 5.2 ペア学習進捗共有

1. **共有ダッシュボード**
   - 二人の学習進捗の並列表示
   - 共同達成の記録
   - 相互の強みと弱みの分析

2. **励まし機能**
   - パートナーへの応援メッセージ送信
   - 共同目標の設定と達成祝福
   - チャレンジの提案と招待

3. **同期学習インジケーター**
   - パートナーの現在の学習状況表示
   - リアルタイム学習通知
   - 「一緒に学ぶ」モードの開始ボタン

## 6. コンテンツ管理システム

### 6.1 フレーズ帳

1. **個人フレーズ帳**
   - 学習したフレーズの保存
   - カスタムタグとカテゴリ分け
   - 重要度によるマーキング

2. **共有フレーズ帳**
   - パートナーと共有するフレーズコレクション
   - 相互編集と注釈追加
   - 学習優先度の設定

3. **検索と整理**
   - 全文検索機能
   - 使用頻度、難易度、カテゴリによるフィルタリング
   - エクスポート/インポート機能

### 6.2 カスタムリスト作成

1. **テーマ別リスト**
   - 特定の興味や目的に基づいたカスタムリスト
   - 旅行計画、ビジネスミーティングなど目的別の準備リスト
   - 季節やイベントに関連したフレーズコレクション

2. **学習計画との統合**
   - 学習スケジュールへのリスト組み込み
   - 目標達成のためのカスタム学習パス
   - 試験対策用の特別リスト（JLPT対応など）

3. **共同編集機能**
   - パートナーとのリアルタイム共同編集
   - 編集履歴と変更追跡
   - コメントと提案機能

## 7. オフライン学習サポート

### 7.1 コンテンツのダウンロード

1. **カテゴリ別ダウンロード**
   - 選択したカテゴリの完全オフラインアクセス
   - 音声ファイルを含む包括的なダウンロード
   - ストレージ使用量の最適化オプション

2. **同期メカニズム**
   - オフライン学習記録のオンライン同期
   - 最新コンテンツの自動更新
   - データ使用量の制御設定

3. **ダウンロード管理**
   - ダウンロード済みコンテンツの管理インターフェース
   - 不要になったコンテンツの削除
   - ストレージ状況の可視化

### 7.2 オフライン機能制限

1. **利用可能な機能**
   - 基本的な学習コンテンツの閲覧
   - 音声再生と基本的な練習
   - 個人フレーズ帳の利用

2. **制限される機能**
   - リアルタイムのペア学習機能
   - 発音フィードバック（録音は可能）
   - 最新のコンテンツ更新

3. **オフライン通知**
   - オフラインモードの明確な表示
   - 再接続時の同期通知
   - オフライン中に行った学習の進捗サマリー

## 8. アクセシビリティ対応

### 8.1 視覚的アクセシビリティ

1. **フォントサイズと表示調整**
   - テキストサイズの柔軟な調整
   - 高コントラストモード
   - 色覚異常に配慮した配色設計

2. **スクリーンリーダー対応**
   - 適切なARIAラベルとセマンティックHTML
   - 画像の代替テキスト
   - 論理的なナビゲーション構造

### 8.2 聴覚的アクセシビリティ

1. **字幕と視覚的フィードバック**
   - 音声コンテンツの完全な字幕
   - 音声波形の視覚表示
   - 振動フィードバックオプション

2. **音量と音質調整**
   - 独立した音声コントロール
   - 周波数調整オプション
   - ノイズリダクション設定

### 8.3 運動機能への配慮

1. **タッチターゲットの最適化**
   - 十分な大きさのボタンとコントロール
   - 適切な間隔と配置
   - タッチ感度の調整オプション

2. **代替入力方法**
   - 音声コマンド対応
   - キーボードナビゲーション
   - スイッチコントロール互換性

## 9. 技術要件

### 9.1 音声処理システム

1. **高品質音声データベース**
   - プロのネイティブスピーカーによる録音
   - 様々なアクセントとスピードのバリエーション
   - 定期的な更新と拡張

2. **音声認識エンジン**
   - 日本語発音の正確な認識
   - 非ネイティブの発音パターン学習
   - リアルタイム処理能力

3. **音声合成機能**
   - 自然な日本語テキスト読み上げ
   - 感情やニュアンスの表現
   - カスタマイズ可能な音声特性

### 9.2 データ同期システム

1. **リアルタイム同期**
   - ペア間の学習データのリアルタイム共有
   - 変更の即時反映
   - 競合解決メカニズム

2. **オフライン/オンライン統合**
   - オフライン学習データの効率的な同期
   - 最小限のデータ転送で最大の情報共有
   - 同期状態の明確な表示

3. **データバックアップ**
   - 自動バックアップシステム
   - 学習履歴の長期保存
   - 復元ポイントの作成と管理

### 9.3 パフォーマンス最適化

1. **リソース効率**
   - バッテリー使用量の最適化
   - メモリ使用の効率化
   - ネットワークトラフィックの最小化

2. **応答性**
   - UI操作の即時反応
   - 音声処理の低遅延
   - スムーズなアニメーションとトランジション

3. **スケーラビリティ**
   - ユーザーデータ量の増加に対応
   - 新機能の容易な追加
   - 多様なデバイスとスクリーンサイズへの適応

## 10. 結論

Nihongo Tandemのコア学習機能は、日本語学習の基本要素を包括的にカバーしながら、ペア学習の体験を最適化するよう設計されています。カテゴリ別学習モジュール、豊富なコンテンツ表示オプション、多様な読み方のバリエーション、効果的な進捗管理システムを通じて、ユーザーは効率的かつ楽しく日本語を学ぶことができます。

特に、共有フレーズ帳やペア進捗共有などの機能は、「共に学び、共に成長する」というNihongo Tandemの中核コンセプトを実現し、既存の日本語学習アプリとの差別化を図ります。

これらのコア機能は、次のフェーズで設計するインタラクティブ学習モード、発音練習、ペア学習機能などと有機的に連携し、総合的な学習体験を提供します。
