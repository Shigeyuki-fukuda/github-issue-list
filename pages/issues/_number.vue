
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
import axios from 'axios';
export default {
  async asyncData({ params }) {
    const res = await axios.get(`https://api.github.com/repos/facebook/react/issues/${params.number}`)
    const issue = res.data
    return { issue }
  }
}
</script>