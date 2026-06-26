import { chromium } from '@playwright/test'
import dotenv from 'dotenv'
import { LoginPage } from '../pages/login-register/login-page'

dotenv.config({ path: '.env.testing' })

async function run() {
  console.log('Base URL:', process.env.CLUSTERIX_BASE_URL)
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  try {
    const loginPage = new LoginPage(page, 'en')
    await loginPage.goto(process.env.CLUSTERIX_BASE_URL)
    await loginPage.setLocale('en')
    console.log('Page URL after setLocale:', page.url())

    console.log('Filling credentials...')
    await loginPage.login(
      process.env.CLUSTERIX_EMAIL || '',
      process.env.CLUSTERIX_PASSWORD || ''
    )

    console.log('Page URL after login:', page.url())
    const body = await page.evaluate(() => document.body.innerHTML)
    if (body.includes('Invalid') || body.includes('Ungültig') || body.includes('error')) {
      console.log('Found error text on page!')
    }
    
    await page.screenshot({ path: 'scratch/login-result.png' })
    console.log('Screenshot saved to scratch/login-result.png')

    const state = await page.context().storageState()
    console.log('Cookies count:', state.cookies.length)
    console.log('LocalStorage keys:', state.origins[0]?.localStorage?.map(x => x.name))
  } catch (error) {
    console.error('Error occurred:', error)
  } finally {
    await browser.close()
  }
}

run()
