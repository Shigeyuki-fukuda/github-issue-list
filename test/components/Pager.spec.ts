import { mount, RouterLinkStub } from '@vue/test-utils'
import Pager from '@/components/Pager.vue'

describe('Pager', () => {
  test('Pagerコンポーネントが表示出来ること', () => {
    const wrapper = mount(Pager, {
      stubs: {
        'nuxt-link': RouterLinkStub
      }
    })
    expect(wrapper.vm).toBeTruthy()
  })
})