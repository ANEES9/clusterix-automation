import { chromium } from '@playwright/test'
import * as fs from 'fs'
import * as path from 'path'
import dotenv from 'dotenv'

const env = process.env.NODE_ENV || 'production'
dotenv.config({ path: `.env.${env}` })

const sessionFilePath = path.join('sessions', `storageState.${env}.json`)

async function globalSetup() {
  if (fs.existsSync(sessionFilePath)) {
    console.log(`Session already exists at ${sessionFilePath}. Skipping login.`)
    return
  }

  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  console.log('Logging in and saving session...')
  await page.goto(process.env.CLUSTERIX_BASE_URL || '')

  await page.getByRole('button', { name: 'Login' }).nth(1).click()
  await page.getByPlaceholder('Email').fill(process.env.CLUSTERIX_EMAIL || '')
  await page.getByPlaceholder('Password').fill(process.env.CLUSTERIX_PASSWORD || '')
  await page
    .locator('div')
    .filter({ hasText: /^Login$/ })
    .first()
    .click()
  await page.waitForURL(`${process.env.CLUSTERIX_BASE_URL}`)

  await page.context().storageState({ path: sessionFilePath })
  console.log(`Session saved at: ${sessionFilePath}`)

  await browser.close()
}

export default globalSetup
