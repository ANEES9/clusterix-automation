import { defineConfig, devices } from '@playwright/test'
import * as dotenv from 'dotenv'
import path from 'node:path'

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'production'}` })

export default defineConfig({
  testDir: './tests',
  retries: 0,
  reporter: [
    ['list'],
    // ['html', { open: 'never' }],
    ['allure-playwright', { outputFolder: 'results' }],
  ],
  use: {
    trace: 'on-first-retry',
    headless: true,
    baseURL: process.env.CLUSTERIX_BASE_URL,
    viewport: { width: 1280, height: 720 },
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  globalSetup: require.resolve('./global-setup'),
  globalTeardown: require.resolve('./global-teardown'),
  workers: 1,
  projects: [
    // Chromium Browser
    {
      name: 'Chromium - Auth',
      use: {
        ...devices['Desktop Chrome'],
        storageState: undefined, // Don't use session for auth tests
      },
      testDir: './tests/auth',
    },
    {
      name: 'Chromium - Container App',
      use: {
        ...devices['Desktop Chrome'],
        storageState: path.join(
          process.cwd(),
          'sessions',
          `storageState.${process.env.NODE_ENV || 'testing'}.json`
        ),
      },
      testDir: './tests/container-app',
    },

    // Firefox Browser
    {
      name: 'Firefox - Auth',
      use: {
        ...devices['Desktop Firefox'],
        storageState: undefined, // Don't use session for auth tests
      },
      testDir: './tests/auth',
    },
    {
      name: 'Firefox - Container App',
      use: {
        ...devices['Desktop Firefox'],
        storageState: path.join(
          process.cwd(),
          'sessions',
          `storageState.${process.env.NODE_ENV || 'testing'}.json`
        ),
      },
      testDir: './tests/container-app',
    },

    // WebKit Browser
    {
      name: 'WebKit - Auth',
      use: {
        ...devices['Desktop Safari'],
        storageState: undefined, // Don't use session for auth tests
      },
      testDir: './tests/auth',
    },
    {
      name: 'WebKit - Container App',
      use: {
        ...devices['Desktop Safari'],
        storageState: path.join(
          process.cwd(),
          'sessions',
          `storageState.${process.env.NODE_ENV || 'testing'}.json`
        ),
      },
      testDir: './tests/container-app',
    },
  ],
})
