import { test, expect, Page } from '@playwright/test'
import { closeWelcomePopUp } from '../../helpers/welcome-popup-helper'
import { closeTimerPopUp } from '../../helpers/timer-helper'
import { openNavigationMenu } from '../../helpers/navigation-helper'
import { closeCurrentlyActivePopup } from '../../helpers/company-searcher-helper'
import { logPerformanceData } from '../../helpers/log-helper'
import { performanceConfig } from '../../config/performance-config'

test.describe('Clusterix Performance Tests', () => {
  const idealNavigationTime = performanceConfig.idealNavigationTime || 2000

  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(baseURL!)
    await closeWelcomePopUp(page)
    await closeTimerPopUp(page)
    await openNavigationMenu(page)
    await page.waitForLoadState('networkidle')
  })

  async function measurePerformance(
    page: Page,
    navButtonName: string,
    headerSelector: string,
    testName: string,
    additionalAction?: () => Promise<void>
  ) {
    let performanceData: Record<string, number> | null = null
    let timeTaken: number | null = null

    try {
      const navButton = page.getByRole('button', {
        name: navButtonName,
        exact: true,
      })
      const startTime = performance.now()
      await navButton.click()

      if (additionalAction) {
        await additionalAction()
      }

      const header = page.locator(headerSelector)
      await header.waitFor({ state: 'visible' })
      const endTime = performance.now()
      timeTaken = endTime - startTime

      performanceData = await page.evaluate(() => {
        const timing = window.performance.timing
        return {
          dnsLookupTime: timing.domainLookupEnd - timing.domainLookupStart,
          tcpHandshakeTime: timing.connectEnd - timing.connectStart,
          responseTime: timing.responseEnd - timing.requestStart,
          domContentLoadedTime:
            timing.domContentLoadedEventEnd - timing.navigationStart,
          pageLoadTime: timing.loadEventEnd - timing.navigationStart,
        }
      })

      let timeTakenPercentage = 100
      if (timeTaken > idealNavigationTime) {
        timeTakenPercentage = Math.max(
          0,
          (1 - (timeTaken - idealNavigationTime) / idealNavigationTime) * 100
        )
      }

      console.log(
        `[${new Date().toISOString()}] ${testName} Navigation Time Percentage: ${timeTakenPercentage.toFixed(2)}%`
      )

      expect(timeTaken).toBeLessThan(idealNavigationTime)
    } catch (error) {
      console.error(`Test failed for ${testName}:`, error.message)
    } finally {
      if (performanceData && timeTaken !== null) {
        await logPerformanceData(testName, timeTaken, performanceData)
      } else {
        console.warn(`Performance data not available for ${testName}`)
      }
    }
  }

  const pages = [
    {
      name: 'Files',
      headerSelector:
        'div.ca-whitespace-nowrap.ca-text-ellipsis.ca-overflow-hidden:has-text("Upload file")',
      testName: 'Navigate to Files',
    },
    {
      name: 'Office',
      headerSelector: 'h1:has-text("Cluster Office")',
      testName: 'Navigate to Office',
    },
    {
      name: 'PDF',
      headerSelector: 'h1:has-text("Cluster PDF")',
      testName: 'Navigate to PDF',
    },
    {
      name: 'HR',
      headerSelector: 'span:has-text("Dashboard")',
      testName: 'Navigate to HR',
    },
    {
      name: 'Project Management',
      headerSelector: 'b:has-text("All Projects")',
      testName: 'Navigate to Project Management',
    },
    {
      name: 'Task Management',
      headerSelector: 'h1:has-text("Dashboard")',
      testName: 'Navigate to Task Management',
    },
    {
      name: 'Time Tracking',
      headerSelector: 'span:has-text("Timer")',
      testName: 'Navigate to Time Tracking',
    },
    {
      name: 'Company Searcher',
      headerSelector: 'div:has-text("Company")',
      testName: 'Navigate to Company Searcher',
    },
    {
      name: 'Customers',
      headerSelector: 'h1:has-text("Dashboard")',
      testName: 'Navigate to Customers',
    },
    {
      name: 'No Code',
      headerSelector: 'h1:has-text("About No-Code")',
      testName: 'Navigate to No Code',
    },
    {
      name: 'Template Manager',
      headerSelector: 'h1:has-text("All Templates")',
      testName: 'Navigate to Template Manager',
    },
  ]

  for (const pageInfo of pages) {
    test(`Performance Test: ${pageInfo.name}`, async ({ page }) => {
      if (pageInfo.name === 'Company Searcher') {
        await measurePerformance(
          page,
          pageInfo.name,
          pageInfo.headerSelector,
          pageInfo.testName,
          async () => {
            await closeCurrentlyActivePopup(page)
          }
        )
      } else {
        await measurePerformance(
          page,
          pageInfo.name,
          pageInfo.headerSelector,
          pageInfo.testName
        )
      }
    })
  }
})
