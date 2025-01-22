import { test, expect } from '@playwright/test'
import { closeTimerPopUp } from 'common/timer-helper'
import { skipSurveyHelper } from 'common/skip-survey-helper'
import { skipProductTourHelper } from 'common/skip-product-tour-helper'
import { addCursorStyleAndScript } from 'common/cursor-helper'
import { FilesPage } from 'pages/files/files-page'

test.describe('File Reggression Suite', () => {
  let filesPage: FilesPage
  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    const locale: string = testInfo.project.use?.locale ?? 'en'
    filesPage = new FilesPage(page, locale)
    console.log('Base URL:', baseURL)
    console.log('Navigating to:', `${baseURL}/cluster-space`)
    await filesPage.goto(baseURL)
    await skipSurveyHelper(page, testInfo)
    await skipProductTourHelper(page, testInfo)
    await closeTimerPopUp(page)
    await addCursorStyleAndScript(page)
    await page.waitForLoadState('networkidle')
  })
  // Test case to click on New button

  test('Verify Files Section is Clickable', async ({ page }) => {
    const currentURL = page.url()
    expect(currentURL).toBe('https://clusterix.io/cluster-space')

    await filesPage.clickNewButton()
    await filesPage.clickFolderButton()

    const textBox = page.getByRole('textbox').nth(1)
    await textBox.fill('T2')
    await textBox.press('Enter')
    await page.waitForTimeout(3000)

    await filesPage.clickNewButton()
    await filesPage.clickCellButton()
    await page.getByText('Untitled.ods15.01.2025').click({ button: 'right' })
    await filesPage.renameItem('T3')
  })

  test('Verify the right menu functions', async ({ page }) => {
    await filesPage.clickNewButton()
    await filesPage.clickFolderButton()

    const firstItem = page.locator('.gdMggH77DSxqYPefQlBE').first()
    await firstItem.click({ button: 'right' })
    await filesPage.renameItem('Test1')
  })

  test('Download and Trash action', async ({ page }) => {
    const firstCheckbox = page.locator('#main-area label').nth(1)
    await firstCheckbox.click()

    const downloadPromise = page.waitForEvent('download')
    await page
      .locator('td:nth-child(7) > .fTrbfOFwnQNNmUXd5tm3')
      .first()
      .click()
    const download = await downloadPromise
    console.log(`Downloaded file: ${await download.path()}`)

    await page.waitForTimeout(2000)

    await filesPage.deleteItem()
    await page.waitForTimeout(2000)
  })

  test('Page movement by clicking icons', async ({ page }) => {
    const firstLabel = page.locator('#main-area label').first()
    await firstLabel.click()
    await page.waitForTimeout(3000)

    await filesPage.navigateToFavorites()
    await page.waitForTimeout(2000)

    await filesPage.navigateToSharedWithMe()
    await page.waitForTimeout(2000)

    await filesPage.navigateToTrash()
    await page.waitForTimeout(2000)
  })

  test('should interact with notes and tags', async () => {
    // Interact with the page using POM methods
    await filesPage.clickThemeIcon()
    await filesPage.clickFirstElement()
    await filesPage.clickSecondElement()
    await filesPage.enterNotes('Testing purpose')
    await filesPage.addTag('Test')
    await filesPage.addTag('Test1')
    //await notesPage.selectTag('test1');
  })

  test('Upload file button action', async ({ page }) => {
    // Click on the "Upload file" button
    await filesPage.clickUploadButton()

    // Upload the file
    const filePath =
      'C:/Users/User/Downloads/toms-basics-2024_completion_2024-12-26.pdf'

    await filesPage.uploadFile(filePath)

    // Verify the file upload (Optional: if there's a confirmation or visible file listing)
    const isFileUploaded = await filesPage.verifyFileUploaded(
      'toms-basics-2024_completion_2024-12-26.pdf'
    )
    expect(isFileUploaded).toBeTruthy()
  })
})
