<template>
  <tr v-if="issue">
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      <div class="flex items-center">
        <div>
          <p class="text-gray-900 font-bold">#{{ issue.number }}</p>
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
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { Issue } from '@/types/issue'

export default defineComponent({
  name: 'IssuesTableRecord',
  props: {
    issue: {
      type: Object as PropType<Issue>,
      default: null
    }
  }
})
</script>
