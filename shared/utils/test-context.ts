import { Page, TestInfo } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { skipSurveyHelper } from 'common/skip-survey-helper'
import { skipProductTourHelper } from 'common/skip-product-tour-helper'
import { skipTutorialHelper } from 'common/skip-tutorial-helper'
import { skipTimerHelper } from 'common/skip-timer-helper'
import { skipWelcomeHelper } from 'common/skip-welcome-helper'
import { testSetupConfig, TestSetupConfig } from 'config/setup-test-config'

/**
 * Retrieves the appropriate configuration value based on the hierarchy (File > Folder > Global).
 * Uses TypeScript-safe indexing.
 *
 * @param key - The configuration key to check (e.g., skipSurvey, skipTimer, etc.).
 * @param testFile - The test file name (e.g., "home/survey.spec.ts").
 * @param testFolder - The folder containing the test file (e.g., "home").
 */
function getConfigValue(
  key: keyof TestSetupConfig['global'],
  testFile: string,
  testFolder: string
): boolean {
  const matchedFile = Object.keys(testSetupConfig.files).find((file) =>
    testFile.endsWith(file)
  )

  return (
    (matchedFile ? testSetupConfig.files[matchedFile]?.[key] : undefined) ??
    testSetupConfig.folders[testFolder]?.[key] ??
    testSetupConfig.global[key]
  )
}

export async function setupTestContext(
  page: Page,
  testInfo: TestInfo,
  targetPath?: string
) {
  const testFile = testInfo.file ?? 'unknown.spec.ts'
  const testFolder = testFile.split('/').slice(-2, -1)[0] || 'default'
  const locale = testInfo.project?.use?.locale || 'en'
  const baseURL =
    process.env.CLUSTERIX_BASE_URL || 'https://testing.clusterix.io'

  await Allure.step(`Initializing test context`, async () => {
    if (!baseURL) throw new Error('Test Context: baseURL is undefined!')

    const finalURL = targetPath ? `${baseURL}${targetPath}` : baseURL

    await page.goto(finalURL, { waitUntil: 'load' })
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
      {
        key: 'skipWelcome',
        action: (page, testInfo) => skipWelcomeHelper(page, testInfo),
      },
    ]

    for (const { key, action } of setupActions) {
      const configValue = getConfigValue(key, testFile, testFolder)
      if (configValue) {
        await Allure.step(`Skipping: ${key.replace('skip', '')}`, async () => {
          await action(page, testInfo)
        })
      }
    }
  })

  return { locale }
}
