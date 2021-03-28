import { mount } from '@vue/test-utils'
import Table from '@/components/issues/Table.vue'

describe('Table', () => {
  const wrapper = mount(Table)
  test('TableRecordコンポーネントが表示出来ること', () => {
    expect(wrapper.vm).toBeTruthy()
  })
})
