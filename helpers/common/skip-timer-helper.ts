import { Page, TestInfo } from '@playwright/test'
import { StartTimerModalPage } from 'pages/time-tracking/start-timer-modal-page'

export async function skipTimerHelper(
  page: Page,
  _testInfo: TestInfo
): Promise<void> {
  const locale = _testInfo.project?.use.locale || 'en'
  const startTimerModal = new StartTimerModalPage(page, locale)

  try {
    await page.waitForLoadState('domcontentloaded')

    if (
      await startTimerModal.continueWithoutChangingButton
        .waitFor({ state: 'attached', timeout: 5000 })
        .then(() => true)
        .catch(() => false)
    ) {
      if (await startTimerModal.continueWithoutChangingButton.isVisible()) {
        await startTimerModal.continueWithoutChangingButton.click()
        await page.waitForTimeout(1000)
      }
    }

    if (
      await startTimerModal.continueWithoutTimerButton
        .waitFor({ state: 'attached', timeout: 5000 })
        .then(() => true)
        .catch(() => false)
    ) {
      if (await startTimerModal.continueWithoutTimerButton.isVisible()) {
        await startTimerModal.continueWithoutTimerButton.click()
        await page.waitForTimeout(1000)
      }
    }
  } catch {
    // Silently handle errors without defining a variable
  }
}
