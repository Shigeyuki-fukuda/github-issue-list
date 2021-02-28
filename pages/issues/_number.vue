
<template>
  <div>
    <p>
      Issue ID: {{ issueNumber }}
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      issueNumber: this.$route.params.number
    }
  }
}
</script>