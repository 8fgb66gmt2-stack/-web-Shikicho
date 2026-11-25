# 四季廳公式情報網 品質調査記録

- 対象: `8fgb66gmt2-stack/-web-Shikicho`
- 調査基準ブランチ: `main`
- 調査日: 2026-11-25
- 作業ブランチ: `improvement/ryoryo-portal-audit`
- 状態: リポジトリ全体の静的棚卸しを実施。ブラウザ実機検証・全リンク到達性検証は未完了。

## 1. 調査方針

既存の設定、本文、内部リンク、SVG紋章、探索要素、隠し機能を保護する。初期段階では既存ファイルの削除・置換を行わず、調査記録と追加型の改善から着手する。

## 2. リポジトリ構成

mainブランチのGit treeを再帰取得し、全ファイルを確認した。トップ階層と下位ディレクトリにHTML、CSS、JavaScript、SVGが混在している。

### HTMLページ（確認できた全29ファイル）

- 本廳・主要案内: `index.html`, `chief-office.html`, `miyauchi.html`, `history.html`
- 官報・法令: `gazette.html`, `constitution.html`
- 記録・探索: `archive.html`, `record15.html`, `record17.html`, `record18.html`, `record19.html`, `season-crosscheck.html`, `manuscript-hg04.html`, `work-record.html`
- 警備・治安: `security.html`, `national-security.html`, `national-security/index.html`, `national-security/personnel/index.html`
- 文藝廳: `bungeicho/index.html`, `bungeicho/about.html`, `bungeicho/archive.html`, `bungeicho/awards.html`, `bungeicho/links.html`, `bungeicho/notices.html`, `bungeicho/sitemap.html`, `bungeicho/staff.html`, `bungeicho/support.html`

### その他の主要アセット

- ルートCSS: `style.css`, `imperial.css`, `government.css`, `grand-redesign.css`, `readable-portal.css`, `report-room.css`, `ryoryo-final.css`, `ryoryo-government-final.css`, `ryoryo-government-v3.css`, `ryoryo-official-v2.css`, `ryoryo-roman-master.css`, `ryoryo-romance-master.css`, `ryoryo-v6.css`, `ryoryo.css`, `shiki-administration.css`, `shiki-exploration.css`, `shiki-imperial-v4.css`, `shiki-ryoryo-luxury.css`, `shikichan-identity.css`, `shikichan.css`, `taisho-roman.css`, `archive-fix.css`
- ルートJavaScript: `script.js`, `ryoryo-gimmicks.js`, `ryoryo-hidden-games.js`, `shiki-administration.js`, `shiki-exploration.js`
- SVG: `shiki-emblem.svg`, `shikichan.svg`
- 文藝廳固有アセット: `bungeicho/style.css`, `bungeicho/site.js`

## 3. ページ別の読み込み構成・所見

| ページ群 | 読み込み・構成 | 所見 |
|---|---|---|
| `index.html` | 17系統以上のCSS参照、複数JS | CSSの重複参照と動的追加読み込みがある。カスケード順の調査を優先 |
| `gazette.html` | 7系統のCSS | トップページと近い多層構成。共通化の候補 |
| `constitution.html`, `miyauchi.html` | style / imperial / ryoryo / exploration系 | 探索スクリプトを共有 |
| `archive.html`, `season-crosscheck.html` | style / imperial / exploration系（後者はryoryoも） | ページ横断の探索導線を保持 |
| `chief-office.html` | style / imperial / ryoryo / report-room | 通報窓口との導線を持つ |
| `security.html` | ryoryo-official-v2中心 | 他ページと異なるスタイル構成 |
| `history.html` | Google Fontsを直接読み込み | 共通CSSの読込構成が他ページと異なる |
| `record*.html`, `manuscript-hg04.html`, `work-record.html` | style / imperial系 | 記録文書のテンプレート化候補 |
| `bungeicho/*.html` | 文藝廳専用style.css / site.js | 独立した小サイトとして設計されている |
| `national-security/**` | 外部CSS・JS参照なし | ページ内スタイル中心。別系統の政府サイト意匠 |

注: `index.html` は約269 KB（Git treeのサイズは268,990 bytes）。以前の概算より正確なGit tree値を採用した。トップページにはSVGのdata URIも埋め込まれている。HTML内のCSS/JS参照と、JavaScriptが後から追加するCSSを区別して調査する必要がある。

## 4. 保護すべき既存機能・仕掛け

- 季節別現人神パネルの切替
- 人物記録・行政情報検索
- 附属資料室の認証と段階的な記録表示
- 通報窓口モーダル
- ページ横断の探索進行状況保存（localStorage）
- 四時索引・公文書コマンド等の演出
- 紋章・標語の操作を契機とする隠しゲーム
- 官報の個別記録アンカー、関連機關への外部リンク
- 文藝廳の独立ナビゲーションとページ間リンク

これらの解放条件、保存キー、DOMフック、リンク先は、改修時に変更前後を比較する。

## 5. 初期リスクと改善候補

### 優先度 高: CSSの読み込み・上書き関係

トップページで多数のCSS参照と重複参照が見つかった。スクリプトによる動的読み込みもある。各ページの参照一覧、セレクタの重複、最終的な適用順を記録する。現段階で一括削除・統合は行わない。

### 優先度 高: サイト内の複数デザイン体系

本廳・官報・記録文書・文藝廳・治安機構の各ページ群は、異なるCSS構成と情報設計を持つ。全ページを単一テンプレートへ押し込むのではなく、共通する基礎規則と機關ごとの個性を分ける。

### 優先度 高: 内部リンクの整合性

ページ群が複数階層に分かれ、相対パスとアンカーリンクが混在する。特に階層下のページ、記録ページからの戻りリンク、外部資料へのリンクを機械的に検査する。

### 優先度 中: インラインスタイル

トップページや下層ページにインラインスタイルが存在する。表示・機能上の役割を確認してから、共通クラスへ移す候補を選定する。

### 優先度 中: アクセシビリティ

メニュー、タブ、モーダル、検索、隠し要素について、キーボード操作、フォーカス移動、Escapeキー、フォーカス復帰、ARIA状態の同期を実機検証する。

### 優先度 中: 公文書の可読性

文書番号、発行日、発行主体、本文、注記、附則の階層を確認し、紙面意匠と読みやすさを両立させる。

## 6. 次の作業

1. CSS・JSの参照関係と動的読み込みを全ページで確定する。
2. 内部リンクとアンカーの存在確認を行う。
3. 主要ページをPC・スマートフォンで表示確認する。
4. 現行トップページの表示と機能を回帰テスト用の基準として記録する。
5. 追加型のデザイントークン・共通コンポーネント案を作成する。
6. トップページから小さく改修し、既存機能を回帰テストする。

## 7. 未検証事項

- GitHub Pagesの公開設定・デプロイ状態
- すべての相対リンク・外部リンクの到達性
- 実ブラウザでのコンソールエラー、レスポンシブ表示
- フォーム送信の実際のバックエンド動作
- すべての隠し要素・分岐の到達条件
- キーボード・スクリーンリーダーでの操作性

未検証の項目は、完了したものとして扱わない。


## 8. 機能実装上の注意

- 附属資料室の閲覧制限はJavaScript側の判定とDOM表示に依存する構成が含まれる。物語上の解錠演出としては成立するが、機密情報を保護する実認証・アクセス制御として扱ってはならない。現行の物語上の条件や演出は保持しつつ、公開HTML/JSに秘密情報を置かない設計が必要な場合は別途バックエンド等を検討する。
- 通報窓口はフロントエンド上のモーダル・受付演出を含む。実際の送信先・保存先が確認できるまでは、実運用の通報システムとして案内しない。
- `national-security/**` は本廳のCSS群とは独立したインラインスタイル中心のページ群であり、共通CSSの一括適用は意匠と構造を損なう可能性がある。
- 文藝廳は独立したナビゲーションとCSSを持つ。四季廳本廳のデザイン改修に巻き込まず、必要な場合は別の改修単位として扱う。


## 9. 第一次実装（2026-11-25）

既存の機關別スタイルを一括統合せず、追加型の共通意匠基盤 `shiki-design-system.css` を新設した。

### 実装内容

- 四季廳の基調に合わせた共通デザイントークン（紙色、墨色、深紅、翡翠、古金）を定義。
- アンカー移動時のスクロール余白と、本文の文字描画を調整。
- キーボード利用者向けの `:focus-visible` 輪郭を共通化。
- フォーム部品のフォント継承、狭い画面での最大幅、表セルの折返しを補強。
- 既存のスキップリンクがあるページでは視認できるフォーカス表示を提供。
- 公文書のメタ情報、二重罫線、注記に再利用できるクラスを用意。
- 動きを減らす設定（prefers-reduced-motion）と強制配色モードに対応。

### 適用範囲

本廳の主要ページ、官報、法令、記録・探索ページ、護衛警備局など、ルート階層の15ページに読み込みを追加した。文藝廳の独立サイトと國家治安機構の独立ページ群には適用していない。これらの独自意匠を不用意に上書きしないためである。

### 変更方針

既存CSS・JavaScriptの削除、既存DOMの置換、探索キーや解錠条件の変更は行っていない。共通CSSとHTMLの読み込み宣言のみを追加した。

### 検証状況

GitHub上の対象ファイルとCSS参照の静的確認を実施。実ブラウザでのPC・スマートフォン表示、キーボード操作、スクリーンリーダー、コンソールの実機検証は未実施であり、完了扱いにしない。


### 追加したアクセシビリティ改善

- ルート階層の対象15ページに「本文へ移動」スキップリンクを追加。
- スキップリンクの移動先として各ページの最初の `main` 要素を指定。既存のIDがある場合は保持し、ない場合のみ `main-content` を付与。
- 静的検査で15ページすべての共通CSS読込、スキップリンク、移動先IDの存在を確認。
- CSSの波括弧の対応を静的検査で確認。

この検査はHTML/CSSの静的確認であり、実ブラウザでのキーボードフォーカスや表示位置の検証を代替するものではない。
