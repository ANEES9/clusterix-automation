import { Page, TestInfo } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { skipSurveyHelper } from 'common/skip-survey-helper'
import { skipProductTourHelper } from 'common/skip-product-tour-helper'
import { skipTutorialHelper } from 'common/skip-tutorial-helper'
import { skipTimerHelper } from 'common/skip-timer-helper'
import { testSetupConfig, TestSetupConfig } from 'config/setup-test-config'

/**
 * Retrieves the correct configuration value based on hierarchy (File > Folder > Global).
 * Uses TypeScript-safe indexing.
 */
function getConfigValue(
  key: keyof TestSetupConfig['global'],
  testFile: string,
  testFolder: string
): boolean {
  return (
    testSetupConfig.files[testFile]?.[key] ??
    testSetupConfig.folders[testFolder]?.[key] ??
    testSetupConfig.global[key]
  )
}

/**
 * Applies test setup configurations dynamically.
 * @param page - Playwright page instance.
 * @param testInfo - Test metadata.
 */
export async function setupTestContext(page: Page, testInfo: TestInfo) {
  const testFile = testInfo.file ?? 'unknown.spec.ts'
  const testFolder = testFile.split('/').slice(-2, -1)[0] || 'default'
  const locale = testInfo.project?.use?.locale || 'en'
  const baseURL =
    process.env.CLUSTERIX_BASE_URL || 'https://testing.clusterix.io'

  await Allure.step(`Initializing test context`, async () => {
    if (!baseURL) throw new Error('Test Context: baseURL is undefined!')

    await page.goto(baseURL, { waitUntil: 'networkidle' })
    await page.waitForLoadState('domcontentloaded')

    const setupActions: {
      key: keyof TestSetupConfig['global']
      action: (page: Page, testInfo: TestInfo) => Promise<void>
    }[] = [
      {
        key: 'skipSurvey',
        action: (page, testInfo) => skipSurveyHelper(page, testInfo),
      },
      {
        key: 'skipTutorial',
        action: (page, testInfo) => skipTutorialHelper(page, testInfo),
      },
      {
        key: 'skipProductTour',
        action: (page, testInfo) => skipProductTourHelper(page, testInfo),
      },
      {
        key: 'skipTimer',
        action: (page, testInfo) => skipTimerHelper(page, testInfo),
      },
    ]

    for (const { key, action } of setupActions) {
      if (getConfigValue(key, testFile, testFolder)) {
        await Allure.step(`Skipping: ${key.replace('skip', '')}`, async () => {
          await action(page, testInfo)
        })
      }
    }
  })

  return { locale }
}
