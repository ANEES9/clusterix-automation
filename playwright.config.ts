import { defineConfig, devices } from '@playwright/test'
import * as dotenv from 'dotenv'
import path from 'node:path'

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'production'}` })

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  retries: 0,
  reporter: [
    ['list'],
    // ['html', { open: 'never' }],
    ['allure-playwright', { outputFolder: 'results' }],
  ],
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
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
    // Chromium Browser (EN)
    {
      name: 'Chromium - Auth (EN)',
      use: {
        ...devices['Desktop Chrome'],
        locale: 'en',
        storageState: undefined, // Don't use session for auth tests
      },
      testDir: './tests/auth',
    },
    {
      name: 'Chromium - Container App (EN)',
      use: {
        ...devices['Desktop Chrome'],
        locale: 'en',
        storageState: path.join(
          process.cwd(),
          'sessions',
          `storageState.${process.env.NODE_ENV || 'testing'}.en.json`
        ),
      },
      testDir: './tests/container-app',
    },
    {
      name: 'Chromium - Email',
      use: {
        ...devices['Desktop Chrome'],
        storageState: path.join(
          process.cwd(),
          'sessions',
          `storageState.${process.env.NODE_ENV || 'testing'}.en.json`
        ),
      },
      testDir: './tests/email',
    },
    {
      name: 'Chromium - Task Management',
      use: {
        ...devices['Desktop Chrome'],
        locale: 'en',
        storageState: path.join(
          process.cwd(),
          'sessions',
          `storageState.${process.env.NODE_ENV || 'testing'}.en.json`
        ), 
      },
      testDir: './tests/task-management',
    },


    // Firefox Browser (EN)
    {
      name: 'Firefox - Auth (EN)',
      use: {
        ...devices['Desktop Firefox'],
        locale: 'en',
        storageState: undefined,
      },
      testDir: './tests/auth',
    },
    {
      name: 'Firefox - Container App (EN)',
      use: {
        ...devices['Desktop Firefox'],
        locale: 'en',
        storageState: path.join(
          process.cwd(),
          'sessions',
          `storageState.${process.env.NODE_ENV || 'testing'}.en.json`
        ),
      },
      testDir: './tests/container-app',
    },

    // WebKit Browser (EN)
    {
      name: 'WebKit - Auth (EN)',
      use: {
        ...devices['Desktop Safari'],
        locale: 'en',
        storageState: undefined, // Don't use session for auth tests
      },
      testDir: './tests/auth',
    },
    {
      name: 'WebKit - Container App (EN)',
      use: {
        ...devices['Desktop Safari'],
        locale: 'en',
        storageState: path.join(
          process.cwd(),
          'sessions',
          `storageState.${process.env.NODE_ENV || 'testing'}.en.json`
        ),
      },
      testDir: './tests/container-app',
    },

    // Chromium Browser (DE)
    {
      name: 'Chromium - Auth (DE)',
      use: {
        ...devices['Desktop Chrome'],
        locale: 'de',
        storageState: undefined, // Don't use session for auth tests
      },
      testDir: './tests/auth',
    },
    {
      name: 'Chromium - Container App (DE)',
      use: {
        ...devices['Desktop Chrome'],
        locale: 'de',
        storageState: path.join(
          process.cwd(),
          'sessions',
          `storageState.${process.env.NODE_ENV || 'testing'}.de.json`
        ),
      },
      testDir: './tests/container-app',
    },

    // Firefox Browser (DE)
    {
      name: 'Firefox - Auth (DE)',
      use: {
        ...devices['Desktop Firefox'],
        locale: 'de',
        storageState: undefined,
      },
      testDir: './tests/auth',
    },
    {
      name: 'Firefox - Container App (DE)',
      use: {
        ...devices['Desktop Firefox'],
        locale: 'de',
        storageState: path.join(
          process.cwd(),
          'sessions',
          `storageState.${process.env.NODE_ENV || 'testing'}.de.json`
        ),
      },
      testDir: './tests/container-app',
    },
    // WebKit Browser (DE)
    {
      name: 'WebKit - Auth (DE)',
      use: {
        ...devices['Desktop Safari'],
        locale: 'de',
        storageState: undefined, // Don't use session for auth tests
      },
      testDir: './tests/auth',
    },
    {
      name: 'WebKit - Container App (DE)',
      use: {
        ...devices['Desktop Safari'],
        locale: 'de',
        storageState: path.join(
          process.cwd(),
          'sessions',
          `storageState.${process.env.NODE_ENV || 'testing'}.de.json`
        ),
      },
      testDir: './tests/container-app',
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
