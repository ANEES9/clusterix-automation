import { defineConfig, devices } from '@playwright/test'
import * as dotenv from 'dotenv'
import path from 'node:path'
import { LANGUAGES } from '../clusterix-automation/config/language-config'
import { APP_NAMES } from '../clusterix-automation/shared/constants/app-names'

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'testing'}` })

export default defineConfig({
  testDir: '../tests',
  retries: 0,
  reporter: [
    ['list'],
    // ['html', { open: 'never' }],
    ['allure-playwright', { outputFolder: 'results' }],
  ],
  use: {
    trace: 'retain-on-failure',

    // Run headlessly by default to save resources in automation.
    // Set environment variable HEADED=true to run in headed visual mode.
    headless: process.env.HEADED === 'true' ? false : true,
    baseURL: process.env.CLUSTERIX_BASE_URL,
    viewport: { width: 1280, height: 720 },
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  globalSetup: require.resolve('./global-setup'),
  //globalTeardown: require.resolve('./global-teardown'),
  workers: 1,
  projects: [
    // Generate projects dynamically
    ...generateProjects(),
  ],
  testMatch: ['**/*.spec.ts'],
})
// Function to generate projects dynamically
function generateProjects() {
  const browsers = [
    { name: 'Chromium', device: devices['Desktop Chrome'] },
    { name: 'Firefox', device: devices['Desktop Firefox'] },
    //{ name: 'WebKit', device: devices['Desktop Safari'] },
  ]

  const projects: any[] = []
  LANGUAGES.forEach((locale) => {
    Object.keys(APP_NAMES).forEach((appKey) => {
      const testDir = `./tests/${toKebabCase(appKey as keyof typeof APP_NAMES)}`
      const sessionFile = `storageState.${process.env.NODE_ENV || 'testing'}.${locale}.json`

      browsers.forEach(({ name, device }) => {
        projects.push({
          name: `${name} - ${APP_NAMES[appKey as keyof typeof APP_NAMES]} (${locale.toUpperCase()})`,
          use: {
            ...device,
            locale,
            storageState:
              appKey === 'loginRegister' || appKey === 'landing'
                ? undefined
                : path.join(process.cwd(), 'sessions', sessionFile),
          },
          testDir,
        })
      })
    })
  })
  return projects
}

// Convert camelCase to kebab-case
function toKebabCase(str: string) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}
