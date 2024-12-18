import { test, expect } from '@playwright/test'
import * as dotenv from 'dotenv'

const env = process.env.NODE_ENV || 'production'
dotenv.config({ path: `.env.${env}` })

test('Login to Clusterix', async ({ page }) => {
  await page.goto(process.env.CLUSTERIX_BASE_URL || '')
  await page.getByRole('button', { name: 'Login' }).nth(1).click()
  await page.getByPlaceholder('Email').fill(process.env.EMAIL || '')
  await page.getByPlaceholder('Password').fill(process.env.PASSWORD || '')
  await page
    .locator('div')
    .filter({ hasText: /^Login$/ })
    .first()
    .click()
  await expect(page).toHaveURL(`${process.env.CLUSTERIX_BASE_URL}`)
})
