import { defineConfig, devices } from '@playwright/test'
import * as dotenv from 'dotenv'
import path from 'node:path'

const env = process.env.NODE_ENV || 'production'
dotenv.config({ path: `.env.${env}` })

export default defineConfig({
  testDir: './tests',
  retries: 2,
  reporter: [
    ['list'],
    // ['html', { open: 'never' }],
    ['allure-playwright', { outputFolder: 'results' }],
  ],
  use: {
    trace: 'on-first-retry',
    headless: true,
    baseURL: process.env.CLUSTERIX_BASE_URL,
    storageState: path.join('sessions', `storageState.${env}.json`),
    viewport: { width: 1280, height: 720 },
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  globalSetup: require.resolve('./global-setup'),
  projects: [
    // Chromium Browser
    {
      name: 'Chromium - Auth',
      use: { ...devices['Desktop Chrome'] },
      testDir: './tests/auth',
    },
    {
      name: 'Chromium - Dashboard',
      use: { ...devices['Desktop Chrome'] },
      testDir: './tests/dashboard',
    },
    {
      name: 'Chromium - Settings',
      use: { ...devices['Desktop Chrome'] },
      testDir: './tests/settings',
    },

    // Firefox Browser
    {
      name: 'Firefox - Auth',
      use: { ...devices['Desktop Firefox'] },
      testDir: './tests/auth',
    },
    {
      name: 'Firefox - Dashboard',
      use: { ...devices['Desktop Firefox'] },
      testDir: './tests/dashboard',
    },
    {
      name: 'Firefox - Settings',
      use: { ...devices['Desktop Firefox'] },
      testDir: './tests/settings',
    },

    // WebKit Browser
    {
      name: 'WebKit - Auth',
      use: { ...devices['Desktop Safari'] },
      testDir: './tests/auth',
    },
    {
      name: 'WebKit - Dashboard',
      use: { ...devices['Desktop Safari'] },
      testDir: './tests/dashboard',
    },
    {
      name: 'WebKit - Settings',
      use: { ...devices['Desktop Safari'] },
      testDir: './tests/settings',
    },
  ],
})
