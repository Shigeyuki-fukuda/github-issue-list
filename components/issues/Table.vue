<template>
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
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'IssuesTable',
  props: {
    issues: {
      type: Array,
      default: []
    }
  }
})
</script>