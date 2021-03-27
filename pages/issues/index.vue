<template>
  <div class="container mx-auto my-16 px-4 sm:px-8 max-w-3xl">
    <div class="py-8">
      <div class="flex flex-row mb-1 sm:mb-0 justify-between w-full">
        <h2 class="text-2xl leading-tight font-bold">
          GitHub Issue List
        </h2>
      </div>
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <IssuesTable v-if="issues.length" :issues="issues" />
          <Pager
            v-if="issues.length"
            :current-page="page"
            :show-prev="showPrev"
            :show-next="showNext"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  useFetch,
  useRoute,
  computed,
  watch,
  ref
} from '@nuxtjs/composition-api'
import IssuesTable from '@/components/issues/Table.vue'
import Pager from '@/components/Pager.vue'
import { Issue } from '~/types/issue'

export default defineComponent({
  components: {
    IssuesTable,
    Pager
  },
  setup() {
    const route = useRoute()
    const page = ref(Number(route.value.query.page) || 1)
    const lastPage = ref(false)
    const { $axios } = useContext()
    const issues = ref<Issue[]>([])
    const fetchIssues = async (): Promise<Issue[]> => {
      return await $axios
        .$get(
          `https://api.github.com/repos/facebook/react/issues?page=${page.value}&per_page=11`
        )
        .then(response => response)
        .catch(error => {
          console.log(error)
          return []
        })
    }

    const { fetch } = useFetch(async () => {
      issues.value = await fetchIssues()
      if (issues.value.length <= 10) {
        lastPage.value = true
        return
      }
      issues.value.pop()
    })
    fetch()
    watch(route, async to => {
      page.value = Number(to.query.page) || 1
      issues.value = await fetchIssues()
      console.log(issues.value)
      if (issues.value.length <= 10) {
        lastPage.value = true
        return
      }
      issues.value.pop()
    })

    return {
      issues,
      page,
      showPrev: computed(() => page.value > 1),
      showNext: computed(() => !lastPage.value)
    }
  }
})
</script>

<style></style>
