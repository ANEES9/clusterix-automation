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
    headless: false,
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
      name: 'Chromium - Comapny Searcher',
      use: { ...devices['Desktop Chrome'],
        storageState: path.join(
          process.cwd(),
          'sessions',
          `storageState.${process.env.NODE_ENV || 'testing'}.json`
        ),
       },
      testDir: './tests/company_searcher',
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
      name: 'Chromium - Comapny Searcher',
      use: { ...devices['Desktop Firefox'],
        storageState: path.join(
          process.cwd(),
          'sessions',
          `storageState.${process.env.NODE_ENV || 'testing'}.json`
        ),
       },
      testDir: './tests/company_searcher',
    },

    {
      name: 'Firefox - Email',
      use: {
        ...devices['Desktop Firefox'],
        storageState: path.join(
          process.cwd(),
          'sessions',
          `storageState.${process.env.NODE_ENV || 'testing'}.json`
        ),
      },
      testDir: './tests/email',
    },
    // WebKit Browser
    {
      name: 'WebKit - Auth',
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
      name: 'Chromium - Comapny Searcher',
      use: { ...devices['Desktop Safari'],
        storageState: path.join(
          process.cwd(),
          'sessions',
          `storageState.${process.env.NODE_ENV || 'testing'}.json`
        ),
       },
      testDir: './tests/company_searcher',
    },

    {
      name: 'WebKit - Email',
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
})
