import { defineConfig, devices } from '@playwright/test'
import * as dotenv from 'dotenv'
import path from 'node:path'
import allurePlaywright  from 'allure-playwright';

const env = process.env.NODE_ENV || 'production'
dotenv.config({ path: `.env.${env}` })

export default defineConfig({
  testDir: './tests',
  retries: 0,
  timeout: 600 * 10000, // Global timeout for each test (1 minute)
  expect: {
    timeout: 60 * 1000, // Timeout for expect assertions (10 seconds)
  },
  reporter: [
    ['list'],
    // ['html', { open: 'never' }],
    ['allure-playwright', { outputFolder: 'results' }],
  ],
  use: {
    trace: 'on-first-retry',
    headless: false,
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
      name: 'Chromium - Container App',
      use: { ...devices['Desktop Chrome'] },
      testDir: './tests/container-app',
    },
    {
      name: 'Chromium - Settings',
      use: { ...devices['Desktop Chrome'] },
      testDir: './tests/settings',
    },
    {
      name: 'Chromium - Profile',
      use: { ...devices['Desktop Chrome'] },
      testDir: './tests/profile',
    },
    /*{
      name: 'Chromium - HR',
      use: { ...devices['Desktop Chrome'] },
      testDir: './tests/hr',
    },*/

    // Firefox Browser
    {
      name: 'Firefox - Auth',
      use: { ...devices['Desktop Firefox'] },
      testDir: './tests/auth',
    },
    {
      name: 'Firefox - Container App',
      use: { ...devices['Desktop Firefox'] },
      testDir: './tests/container-app',
    },
    {
      name: 'Firefox - Settings',
      use: { ...devices['Desktop Firefox'] },
      testDir: './tests/settings',
    },
    {
      name: 'Firefox - HR',
      use: { ...devices['Desktop Firefox'] },
      testDir: './tests/hr',
    },

    // WebKit Browser
    {
      name: 'WebKit - Auth',
      use: { ...devices['Desktop Safari'] },
      testDir: './tests/auth',
    },
    {
      name: 'WebKit - Container App',
      use: { ...devices['Desktop Safari'] },
      testDir: './tests/container-app',
    },
    {
      name: 'WebKit - Settings',
      use: { ...devices['Desktop Safari'] },
      testDir: './tests/settings',
    },
    /*{
      name: 'WebKit - HR',
      use: { ...devices['Desktop Safari'] },
      testDir: './tests/hr',
    },*/
  ],
})
