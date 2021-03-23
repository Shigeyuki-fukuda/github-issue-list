<template>
  <table class="min-w-full leading-normal">
    <thead>
      <tr>
        <th
          scope="col"
          class="px-5 py-3 bg-hexadecimal-code border-b border-gray-200 text-white text-left text-sm font-bold"
        >
          Number
        </th>
        <th
          scope="col"
          class="px-5 py-3 bg-hexadecimal-code border-b border-gray-200 text-white text-left text-sm font-bold"
        >
          Title
        </th>
      </tr>
    </thead>
    <tbody>
      <IssuesTableRecord
        v-for="issue in issues"
        :key="issue.number"
        :issue="issue"
      />
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import IssuesTableRecord from '@/components/issues/TableRecord.vue'

export default defineComponent({
  name: 'IssuesTable',
  components: {
    IssuesTableRecord
  },
  props: {
    issues: {
      type: Array,
      default: () => []
    }
  }
})
</script>
