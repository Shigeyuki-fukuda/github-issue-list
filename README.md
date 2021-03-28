# GitHub Issue List

- GitHub の Issue リスト表示アプリケーションです。

## 本番 URL

- トップページ  
  https://github-issue-list.netlify.app

- Issue 一覧ページ  
  https://github-issue-list.netlify.app/issues/

## 使用技術

- Nuxt.js (Composition API)
- TypeScript
- Jest / Vue Test Utils
- Tailwind CSS

## 各種コマンド

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate

# start mock server
$ npm run json
```

## 実装方針・考えたことメモ

1. 長期的なコードのメンテナンス性を考えて従来の `Options API` ではなく `Composition API` を利用して書くようにした。
2. GitHub API には条件にヒットした値の全体件数を返すパラメータが存在しないため、ページングにおいては、1 ページの取得上限 + 1 件を API から取得し、取得上限以下の件数だった場合は最後のページだと判断し表示するように実装した。
3. リクエスト結果を Vuex などの状態管理機構に保存し以降はそれを参照することで無駄な API リクエストを行わないようにした場合、新規で issue が作成された際の最新データを取得し損なうリスクがあるため都度 API にリクエストを行うようにした。
4. コードのスタイルの一貫性を保つため ESLint を入れてコードを整形するようにした。

## 時間がないため出来なかったが本来やりたかったこと

1. 網羅的なテストコードの実装
2. API と通信エラーがあった場合にヘッダーにエラー通知コンポーネントを表示するなどのエラー周りの実装(発生頻度が低いので優先度を落とした)
