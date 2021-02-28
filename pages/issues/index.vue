<template>
  <ul id="issue-list">
    <li v-for="issue in issues" :key="issue.number">
      issue番号：{{ issue.number }}
      タイトル：{{ issue.title }}<br>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
// Vue.extendをすることでTypeScriptではなくVue.jsの記法そのままで書ける
// refs: https://qiita.com/shindex/items/a90217b9e4c03c5b5215
export default Vue.extend({
  data () {
    return {
      issues: []
    }
  },
  async mounted () {
    // 本来は下記APIを叩くがAPIのリクエスト制限を考慮して開発時は同様の形式のレスポンスのdb.jsonのエンドポイントを叩く
    // this.issues = await this.$axios.$get('https://api.github.com/repos/facebook/react/issues?page=1&per_page=10')
    this.issues = await this.$axios.$get('http://localhost:3001/issues')
    console.log(this.issues[0])
    console.log(this.issues[1])
  }
})
</script>

<style>
</style>
