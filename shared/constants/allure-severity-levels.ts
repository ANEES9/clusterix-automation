export const SEVERITY_LEVELS = {
  blocker: 'blocker',
  critical: 'critical',
  normal: 'normal',
  minor: 'minor',
  trivial: 'trivial',
} as const

export type SeverityLevel = keyof typeof SEVERITY_LEVELS
