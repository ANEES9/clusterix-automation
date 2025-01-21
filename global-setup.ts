import { chromium } from '@playwright/test'
import * as fs from 'fs'
import dotenv from 'dotenv'
import { LoginPage } from './pages/auth/login-page'
import { LANGUAGES, getSessionFilePath } from 'config/language-config'

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'testing'}` })

/**
 * Create a new session and save it to the specified file.
 * @param locale - The locale for which the session is created (e.g., 'en', 'de').
 * @param sessionFilePath - The file path where the session state is saved.
 */
async function createSessionForLocale(locale: string, sessionFilePath: string) {
  const browser = await chromium.launch({ headless: false })
  const context = await browser.newContext()
  const page = await context.newPage()

  try {
    const loginPage = new LoginPage(page, locale)

    // Navigate to the login page and set the locale
    await loginPage.goto(process.env.CLUSTERIX_BASE_URL || '')
    await loginPage.setLocale(locale)

    // Perform login with environment variables
    await loginPage.login(
      process.env.CLUSTERIX_EMAIL || '',
      process.env.CLUSTERIX_PASSWORD || ''
    )

    // Save the storage state
    await context.storageState({ path: sessionFilePath })
    console.log(`Session for locale "${locale}" created at: ${sessionFilePath}`)
  } catch (error) {
    console.error(`Failed to create session for locale "${locale}":`, error)
    throw error
  } finally {
    await browser.close()
  }
}

/**
 * Global setup to create session files for all locales defined in LANGUAGES.
 */
async function globalSetup() {
  const env = process.env.NODE_ENV || 'testing'

  for (const locale of LANGUAGES) {
    const sessionFilePath = getSessionFilePath(locale, env)

    // Check if the session file exists; create it if not
    if (!fs.existsSync(sessionFilePath)) {
      console.log(`Creating session for locale "${locale}"...`)
      await createSessionForLocale(locale, sessionFilePath)
    } else {
      console.log(
        `Session for locale "${locale}" already exists at: ${sessionFilePath}`
      )
    }
  }
}

export default globalSetup
