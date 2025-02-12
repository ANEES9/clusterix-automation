import { test as base } from '@playwright/test'
import { setupTestContext } from 'utils/test-context'

export const test = base.extend<{ page: any }>({
  page: async ({ page }, use, testInfo) => {
    if (!page) {
      throw new Error('Test Context: page is undefined! Check test setup.')
    }

    await setupTestContext(page, testInfo)

    await use(page)
  },
})
