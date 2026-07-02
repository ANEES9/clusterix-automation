import * as dotenv from 'dotenv'

dotenv.config()

const getBaseDomain = () => {
  if (process.env.BASE_URL) {
    return process.env.BASE_URL.includes('testing')
      ? 'testing.clusterix.io'
      : 'clusterix.io'
  }
  if (typeof window !== 'undefined') {
    return window.location.hostname.includes('testing')
      ? 'testing.clusterix.io'
      : 'clusterix.io'
  }
  return 'clusterix.io'
}

export const BASE_DOMAIN = getBaseDomain()

export const APP_URLS = {
  login: '/login',
  register: '/register',
  resetPassword: '/reset-password',
  sso: '/sso',
  dataProtection: '/privacy-policy',
  termsAndConditions: '/terms-and-conditions',
  myProfile: {
    dashboard: '/profile/dashboard',
    personalInfo: '/profile/personal_info',
    payrollBonusesAndExtra: '/profile/payroll',
    absenceDashboard: '/profile/absence/dashboard',
    absenceDays: '/profile/absence/list',
    freelancerPayment: '/profile/freelancer-payments',
    reimbursements: '/profile/reimbursements',
    securityAndPrivacy: '/profile/security-and-privacy',
    userRequests: '/profile/user-request',
  },
  landing: {
    freddyAppointly: '/frederik-erber-termin-mit-frederik-erber',
    hrApp: `https://hr-${BASE_DOMAIN}/`,
    emailApp: `https://email-${BASE_DOMAIN}/`,
    calendarApp: `https://calendar-${BASE_DOMAIN}/`,
    liveChatApp: `https://livechat-${BASE_DOMAIN}/`,
    timeTrackingApp: `https://time-tracking-${BASE_DOMAIN}/`,
    documentsApp: `https://documents-${BASE_DOMAIN}/`,
  },
  settings: {
    base: '/settings',
    usersAndPermissions: {
      base: '/settings/users-and-permissions',
      myProfile: {
        base: '/settings/users-and-permissions/my-profile',
        basicData: '/settings/users-and-permissions/my-profile/basic-data',
        securityAndPrivacy:
          '/settings/users-and-permissions/my-profile/security-and-privacy',
        vacationAndAbsenceDays: '/profile/vacation-and-absence-days',
      },
      accounts: '/settings/users-and-permissions/accounts',
      rolesAndPermissions:
        '/settings/users-and-permissions/roles-and-permissions',
    },
    appSettings: {
      base: '/settings/app-settings',
      humanResources: '/settings/app-settings/3',
      projectPlanning: '/settings/app-settings/6',
      email: '/settings/app-settings/9',
      zoomApiIntegration: '/settings/app-settings/16',
      msTeamApiIntegration: '/settings/app-settings/17',
      customers: '/settings/app-settings/21',
      accounting: '/settings/app-settings/23',
      openBanking: '/settings/app-settings/31',
      esignature: '/settings/app-settings/32',
    },
    integrations: {
      base: '/settings/integrations',
      taskManagement: '/settings/integrations/task-management',
      calender: '/settings/integrations/calender',
      files: '/settings/integrations/files',
      singleSignOn: '/settings/integrations/single-sign-on',
    },
  },
  customers: {
    base: '/sales',
  },
  accounting: {
    base: '/accounting',
    payments: {
      bankAccounts: '/accounting/payments/bank-accounts',
      paymentTransactions: '/accounting/payments/transactions',
      chartOfAccounts: '/accounting/payments/chart-of-accounts',
    },
    income: {
      customers: '/accounting/income/customers',
      invoices: '/accounting/income/invoices',
      products: '/accounting/income/products',
    },
    categories: '/accounting/categories',
    reports: '/accounting/financial-reports',
    settings: {
      base: '/accounting/settings',
      installment: '/accounting/settings/installment',
    },
  },
  byteBuilder: {
    base: '/byte-builder',
  },
  calendar: {
    base: '/calendar',
  },
  timeTracking: {
    base: '/time-tracking',
  },
  email: {
    base: '/email',
  },
  liveChat: {
    base: '/live-chat',
  },
  projectManagement: {
    base: '/project-management/',
    projects: {
      base: '/project-management/projects',
      overview: '/project-management/projects/overview',
      projectTypes: '/project-management/projects/types',
      controlling: {
        base: '/project-management/projects/controlling',
        performance: '/project-management/projects/controlling/performance',
        employees: '/project-management/projects/controlling/employees',
      },
      timeframes: '/project-management/projects/timeframes',
      activity: '/project-management/projects/activity',
      resourceAllocation:
        '/project-management/resource-allocation/personnel-allocation',
    },
  },
  taskManagement: {
    base: '/task-management',
    sprintOverview: '/task-management/sprint-overview',
    myPinboards: {
      base: '/task-management/boards',
      board: (boardId: string) => `/task-management/boards/${boardId}`, // Dynamic route for a specific board
      task: (boardId: string, taskId: string) =>
        `/task-management/boards/${boardId}/tasks/${taskId}`, // Dynamic route for a task within a board
    },
    globalTasks: '/task-management/global-boards',
    performance: '/task-management/performance',
    statistics: '/task-management/statistics',
    details: (taskId: string) => `/task-management/details/${taskId}`,
  },
  hr: {
    base: '/hr',
    dashboard: 'hr/dashboard',
    employeeManagement: 'hr/employees',
    openPosition: 'hr/candidates/open-positions',
    organizationStructure: 'hr/organizational-structure',
    locationAndTeams: 'hr/locations',
    teams: 'hr/teams',
  },
  files: {
    base: '/cluster-space',
  },
  office: {
    base: '/cluster-office',
  },
  pdf: {
    base: '/cluster-pdf',
  },
  companySearcher: {
    base: '/company-search/company',
    keyword: '/company-search/keyword',
    details: (id: string) => `/company-search/details/${id}`, // dynamic route
  },
  noCode: {
    base: '/workflows',
    overview: {
      base: '/workflows/dashboard/overview',
      newWorkflow: {
        base: '/workflows/dashboard/overview/new',
        appConnection: '/workflows/dashboard/overview/new/app-connection',
        workflowType: '/workflows/dashboard/overview/new/workflow-type',
      },
    },
    accountingBills: {
      base: '/workflows/workflows-apps/4',
      newWorkflow: {
        base: '/workflows/workflows-apps/1/new/',
        appConnection: '/workflows/workflows-apps/1/new/app-connection',
        workflowType: '/workflows/workflows-apps/1/new/workflow-type',
      },
      configure: {
        base: '/workflows/workflows-apps/1/configure/',
        summary: (workflowId: string) =>
          `/workflows/workflows-apps/1/configure/${workflowId}/summary`,
        globalData: (workflowId: string) =>
          `/workflows/workflows-apps/1/configure/${workflowId}/global-data`,
        editor: (workflowId: string) =>
          `/workflows/workflows-apps/1/configure/${workflowId}/editor`,
        integrations: (workflowId: string) =>
          `/workflows/workflows-apps/1/configure/${workflowId}/integrations`,
        permissions: (workflowId: string) =>
          `/workflows/workflows-apps/1/configure/${workflowId}/permissions`,
      },
    },
    accountingInvoices: {
      base: '/workflows/workflows-apps/5',
    },
    customers: {
      base: '/workflows/workflows-apps/1',
    },
    humanResources: {
      base: '/workflows/workflows-apps/2',
    },
    projectManagement: {
      base: '/workflows/workflows-apps/3',
    },
  },
  templateManager: {
    base: '/template-manager',
  },
  bulkMailing: {
    base: '/bulk-mailing',
    dashboard: '/bulk-mailing/dashboard',
    campaigns: {
      base: '/bulk-mailing/campaigns',
      newCampaign: '/bulk-mailing/campaigns/new',
      campaign: (campaignId: string) => `/bulk-mailing/campaigns/${campaignId}`,
    },
    audience: '/bulk-mailing/audiences',
  },
}
