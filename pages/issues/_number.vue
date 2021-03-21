
<template>
  <div class="w-full md:max-w-3xl mx-auto pt-20">
    <div class="w-full px-4 md:px-8 text-xl text-gray-800 leading-normal">
			<nuxt-link to="/issues">
        <p class="text-base md:text-md text-hexadecimal-code hover:text-light-hexadecimal-code font-bold">&lt; BACK TO ISSUES</p>
      </nuxt-link>
      <h1 class="font-bold font-sans break-normal text-gray-900 pt-8 pb-4 text-3xl md:text-4xl">{{ issue.title }} <span class="font-light text-gray-500">#{{ issue.number }}</span></h1>
      <p class="mt-8">
        {{ issue.body }}
      </p>
    </div>
  </div>
</template>

<script>
import { defineComponent, useAsync, useContext, useRoute } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const route = useRoute()  
    const { $axios } = useContext()
    // const res = useAsync(() => $axios.get(`https://api.github.com/repos/facebook/react/issues/${route.value.params.number}`))
    const res = useAsync(async () => await $axios.get('http://localhost:3001/detail'))
    const issue = res.data
    return { issue }
  }
})
</script>