export interface TestSummary {
  statistic: {
    total: number
    passed: number
    failed: number
    broken: number
    skipped: number
  }
  time: {
    duration: number
  }
}
