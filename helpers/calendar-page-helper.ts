import { expect, Page } from '@playwright/test'

export class CalendarPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  // Navigate to the calendar page
  async navigateToCalendar() {
    // await this.page.goto('${process.env.CLUSTERIX_BASE_URL}/calendar');
    await this.page.goto(`${process.env.CLUSTERIX_BASE_URL}/calendar`)
  }

  // Search for an event by its name
  async viewEvent(eventName: string): Promise<boolean> {
    const eventSelector = `.event-name:has-text("${eventName}")`
    const eventExists = await this.page.isVisible(eventSelector)

    if (eventExists) {
      console.log(`Event found: ${eventName}`)
      return true
    } else {
      console.log(`Event not found: ${eventName}`)
      return false
    }
  }
}
