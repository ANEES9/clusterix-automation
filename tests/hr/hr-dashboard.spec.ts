import { test, expect } from '@playwright/test'
import { closeWelcomePopUp } from '../../helpers/welcome-popup-helper'
import { closeTimerPopUp } from '../../helpers/timer-helper'
import { addCursorStyleAndScript } from '../../helpers/cursor-helper'

test.describe('Dashboard contents', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/hr/dashboard`);
    await page.waitForLoadState('networkidle');
    await closeWelcomePopUp(page);
    await closeTimerPopUp(page);
    await addCursorStyleAndScript(page);
    await page.waitForLoadState('networkidle');
  })

  //Test mo:case_id=827
  test.only('Verify User is able to see & apply Absence from Vacation Days', async ({ page }) => {

    await test.step('1- Navigate to My Absence Days and Verify vacation type and Days left', async () => {

      const vacationTypeText = await page.getByText('Vacation Days').textContent();
      const vacationDaysLeft = await page.getByText('Days left').textContent();

      // Ensure both values are not null (because textContent might return null)
      const combined = (vacationTypeText ?? '') + ' ' + (vacationDaysLeft ?? '');
      console.log(combined);
    })

    await test.step('2- Click on the "+" symbol to add absence and verify', async () => {

      const addVacation = page.locator('div').filter({ hasText: /^My RequestsVacation Days 20240 Days left Sick DayHome Office Other$/ }).getByRole('button').nth(1);
      await expect(addVacation).toBeVisible();
      await addVacation.click();
    })

    await test.step('3- Choose date and click on the "Next" button', async () => {
      await page.locator('div').filter({ hasText: /^31$/ }).first().click();
      await page.getByRole('button', { name: 'Next' }).click();
    })

    await test.step('4- Select any co-worked from responsible dropdown and click Next', async () => {
      //getByPlaceholder('Please select')
      await page.getByPlaceholder('Please select').click();
      await page.getByText('Aayushi Kambriya').click();
      await page.locator('.ca-fixed').click();
      await page.getByRole('button', { name: 'Next' }).click();
    })

    await test.step('5- Click on "Send" Button on the Team lead screen', async () => {

      // leaving empty since this is procution env
    })

    await test.step('6- Click on the "Close" button on the confirmation dialogue', async () => {

      const vacationDaysClosePopup = page.locator('#undefined').getByRole('button').first();
      await expect(vacationDaysClosePopup).toBeVisible();
      await vacationDaysClosePopup.click();
    })



  })

  test('HR-Dashboard - Verify Employee requests', async ({ page }) => {
    //getByText('Vacation Days')
    //getByText('Days left')
    //locator('div').filter({ hasText: /^My RequestsVacation Days 20240 Days left Sick DayHome Office Other$/ }).getByRole('button').nth(1)
    //locator('#undefined').getByRole('button').first()
  })

  test('HR-Dashboard - Verify Violations', async ({ page }) => {

  })



})
