import {
  useIssuesStore,
  UseIssuesStore
} from '~/types/issue'
import { NuxtAxiosInstance } from '@nuxtjs/axios'

describe('useIssuesStore', () => {
  const composition: UseIssuesStore = useIssuesStore()
  describe('currentPage()', () => {
    test('currentPageのGetterとSetterが正常に動作すること', () => {
      expect(composition.currentPage).toEqual(1)
      composition.currentPage = 2
      expect(composition.currentPage).toEqual(2)
    })
  })
  describe('lastPage()', () => {
    test('lastPageのGetterとSetterが正常に動作すること', () => {
      expect(composition.lastPage).toEqual(false)
      composition.lastPage = true
      expect(composition.lastPage).toEqual(true)
    })
  })
  describe('fetchIssues()', () => {
    const data = [
      {
        number: 20902,
        title: "Bug: current npm react-cache version doesn't work",
        body:
          "React version: any after `16.8.0` #### Steps To Reproduce 1. use react-cache 2. `TypeError Cannot read property 'readContext' of undefined` will be fired as i understand npm contains obsolete version of `react-cache` code still contains staff for context reading that was changed here https://github.com/facebook/react/pull/14548 Any chance that react-cache will be updated on npm in near future? Link to code example: https://codesandbox.io/s/react-cache-f6n25"
      }
    ]
    const axios = { $get: jest.fn().mockResolvedValue(data) }
    test('fetchIssuesが正常に動作すること', async () => {
      expect(composition.issues.length).toEqual(0)
      await composition.fetchIssues(axios as any) // FIXME: NuxtAxiosInstanceで型定義した際のエラーを解消すること
      expect(composition.issues.length).toEqual(1)
    })
  })
})
