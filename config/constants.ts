export const URLs = {
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
  hr: '/hr/dashboard',
  files: '/cluster-space',
  office: '/cluster-office',
  pdf: '/cluster-pdf',
  companySearcher: '/company-search/company',
  noCode: '/no-code/dashboard/overview',
  templateManager: '/template-manager',
}

export const AppNames = {
  calendar: 'Calendar',
  timeTracking: 'Time Tracking',
  email: 'Email',
  liveChat: 'Live Chat',
  projectManagement: 'Project Management',
  taskManagement: 'Task Management',
  hrDashboard: 'HR Dashboard',
  files: 'Files',
  office: 'Office',
  pdf: 'PDF',
  companySearcher: 'Company Searcher',
  noCode: 'No Code',
  templateManager: 'Template Manager',
}

export const AppOwners: Record<string, { name: string; email: string }> = {
  ContainerApp: { name: 'Büşra', email: 'b.ozturk@innoscripta.com' },
  Auth: { name: 'Sagar', email: 'acharya@innoscripta.com' },
  Settings: { name: 'Büşra', email: 'b.ozturk@innoscripta.com' },
}

export const DEFAULT_TEAM = 'QA Team'
export const DEFAULT_OWNER = 'Büşra'
