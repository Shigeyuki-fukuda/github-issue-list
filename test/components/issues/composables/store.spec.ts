import { useIssuesStore, UseIssuesStore } from '@/components/issues/composables/store'

describe('useIssuesStore', () => {
  let composition: UseIssuesStore = useIssuesStore()
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
})
