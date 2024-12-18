import { Page } from '@playwright/test'
import * as path from 'path'
import * as dotenv from 'dotenv'
import * as fs from 'node:fs'

const env = process.env.NODE_ENV || 'production'
dotenv.config({ path: `.env.${env}` })

const sessionFilePath = path.join('sessions', `storageState.${env}.json`)

export async function loginAndSaveSession(page: Page) {
  await page.goto(process.env.CLUSTERIX_BASE_URL || '')
  await page.getByRole('button', { name: 'Login' }).nth(1).click()
  await page.getByPlaceholder('Email').fill(process.env.EMAIL || '')
  await page.getByPlaceholder('Password').fill(process.env.PASSWORD || '')
  await page
    .locator('div')
    .filter({ hasText: /^Login$/ })
    .first()
    .click()
  await page.waitForURL(`${process.env.CLUSTERIX_BASE_URL}`)
  await page.context().storageState({ path: sessionFilePath })
}

export async function getAccessTokenFromStorageState(): Promise<string> {
  const sessionFilePath = path.join('sessions', `storageState.${env}.json`)
  try {
    const storageState = JSON.parse(fs.readFileSync(sessionFilePath, 'utf-8'))
    const userData = storageState.origins
      .find((origin: any) => origin.origin.includes(process.env.CLUSTERIX_BASE_URL))
      ?.localStorage.find((item: any) => item.name === 'user')?.value
    if (!userData) {
      throw new Error('User data not found in storageState.')
    }
    const parsedData = JSON.parse(userData)
    const accessToken = parsedData.access_token
    if (!accessToken) {
      throw new Error('Access token not found in user data.')
    }
    return accessToken
  } catch (error) {
    console.error('Error reading access token from storageState:', error)
    throw error
  }
}
