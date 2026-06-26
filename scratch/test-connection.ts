import { chromium } from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.testing' })

async function run() {
  console.log('Base URL:', process.env.CLUSTERIX_BASE_URL)
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  try {
    const url = `${process.env.CLUSTERIX_BASE_URL}/login`
    console.log('Navigating to:', url)
    const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 })
    console.log('Status:', response?.status())
    console.log('Title:', await page.title())
    const body = await page.evaluate(() => document.body.innerHTML)
    console.log('Body length:', body.length)
    await page.screenshot({ path: 'scratch/screenshot.png' })
    console.log('Screenshot saved to scratch/screenshot.png')
  } catch (error) {
    console.error('Error occurred:', error)
  } finally {
    await browser.close()
  }
}

run()
