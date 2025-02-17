export const ALLURE_FEATURES = {
  // CRUD Operations
  CREATE: 'Create Operation',
  EDIT: 'Edit Operation',
  DELETE: 'Delete Operation',
  VIEW: 'View Operation',

  // Navigation Elements
  NAVIGATION: 'Navigation',
  SIDEBAR: 'Sidebar Navigation',
  HEADER: 'Header Navigation',
  FOOTER: 'Footer Navigation',

  // Authentication & User Sessions
  LOGIN: 'User Login',
  LOGOUT: 'User Logout',

  // Filtering & Data Processing
  FILTER: 'Filter Data',
  SORT: 'Sort Data',
  EXPORT: 'Export Data',
  IMPORT: 'Import Data',

  // File Operations
  UPLOAD: 'File Upload',
  DOWNLOAD: 'File Download',

  // Data Management
  SEARCH: 'Search Functionality',
  PAGINATION: 'Pagination Handling',
  BULK_ACTION: 'Bulk Actions',

  // UI Components
  MODAL: 'Modal Windows',
  TOAST_NOTIFICATION: 'Toast Notifications',
  DROPDOWN: 'Dropdown Menus',
  TABLE: 'Table Components',
  BUTTON: 'Button Actions',
  FORM: 'Form Handling',
} as const

export type AllureFeature = keyof typeof ALLURE_FEATURES
