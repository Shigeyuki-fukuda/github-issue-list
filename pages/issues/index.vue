<template>
  <div class="container mx-auto my-16 px-4 sm:px-8 max-w-3xl">
    <div class="py-8">
      <div class="flex flex-row mb-1 sm:mb-0 justify-between w-full">
        <h2 class="text-2xl leading-tight font-bold">
          GitHub Issue Search
        </h2>
      </div>
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th scope="col" class="px-5 py-3 bg-hexadecimal-code border-b border-gray-200 text-white text-left text-sm font-bold">
                  Number
                </th>
                <th scope="col" class="px-5 py-3 bg-hexadecimal-code border-b border-gray-200 text-white text-left text-sm font-bold">
                  Title
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="issue in issues" :key="issue.number">
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div class="flex items-center">
                    <div>
                      <p class="text-gray-900 font-bold">
                        #{{ issue.number }}
                      </p>
                    </div>
                  </div>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <nuxt-link :to="`/issues/${issue.number}`">
                    <p class="text-gray-900 hover:text-gray-400 font-bold">
                      {{ issue.title }}
                    </p>
                  </nuxt-link>
                </td>
              </tr>
            </tbody>
          </table>
          <Pager :currentPage="currentPage" :showPrev="showPrev" :showNext="showNext" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext, useFetch, useRoute, computed, watch } from '@nuxtjs/composition-api'
import { useIssuesStore } from '@/components/issues/composables/store'

export default defineComponent({
  setup() {
    const route = useRoute();
    let page = Number(route.value.query.page) || 1;
    const store = useIssuesStore();
    const { $axios } = useContext();
    const { fetch } = useFetch(async () => {
      if (!store.issues.length) {
        if (page !== 1) store.currentPage = page;
        await store.fetchIssues($axios);
        if (store.issues.length <= 10) {
          store.lastPage = true;
          return;
        }
        store.popIssues();
      }
    });
    fetch();
    const issues = computed(() => store.issues);
    watch(route, async (to) => {
      page = Number(to.query.page) || 1;
      store.currentPage = page;
      await store.fetchIssues($axios);
      if (store.issues.length <= 10) {
        store.lastPage = true;
        return;
      }
      store.popIssues();
    });

    return {
      issues,
      page,
      currentPage: computed(() => store.currentPage),
      showPrev: computed(() => store.showPrev()),
      showNext: computed(() => store.showNext())
    };
  }
})
</script>

<style>
</style>
