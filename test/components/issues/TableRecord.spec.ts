import { mount, RouterLinkStub } from '@vue/test-utils'
import TableRecord from '@/components/issues/TableRecord.vue'

describe('TableRecord', () => {
  const expectedData = {
    issue: {
      number: 20902,
      title: "Bug: current npm react-cache version doesn't work"
    }
  }
  const wrapper = mount(TableRecord, {
    stubs: {
      'nuxt-link': RouterLinkStub
    },
    propsData: expectedData
  })
  test('TableRecordコンポーネントが表示出来ること', () => {
    expect(wrapper.vm).toBeTruthy()
  })
  test('propsで渡された issue の number と title が表示されていること', () => {
    const issueNumber = wrapper.findAll('p').wrappers[0].text()
    const issueTitle = wrapper.findAll('p').wrappers[1].text()
    // FIXME テストコードの書き方は要リファクタリング
    expect(issueNumber).toEqual('#' + expectedData.issue.number)
    expect(issueTitle).toEqual(expectedData.issue.title)
    const links = wrapper.findAllComponents(RouterLinkStub)
    expect(links.at(0).isVisible()).toBe(true)
  })
})
