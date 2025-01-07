import { allure } from 'allure-playwright'
import { Page } from '@playwright/test';

export class AllureHelper {
  static readonly DEFAULT_TEAM = 'QA Team'
  static readonly DEFAULT_OWNER = 'Büşra Öztürk'

  // Default app-specific owners
  static readonly APP_OWNERS: { [key: string]: string } = {
    Dashboard: 'Büşra',
    Auth: 'Büşra',
    Settings: 'Büşra',
    Customers: 'Neil',
  }

  /**
   * Adds a description to the test.
   * @param description - Test description.
   */
  static addDescription(description: string) {
    allure.description(description)
  }

  /**
   * Adds a tag to the test for grouping purposes.
   * @param tag - Custom tag.
   */
  static addTag(tag: string) {
    allure.tag(tag)
  }

  /**
   * Groups tests under a feature.
   * @param feature - Feature name.
   */
  static addFeature(feature: string) {
    allure.feature(feature)
  }

  /**
   * Groups tests under an epic.
   * @param epic - Epic name.
   */
  static addEpic(epic: string) {
    allure.epic(epic)
  }

  /**
   * Adds a severity level to the test.
   * @param level - Severity level (e.g., 'blocker', 'critical', 'normal', 'minor', 'trivial').
   */
  static addSeverity(
    level: 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial'
  ) {
    allure.severity(level)
  }

  /**
   * Adds a custom label to the test.
   * @param name - Label name.
   * @param value - Label value.
   */
  static addLabel(name: string, value: string) {
    allure.label(name, value)
  }

  /**
   * Adds default labels for team and owner.
   */
  static addDefaultLabels() {
    allure.label('team', this.DEFAULT_TEAM)
    allure.label('owner', this.DEFAULT_OWNER)
  }

  /**
   * Adds app-specific owner labels.
   * @param appName - Application name.
   */
  static addAppOwner(appName: string) {
    const owner = this.APP_OWNERS[appName] || 'Unknown Owner'
    allure.label('owner', owner)
  }

  /**
   * Tracks individual steps in the test.
   * @param name - Step description.
   * @param stepFunc - Async function for the step.
   */
  static async step(name: string, stepFunc: () => Promise<void>) {
    await allure.step(name, stepFunc)
  }

  /**
   * Attaches a file or log to the report.
   * @param name - Attachment name.
   * @param content - Content as Buffer or string.
   * @param type - MIME type (default: 'text/plain').
   */
  static addAttachment(
    name: string,
    content: Buffer | string,
    type: string = 'text/plain'
  ) {
    allure.attachment(name, content, type)
  }

  /**
   * Marks a test with an issue link.
   * @param issueId - Issue ID or link.
   */
  static addIssue(issueId: string) {
    allure.issue('Issue', issueId)
  }

  /**
   * Marks a test with a test case ID.
   * @param caseId - Test case ID.
   */
  static addTestCase(caseId: string) {
    allure.testCaseId(caseId)
  }

  /**
   * Adds environment details to the report.
   * @param name - Environment name.
   * @param value - Environment value.
   */
  static addEnvironment(name: string, value: string) {
    allure.label(`env:${name}`, value)
  }

  /**
   * Logs step with screenshot for debugging.
   * @param page - Playwright page instance.
   * @param stepName - Step name.
   */
  static async logStepWithScreenshot(page: Page, stepName: string) {
    await allure.step(stepName, async () => {
      const screenshot = await page.screenshot();
      allure.attachment(`${stepName} - Screenshot`, screenshot, 'image/png');
    });
  }
}
