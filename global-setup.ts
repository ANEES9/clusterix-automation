import { chromium } from '@playwright/test'
import * as fs from 'fs'
import * as path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'testing'}` })

const rootDir = process.cwd()
const sessionsDir = path.join(rootDir, 'sessions')
const sessionFilePath = path.join(
  sessionsDir,
  `storageState.${process.env.NODE_ENV || 'testing'}.json`
)

/**
 * Create a new session and save it to the specified file.
 */
async function createNewSession() {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext()
  const page = await context.newPage()

  try {
    // Navigate to the base URL and perform login
    await page.goto(process.env.CLUSTERIX_BASE_URL || '')
    await page.getByRole('button', { name: 'Login' }).nth(1).click()
    await page.getByPlaceholder('Email').fill(process.env.CLUSTERIX_EMAIL || '')
    await page
      .getByPlaceholder('Password')
      .fill(process.env.CLUSTERIX_PASSWORD || '')
    await page
      .locator('div')
      .filter({ hasText: /^Login$/ })
      .first()
      .click()
    await page.waitForURL(`${process.env.CLUSTERIX_BASE_URL}`)
    await page.waitForTimeout(2000)

    // Save the session to the file
    await context.storageState({ path: sessionFilePath })
  } catch (error) {
    console.error('Failed to create session:', error)
    throw error
  } finally {
    await browser.close()
  }
}

/**
 * Global setup function to ensure session file is created.
 */
async function globalSetup() {
  // Ensure the sessions directory exists
  if (!fs.existsSync(sessionsDir)) {
    fs.mkdirSync(sessionsDir, { recursive: true })
  }

  // Always create a new session at the start of the test run
  await createNewSession()
}

export default globalSetup
