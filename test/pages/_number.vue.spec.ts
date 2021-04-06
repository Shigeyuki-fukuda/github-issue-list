import { mount, RouterLinkStub } from '@vue/test-utils'
import { Issue } from '@/types/issue'
import NumberPage from '@/pages/issues/_number.vue'
import axios, { AxiosInstance } from 'axios'
jest.mock('axios')
const mockedAxios: jest.Mocked<AxiosInstance> = axios as any
const responseData: Issue = {
  title: "Bug: current npm react-cache version doesn't work",
  number: 20901,
  body:
    "React version: any after `16.8.0` #### Steps To Reproduce 1. use react-cache 2. `TypeError Cannot read property 'readContext' of undefined` will be fired as i understand npm contains obsolete version of `react-cache` code still contains staff for context reading that was changed here https://github.com/facebook/react/pull/14548 Any chance that react-cache will be updated on npm in near future? Link to code example: https://codesandbox.io/s/react-cache-f6n25"
}

describe('NumberPage', () => {
  test('Issue詳細ページが表示されること', () => {
    const $route = {
      params: {
        number: 20901
      }
    }
    const wrapper = mount(NumberPage, {
      stubs: {
        'nuxt-link': RouterLinkStub
      },
      mocks: {
        $route,
        $nuxt: {
          context: {
            $axios: mockedAxios.get.mockResolvedValue(responseData)
          }
        }
      }
    })
    expect(wrapper.vm).toBeTruthy()
  })
})
