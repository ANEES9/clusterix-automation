import { chromium } from '@playwright/test'
import { loginAndSaveSession } from './helpers/auth-helper'

const env = process.env.NODE_ENV || 'production'

export default async () => {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  await loginAndSaveSession(page)
  console.log(`Session saved to: sessions/storageState.${env}.json`)
  await browser.close()
}
