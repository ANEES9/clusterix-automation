import fs from 'fs/promises'
import path from 'path'
import { performanceConfig } from '../config/performance-config'

const {
  logFilePath,
  logPerformancePath,
  expectedMetrics,
  weights,
  idealNavigationTime,
} = performanceConfig

function getCurrentTimestamp(): string {
  const now = new Date()
  return now.toISOString()
}

export function calculatePerformancePercentage(
  metrics: Record<string, number>,
  expected: Record<string, number>,
  weights: Record<string, number>
) {
  let totalWeightedScore = 0
  let totalWeights = 0

  const metricResults: Record<string, number> = {}

  for (const [key, actualValue] of Object.entries(metrics)) {
    if (expected[key] !== undefined) {
      const expectedValue = expected[key]
      const weight = weights[key] || 1 // Default weight is 1 if not specified

      let successRate = 100
      if (actualValue > expectedValue) {
        successRate = Math.max(
          0,
          (1 - (actualValue - expectedValue) / expectedValue) * 100
        )
      }

      metricResults[key] = successRate

      totalWeightedScore += successRate * weight
      totalWeights += weight
    }
  }

  const overallPerformance =
    totalWeights > 0 ? totalWeightedScore / totalWeights : 0

  return {
    metricResults,
    overallPerformance,
  }
}

export function calculateNavigationTimePercentage(
  timeTaken: number,
  idealTime: number
) {
  return Math.max(0, (1 - (timeTaken - idealTime) / idealTime) * 100)
}

export async function logPerformanceData(
  testName: string,
  timeTaken: number,
  metrics?: Record<string, any>
) {
  const timestamp = getCurrentTimestamp()
  let logMessage = `[${timestamp}] ${testName}: ${timeTaken.toFixed(2)} ms\n`

  // Calculate navigation time percentage
  let navigationTimePercentage = 100
  if (timeTaken > idealNavigationTime) {
    navigationTimePercentage = Math.max(
      0,
      (1 - (timeTaken - idealNavigationTime) / idealNavigationTime) * 100
    )
  }

  if (metrics) {
    const { metricResults, overallPerformance } =
      calculatePerformancePercentage(metrics, expectedMetrics, weights)

    logMessage += `Performance Metrics:\n`
    for (const [key, value] of Object.entries(metrics)) {
      logMessage += `  ${key}: ${value} ms\n`
    }

    logMessage += `Metric Success Rates:\n`
    for (const [key, percentage] of Object.entries(metricResults)) {
      logMessage += `  ${key}: ${percentage.toFixed(2)}%\n`
    }

    logMessage += `Overall Performance: ${overallPerformance.toFixed(2)}%\n`
  }

  // Append navigation time percentage to the log
  logMessage += `Navigation Time Percentage: ${navigationTimePercentage.toFixed(2)}%\n`

  try {
    const logsDir = path.dirname(logPerformancePath)
    await fs.mkdir(logsDir, { recursive: true })
    await fs.appendFile(logPerformancePath, logMessage, 'utf8')
    console.log(`Logged performance data: ${logMessage.trim()}`)
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Failed to log performance data: ${error.message}`)
    } else {
      console.error('An unknown error occurred during logging.')
    }
  }
}

export async function logNavigationTime(testName: string, timeTaken: number) {
  const timestamp = getCurrentTimestamp()
  let logMessage = `[${timestamp}]\n${testName}: ${timeTaken.toFixed(2)} ms\n`

  try {
    const logsDir = path.dirname(logFilePath)
    await fs.mkdir(logsDir, { recursive: true })
    await fs.appendFile(logFilePath, logMessage, 'utf8')
    console.log(`Logged navigation time: ${logMessage.trim()}`)
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Failed to log navigation time: ${error.message}`)
    } else {
      console.error('An unknown error occurred during logging.')
    }
  }
}
