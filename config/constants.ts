export const APP_URLS = {
  settings: '/settings',
  customers: 'sales',
  accounting: 'accounting',
  byteBuilder: '/byte-builder/schemas',
  calendar: '/calendar',
  timeTracking: '/time-tracking',
  email: '/email',
  liveChat: '/live-chat',
  projectManagement: '/project-management/projects/overview',
  taskManagement: '/task-management',
  hr: '/hr/container-app',
  files: '/cluster-space',
  office: '/cluster-office',
  pdf: '/cluster-pdf',
  companySearcher: '/company-search/company',
  noCode: '/no-code/container-app/overview',
  templateManager: '/template-manager',
}

export const APP_NAMES = {
  ContainerApp: 'Home',
  notifications: 'Notifications',
  calendar: 'Calendar',
  timeTracking: 'Time Tracking',
  email: 'Email',
  liveChat: 'Live Chat',
  projectManagement: 'Project Management',
  taskManagement: 'Task Management',
  hr: 'HR',
  files: 'Files',
  office: 'Office',
  pdf: 'PDF',
  companySearcher: 'Company Searcher',
  noCode: 'No Code',
  templateManager: 'Template Manager',
  accounting: 'Accounting',
  subsidies: 'Subsidies',
  bulkMailing: 'Bulk Mailing',
  customers: 'Customers',
  externalForms: 'External Forms',
  byteBuilder: 'Byte Builder',
  integration: 'Integration',
}

export const AppOwners: Record<string, { name: string; email: string }> = {
  ContainerApp: { name: 'Büşra', email: 'b.ozturk@innoscripta.com' },
  Auth: { name: 'Sagar', email: 'acharya@innoscripta.com' },
  Settings: { name: 'Büşra', email: 'b.ozturk@innoscripta.com' },
}

export const DEFAULT_TEAM = 'QA Team'
export const DEFAULT_OWNER = 'Büşra'
export type AppName = (typeof APP_NAMES)[keyof typeof APP_NAMES]
