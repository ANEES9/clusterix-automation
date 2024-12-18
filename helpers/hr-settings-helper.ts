import { expect, Page } from '@playwright/test'

export async function getGenderOptions(
  page: Page,
  baseURL: string | undefined
): Promise<string[]> {
  if (!baseURL) {
    throw new Error('baseURL is required to retrieve gender options.')
  }

  // Navigate to the App Settings page
  await page.goto(`${process.env.BASE_URL}/settings/app-settings/3`)
  await page.waitForLoadState('networkidle')

  const employeeModalSettingsButton = page
    .locator('span:has-text("Employee Modal Settings")')
    .nth(0)
  await expect(employeeModalSettingsButton).toBeVisible()
  await employeeModalSettingsButton.click()

  // Scroll to the "Form Options" section
  const formOptionsSection = page.locator('span:has-text("Form Options")')
  await formOptionsSection.scrollIntoViewIfNeeded()
  await expect(formOptionsSection).toBeVisible()

  // Locate the first "Genders" section using the parent class
  const gendersSection = page
    .locator(
      'div.Qyy4kmNlQ_4yX2jxPDJq' // Target the specific class
    )
    .nth(0)

  // Ensure the genders section is visible
  await expect(gendersSection).toBeVisible()

  // Locate the child options within this specific section
  const genderOptions = gendersSection.locator('div.ca-whitespace-nowrap')

  // Return the text content of all gender options
  return await genderOptions.allTextContents()
}
