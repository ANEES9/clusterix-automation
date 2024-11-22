import { defineConfig } from '@playwright/test'
import * as dotenv from 'dotenv'
import path from 'node:path'

const env = process.env.NODE_ENV || 'production'
dotenv.config({ path: `.env.${env}` })

export default defineConfig({
  testDir: './tests',
  retries: 0,
  reporter: [['html', { outputFolder: 'playwright-report' }]],
  use: {
    headless: false,
    baseURL: process.env.BASE_URL,
    storageState: path.join('sessions', `storageState.${env}.json`),
    viewport: { width: 1280, height: 720 },
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'UI Tests',
      testDir: './tests',
    },
    /*{
      name: 'API Tests',
      testDir: './tests/api',
    },*/
  ],
})
