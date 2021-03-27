import { reactive } from '@nuxtjs/composition-api'
import { NuxtAxiosInstance } from '@nuxtjs/axios'

export type Issue = {
  title: string
  body: string
  number: number
}
type IssuesState = {
  issue: Issue | null
  issues: Issue[]
  currentPage: number
  lastPage: boolean
  issueNumber: number | null
}

export const useIssuesStore = () => {
  const state: IssuesState = reactive({
    issue: null,
    issues: [],
    currentPage: 1,
    lastPage: false,
    issueNumber: null
  })

  return {
    get issueNumber(): number | null {
      return state.issueNumber
    },
    set issueNumber(number: number | null) {
      state.issueNumber = number
    },
    async fetchIssue(axios: NuxtAxiosInstance): Promise<Issue | null> {
      if (!state.issueNumber) return null
      return await axios
        .$get(
          `https://api.github.com/repos/facebook/react/issues/${state.issueNumber}`
        )
        .then(response => response)
    }
  }
}
export type UseIssuesStore = ReturnType<typeof useIssuesStore>
