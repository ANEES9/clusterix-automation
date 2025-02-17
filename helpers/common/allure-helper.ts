import { allure } from 'allure-playwright'
import { Page } from '@playwright/test'
import { APP_OWNERS, DEFAULT_OWNER, DEFAULT_TEAM } from 'constants/app-owners'
import { ALLURE_TAGS } from 'constants/allure-tags'
import { ALLURE_FEATURES } from 'constants/allure-features'
import {
  SEVERITY_LEVELS,
  SeverityLevel,
} from 'constants/allure-severity-levels'

export class Allure {
  /**
   * Adds a description to the test.
   * @param description - Test description.
   */
  static addDescription(description: string) {
    allure.description(description)
  }

  /**
   * Adds a predefined tag to the test.
   * @param tagKey - The key of the tag (from ALLURE_TAGS).
   */
  static addTag(tagKey: keyof typeof ALLURE_TAGS) {
    const tag = ALLURE_TAGS[tagKey]
    if (tag) {
      allure.tag(tag)
    } else {
      throw new Error(
        `Invalid tag key: "${tagKey}". Please use a valid key from ALLURE_TAGS.`
      )
    }
  }

  /**
   * Adds multiple tags to a test.
   * @param tagKeys - Array of tag keys (from ALLURE_TAGS).
   */
  static addTags(tagKeys: Array<keyof typeof ALLURE_TAGS>) {
    for (const tagKey of tagKeys) {
      this.addTag(tagKey)
    }
  }

  /**
   * Groups tests under a feature.
   * The feature must exist in ALLURE_FEATURES.
   * @param featureKey - Feature key from ALLURE_FEATURES.
   */
  static addFeature(featureKey: keyof typeof ALLURE_FEATURES) {
    const feature = ALLURE_FEATURES[featureKey]
    if (feature) {
      allure.feature(feature)
    } else {
      throw new Error(
        `Invalid feature key: "${featureKey}". Please use a valid key from ALLURE_FEATURES.`
      )
    }
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
   * @param level - Severity level from SEVERITY_LEVELS.
   */
  static addSeverity(level: SeverityLevel) {
    if (!SEVERITY_LEVELS[level]) {
      throw new Error(
        `Invalid severity level: "${level}". Please use a valid level from SEVERITY_LEVELS.`
      )
    }
    allure.severity(SEVERITY_LEVELS[level])
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
    allure.label('team', DEFAULT_TEAM)
    allure.label('owner', DEFAULT_OWNER)
  }

  /**
   * Adds app-specific owner labels.
   * @param appName - Application name.
   */
  static addAppOwner(appName: keyof typeof APP_OWNERS) {
    const appOwner = APP_OWNERS[appName]
    const ownerName = appOwner?.name || 'Unknown Owner'
    allure.label('owner', ownerName)
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
      const screenshot = await page.screenshot()
      allure.attachment(`${stepName} - Screenshot`, screenshot, 'image/png')
    })
  }

  /**
   * Logs a message to the Allure report with HTML formatting.
   * @param message - Log message with HTML.
   * @param level - Log level ('info', 'success', 'error').
   */
  static addHtmlLog(message: string, level: 'info' | 'success' | 'error') {
    let color: string
    switch (level) {
      case 'info':
        color = 'blue'
        break
      case 'success':
        color = 'green'
        break
      case 'error':
        color = 'red'
        break
      default:
        color = 'black'
    }

    const htmlMessage = `<p style="color: ${color};">${message}</p>`
    allure.attachment('Log', htmlMessage, 'text/html')
  }

  /**
   * Adds dynamic parameters to the test.
   * @param name - Parameter name.
   * @param value - Parameter value.
   */
  static addParameter(name: string, value: string) {
    allure.parameter(name, value)
  }

  /**
   * Adds a link to the report.
   * @param name - Link name.
   * @param url - Link URL.
   */
  static addLink(name: string, url: string) {
    allure.link(name, url)
  }

  /**
   * Adds a TMS (Test Management System) link to the report.
   * @param tmsId - TMS ID.
   * @param url - TMS URL.
   */
  static addTmsLink(tmsId: string, url: string) {
    allure.link('TMS', url, tmsId)
  }

  /**
   * Adds a bug tracker link to the report.
   * @param bugId - Bug ID.
   * @param url - Bug Tracker URL.
   */
  static addBugLink(bugId: string, url: string) {
    allure.link('Bug', url, bugId)
  }

  /**
   * Categorizes test results.
   * @param category - Category name.
   */
  static addCategory(category: string) {
    allure.label('category', category)
  }

  /**
   * Marks a test as a retry.
   */
  static markTestAsRetry() {
    allure.label('retry', 'true')
  }

  /**
   * Sets a parent test for grouping.
   * @param parentTestName - Parent test name.
   */
  static setParentTest(parentTestName: string) {
    allure.label('parentTest', parentTestName)
  }
}
