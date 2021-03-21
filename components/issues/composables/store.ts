import { reactive } from '@nuxtjs/composition-api';
import { NuxtAxiosInstance } from '@nuxtjs/axios'

type Issue = {
  title: string;
  body: string;
  number: number;
}

export const issuesStore = () => {
  const state = reactive({
    issues: [] as Issue[]
  });

  return {
    issue(number: number): Issue | null {
      return state.issues.find((issue)=> { return issue.number === number }) || null;
    },
    get issues(): Issue[] {
      return state.issues;
    },
    async fetchIssues(page: number, axios: NuxtAxiosInstance): Promise<void> {
      await axios.$get(`https://api.github.com/repos/facebook/react/issues?page=${page}&per_page=10`).then(response => {
        state.issues = response.data;
      });
    }
  };
}

export type IssuesStore = ReturnType<typeof issuesStore>;