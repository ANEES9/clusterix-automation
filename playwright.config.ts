import { defineConfig } from '@playwright/test'
import * as dotenv from 'dotenv'
import path from 'node:path'

const env = process.env.NODE_ENV || 'production'
dotenv.config({ path: `.env.${env}` })

export default defineConfig({
  testDir: './tests',
  retries: 0,
  reporter: [
    ['list'],
    //['html', { open: 'never' }],
    ['allure-playwright', { outputFolder: 'results' }],
  ],
  use: {
    trace: 'on-first-retry',
    headless: true,
    baseURL: process.env.BASE_URL,
    storageState: path.join('sessions', `storageState.${env}.json`),
    viewport: { width: 1280, height: 720 },
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  globalSetup: require.resolve('./global-setup'),
  projects: [
    {
      name: 'UI Tests',
      testDir: './tests',
    },

  ],
})
