import { mount, RouterLinkStub } from '@vue/test-utils'
import Pager from '@/components/Pager.vue'

describe('Pager', () => {
  describe('デフォルト表示', () => {
    const wrapper = mount(Pager, {
      stubs: {
        'nuxt-link': RouterLinkStub
      }
    })
    test('Pagerコンポーネントが表示出来ること', () => {
      expect(wrapper.vm).toBeTruthy()
    })
    test('デフォルトのPropsが渡って表示されていること', () => {
      const button = wrapper.find('button')
      expect(button.text()).toEqual('1')
      const links = wrapper.findAllComponents(RouterLinkStub)
      expect(links.at(0).isVisible()).toBe(false)
      expect(links.at(1).isVisible()).toBe(true)
    })
  })

  describe('2ページ以降の場合', () => {
    const wrapper = mount(Pager, {
      stubs: {
        'nuxt-link': RouterLinkStub
      },
      propsData: {
        currentPage: 2,
        showPrev: true,
        showNext: true
      }
    })
    test('Prevが表示されていること', () => {
      const button = wrapper.find('button')
      expect(button.text()).toEqual('2')
      const links = wrapper.findAllComponents(RouterLinkStub)
      expect(links.at(0).isVisible()).toBe(true)
    })
    test('Nextが表示されていること', () => {
      const button = wrapper.find('button')
      expect(button.text()).toEqual('2')
      const links = wrapper.findAllComponents(RouterLinkStub)
      expect(links.at(1).isVisible()).toBe(true)
    })
  })
  describe('最後のページの場合', () => {
    const wrapper = mount(Pager, {
      stubs: {
        'nuxt-link': RouterLinkStub
      },
      propsData: {
        currentPage: 3,
        showPrev: true,
        showNext: false
      }
    })
    test('Prevが表示されていること', () => {
      const button = wrapper.find('button')
      expect(button.text()).toEqual('3')
      const links = wrapper.findAllComponents(RouterLinkStub)
      expect(links.at(0).isVisible()).toBe(true)
    })
    test('Nextが表示されていないこと', () => {
      const button = wrapper.find('button')
      expect(button.text()).toEqual('3')
      const links = wrapper.findAllComponents(RouterLinkStub)
      expect(links.at(1).isVisible()).toBe(false)
    })
  })
})
