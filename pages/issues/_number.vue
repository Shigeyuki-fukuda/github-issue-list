<template>
  <div class="w-full md:max-w-3xl mx-auto pt-20">
    <div class="w-full px-4 md:px-8 text-xl text-gray-800 leading-normal">
      <nuxt-link to="/issues">
        <p
          class="text-base md:text-md text-hexadecimal-code hover:text-light-hexadecimal-code font-bold"
        >
          &lt; BACK TO ISSUES
        </p>
      </nuxt-link>
      <template v-if="issue">
        <h1
          class="font-bold font-sans break-normal text-gray-900 pt-8 pb-4 text-3xl md:text-4xl"
        >
          {{ issue.title }}
          <span class="font-light text-gray-500">#{{ issue.number }}</span>
        </h1>
        <p class="mt-8">
          {{ issue.body }}
        </p>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useRoute,
  useContext,
  useFetch,
  ref
} from '@nuxtjs/composition-api'
import { Issue } from '~/types/issue'

export default defineComponent({
  setup() {
    const route = useRoute()
    const issue = ref<Issue | null>(null)
    const issueNumber = ref(Number(route.value.params.number))
    const { $axios } = useContext()
    const fetchIssue = async (): Promise<Issue | null> => {
      return await $axios
        .$get(
          `https://api.github.com/repos/facebook/react/issues/${issueNumber.value}`
        )
        .then(response => response)
        .catch(error => {
          console.log(error)
          return null
        })
    }
    const { fetch } = useFetch(async () => {
      issue.value = await fetchIssue()
    })
    fetch()
    return { issue }
  }
})
</script>
