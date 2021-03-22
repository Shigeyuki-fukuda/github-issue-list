
<template>
  <div class="w-full md:max-w-3xl mx-auto pt-20">
    <div class="w-full px-4 md:px-8 text-xl text-gray-800 leading-normal">
			<nuxt-link to="/issues">
        <p class="text-base md:text-md text-hexadecimal-code hover:text-light-hexadecimal-code font-bold">&lt; BACK TO ISSUES</p>
      </nuxt-link>
      <template v-if="issue">
        <h1 class="font-bold font-sans break-normal text-gray-900 pt-8 pb-4 text-3xl md:text-4xl">
          {{ issue.title }} <span class="font-light text-gray-500">#{{ issue.number }}</span>
        </h1>
        <p class="mt-8">
          {{ issue.body }}
        </p>
      </template>
    </div>
  </div>
</template>

<script>
import { defineComponent, useRoute, useContext, useFetch, computed } from '@nuxtjs/composition-api'
import { issuesStore } from '@/components/issues/composables/store'

export default defineComponent({
  setup() {
    const store = issuesStore();
    const route = useRoute();
    const { $axios } = useContext();
    const { fetch } = useFetch(async () => {
      store.issueNumber = Number(route.value.params.number) || null;
      if (!store.issue) {
        store.issue = store.issues.find((issue) => issue.number === store.issueNumber) || null;
        if (!store.issue) await store.fetchIssue($axios);
      }
    });
    fetch();

    const issue = computed(() => store.issue);
    return { issue }
  }
})
</script>