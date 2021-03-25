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

1. 従来の `Options API` ではなく `Composition API` を利用して、コンポーネント間でロジックを再利用出来る & テストがしやすい状態を目指した設計にした。
2. GitHub API には条件にヒットした値の全体件数を返すパラメータが存在しないため、ページングにおいては、1 ページの取得上限 + 1 件を API から取得し、取得上限以下の件数だった場合は最後のページだと判断し表示するように実装した。
3. GitHub の API のリクエスト制限を加味して、グローバルなステートに値を保存して参照するようにした。しかし、実際のアプリケーション開発では、新規でデータが追加・削除された場合にステートの値を参照していると最新のデータに追従出来ないので、例外はあるが基本的には都度 API にリクエストを送る方針が良いと思っている。
4. コードのスタイルの一貫性を保つため ESLint を入れてコードを整形するようにした。

## 時間がないため出来なかったが本来やりたかったこと

1. 全ての合成関数・コンポーネントのテストコードの追加
2. API と通信エラーがあった場合のエラーハンドリング周りの実装
