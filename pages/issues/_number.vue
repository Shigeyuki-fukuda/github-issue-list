
<template>
  <div>
    <p>
      Issue番号: {{ issue.number }}
      タイトル: {{ issue.title }}
      本文： {{ issue.body }}
    </p>
  </div>
</template>

<script>
export default {
  async asyncData({ app, params }) {
    // 本来は下記APIを叩くがAPIのリクエスト制限を考慮して開発時は同様の形式のレスポンスのdb.jsonのエンドポイントを叩く
    // const res = await app.$axios.get(`https://api.github.com/repos/facebook/react/issues/${params.number}`)
    const res = await app.$axios.get('http://localhost:3001/detail')
    const issue = res.data
    return { issue }
  }
}
</script>