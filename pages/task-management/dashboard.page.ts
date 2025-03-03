import { Page, Locator } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { getTranslations } from 'common/get-translations-helper'
import { APP_URLS } from 'constants/app-urls'

export class DashboardPage {
  private page: Page
  private translations: Record<string, any>
  private dashboard: Locator
  private sprintOverview: Locator
  private globalTask: Locator
  private pinboard: Locator
  private performance: Locator
  private statistics: Locator
  private perfomanceSub: Locator

  //inside dashboad page under my tasks
  private myTasks: Locator
  private myTasktext: Locator
  private myTaskimage: Locator
  private urgency: Locator
  private deadline: Locator

  //inside dashboard page under my completed tasks
  private myCompletedTasks: Locator
  private myCompletedTasktext: Locator
  private myCompletedTaskimage: Locator
  private week: Locator
  private month: Locator
  private yesterday: Locator
  private today: Locator

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('task-management', locale)
    this.dashboard = page.getByRole('button', {
      name: this.translations.dashboard.title,
    })
    this.sprintOverview = page.getByRole('button', {
      name: this.translations.sprint_overview,
    })
    this.globalTask = page.getByRole('button', {
      name: this.translations.globalPinboards,
    })
    this.pinboard = page.getByRole('button', {
      name: this.translations.myPinboards,
    })
    this.performance = page.getByRole('button', {
      name: this.translations.performance,
    })
    this.statistics = page.getByRole('button', {
      name: this.translations.statistics,
    })
    this.perfomanceSub = page
      .getByRole('button', { name: this.translations.performance })
      .nth(1)

    //dashboard page under my tasks
    this.myTasks = page.getByText(this.translations.dashboard.my_tasks)
    this.myTasktext = page.getByText(
      this.translations.dashboard
        .keep_track_of_your_tasks_by_urgency_or_deadline
    )
    this.myTaskimage = page.getByRole('img', {
      name: this.translations.dashboard.my_tasks,
    })
    this.urgency = page.getByText(this.translations.dashboard.urgency, {
      exact: true,
    })
    this.deadline = page.getByText(this.translations.dashboard.deadline, {
      exact: true,
    })

    //dashboard page under my completed tasks
    this.myCompletedTasks = page.getByText(
      this.translations.dashboard.completed_tasks
    )
    this.myCompletedTasktext = page.getByText(
      this.translations.dashboard.completed_tasks_subtitle
    )
    this.myCompletedTaskimage = page.getByRole('img', {
      name: this.translations.dashboard.completed_tasks,
    })
    this.week = page.getByText(this.translations.this_week)
    this.today = page.getByText(this.translations.Today, { exact: true })
    this.yesterday = page.getByText(this.translations.yesterday)
    this.month = page.getByText(this.translations.this_month)
  }

  async goTo(baseURL: string | undefined) {
    await Allure.step('Navigate to Task Management URL', async () => {
      await this.page.goto(`${baseURL}${APP_URLS.taskManagement.base}`)
    })
  }

  async navigateToDashboard() {
    await Allure.step(
      'should navigate to dashboard when dashbaord is clicked',
      async () => {
        await this.dashboard.click()
      }
    )
  }

  async navigateToSprintoverview() {
    await Allure.step(
      'should navigate to sprint overview when sprint overview is clicked',
      async () => {
        await this.sprintOverview.click()
      }
    )
  }

  async navigateToPinboard() {
    await Allure.step(
      'should navigate to pinboard when pinboard is clicked',
      async () => {
        await this.pinboard.click()
      }
    )
  }

  async navigateToGlobalTask() {
    await Allure.step(
      'should navigate to global task when global taskis clicked',
      async () => {
        await this.globalTask.click()
      }
    )
  }

  async navigateToPerformance() {
    await Allure.step(
      'should navigate to perfromance when performance is clicked',
      async () => {
        await this.performance.click()
      }
    )
  }

  async navigateToPerformancesub() {
    await Allure.step(
      'should navigate to perfromance when performance is clicked',
      async () => {
        await this.perfomanceSub.click()
      }
    )
  }

  async navigateToStatistics() {
    await Allure.step(
      'should navigate to statistics when statistics is clicked',
      async () => {
        await this.statistics.click()
      }
    )
  }

  //inside dashboard page under my tasks
  async clickOnMyTask() {
    await Allure.step(
      'should click on all buttons under my tasks',
      async () => {
        await this.myTasks.click()
        await this.myTasktext.click()
        await this.myTaskimage.click()
        await this.urgency.click()
        await this.deadline.click()
      }
    )
  }

  async clickOnMyCompletedtask() {
    await Allure.step(
      'should click on all buttons under my completed tasks',
      async () => {
        await this.myCompletedTasks.click()
        await this.myCompletedTasktext.click()
        await this.myCompletedTaskimage.click()
        await this.week.first().click()
        await this.today.click()
        await this.yesterday.click()
        await this.month.click()
      }
    )
  }
}
