import { APP_URLS } from 'constants/app-urls'

/**
 * Determines the base URL for a given test folder.
 * @param folderName The name of the test folder (e.g., "taskManagement", "calendar").
 * @returns The corresponding application base URL.
 */
export function getAppBaseURL(folderName: string): string {
  const appBaseURLs: Record<string, string> = {
    auth: APP_URLS.login,
    containerApp: APP_URLS.hr.base,
    notifications: APP_URLS.liveChat.base,
    calendar: APP_URLS.calendar.base,
    timeTracking: APP_URLS.timeTracking.base,
    email: APP_URLS.email.base,
    projectManagement: APP_URLS.projectManagement.base,
    taskManagement: APP_URLS.taskManagement.base,
    hr: APP_URLS.hr.base,
    files: APP_URLS.files.base,
    office: APP_URLS.office.base,
    pdf: APP_URLS.pdf.base,
    companySearcher: APP_URLS.companySearcher.base,
    noCode: APP_URLS.noCode.base,
    templateManager: APP_URLS.templateManager.base,
    bulkMailing: APP_URLS.bulkMailing.base,
  }

  return appBaseURLs[folderName] || APP_URLS.login // Default to login if folder is not mapped
}
