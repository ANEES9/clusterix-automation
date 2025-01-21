export const APP_URLS = {
  login: '/login',
  register: '/register',
  resetPassword: '/reset-password',
  sso: '/sso',
  settings: {
    base: '/settings',
    usersAndPermissions: {
      base: '/settings/users-and-permissions',
      myProfile: {
        base: '/settings/users-and-permissions/my-profile',
        basicData: '/settings/users-and-permissions/my-profile/basic-data',
        securityAndPrivacy:
          '/settings/users-and-permissions/my-profile/security-and-privacy',
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
    base: '/hr/container-app',
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
    base: '/no-code/container-app/overview',
    editor: '/no-code/container-app/editor',
    templates: '/no-code/container-app/templates',
  },
  templateManager: {
    base: '/template-manager',
  },
}
