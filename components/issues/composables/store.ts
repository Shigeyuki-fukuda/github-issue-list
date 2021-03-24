import { reactive } from '@nuxtjs/composition-api'
import { NuxtAxiosInstance } from '@nuxtjs/axios'

type Issue = {
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
    get issue(): Issue | null {
      return state.issue
    },
    set issue(issue: Issue | null) {
      state.issue = issue
    },
    get issueNumber(): number | null {
      return state.issueNumber
    },
    set issueNumber(number: number | null) {
      state.issueNumber = number
    },
    get issues(): Issue[] {
      return state.issues
    },
    async fetchIssues(axios: NuxtAxiosInstance): Promise<void> {
      await axios
        .$get(
          `https://api.github.com/repos/facebook/react/issues?page=${state.currentPage}&per_page=11`
        )
        .then(response => {
          state.issues = response
        })
    },
    async fetchIssue(axios: NuxtAxiosInstance): Promise<void> {
      if (!state.issueNumber) return
      await axios
        .$get(
          `https://api.github.com/repos/facebook/react/issues/${state.issueNumber}`
        )
        .then(response => {
          state.issue = response
        })
    },
    popIssues(): void {
      state.issues.pop()
    },
    get currentPage(): number {
      return state.currentPage
    },
    set currentPage(page: number) {
      state.currentPage = page
    },
    get lastPage(): boolean {
      return state.lastPage
    },
    set lastPage(isLast: boolean) {
      state.lastPage = isLast
    },
    showPrev(): boolean {
      return state.currentPage > 1
    },
    showNext(): boolean {
      return !state.lastPage
    }
  }
}
export type UseIssuesStore = ReturnType<typeof useIssuesStore>
