import { reactive } from '@nuxtjs/composition-api';
import { NuxtAxiosInstance } from '@nuxtjs/axios'

type Issue = {
  title: string;
  body: string;
  number: number;
}
type IssuesState = {
  issues: Issue[];
  currentPage: number;
  lastPage: boolean;
}

export const issuesStore = () => {
  const state: IssuesState = reactive({
    issues: [],
    currentPage: 1,
    lastPage: false
  });

  return {
    issue(number: number): Issue | null {
      return state.issues.find((issue) => { return issue.number === number }) || null;
    },
    get issues(): Issue[] {
      return state.issues;
    },
    async fetchIssues(axios: NuxtAxiosInstance): Promise<void> {
      await axios.$get(`https://api.github.com/repos/facebook/react/issues?page=${state.currentPage}&per_page=11`).then(response => {
        state.issues = response;
      });
    },
    popIssues(): void {
      state.issues.pop();
    },
    get currentPage(): number {
      return state.currentPage;
    },
    set currentPage(page: number) {
      state.currentPage = page;
    },
    get lastPage(): boolean {
      return state.lastPage;
    },
    set lastPage(isLast: boolean) {
      state.lastPage = isLast;
    },
    showPrev(): boolean {
      return 1 < state.currentPage;
    },
    showNext(): boolean {
      return !state.lastPage;
    }
  };
}

export type IssuesStore = ReturnType<typeof issuesStore>;