import { Page, Locator, expect } from '@playwright/test'
import { Allure } from 'common/allure-helper'


export class CalendarPage {
  private page: Page
  private closeCurrentApp: Locator
  private weekview: Locator
  private monthview: Locator
  private calendarApp: Locator
  private collapseButton: Locator
  private addEvent: Locator
  private eventName: Locator
  private participants: Locator
  private searchContactEmail: Locator
  private chooseParticipant: Locator
  private saveParticipant: Locator
  private createEvent:Locator
  private closeEventCreated:Locator

  static readonly URL = '/calendar'

  constructor(page: Page) {
    this.page = page
    this.closeCurrentApp = page.locator('.t2NoaA5h7fzt0q0GapK3')
    this.calendarApp = page.getByRole('button', { name: 'Calendar' })
    this.weekview = page.getByRole('button', { name: 'Week' })
    this.monthview = page.getByRole('button', { name: 'Month' })
    this.collapseButton = page.locator('._collapseButton_16zcl_522')
    this.addEvent = page.getByRole('button', { name: 'Add Event' })
    this.eventName = page.getByPlaceholder('Untitled Event')
    this.participants = page.getByText('Participant(s)')
    this.searchContactEmail = page.getByPlaceholder('Search contact, email or')
    this.chooseParticipant = page.locator('div.participants-dropdown-dropdown-internal > div > div').getByRole('checkbox', {}).nth(7)
    this.saveParticipant = page.getByRole('button', { name: 'Save' })
    this.createEvent = page.getByText('Create Event')
    this.closeEventCreated = page.getByRole('button', { name: 'Close' })
  }

  async closeCurrentApplication() {
    await Allure.step(
      'should close the current application modal when cancel is clicked',
      async () => {
        await this.closeCurrentApp.click();
      }
    )
  }

  async clickOnCloseEventCreatedModal() {
    await Allure.step(
      'should click on close button on the Event successfully create modal',
      async () => {
        await this.closeEventCreated.click()
      }
    )
  } 

  async clickOnCreateEvent() {
    await Allure.step(
      'should click on Create Event button',
      async () => {
        await this.createEvent.click()
      }
    )
  } 
  async clickOnSaveParticipant() {
    await Allure.step(
      'should Navigate through the dropdown and select one participant and click on save button',
      async () => {
        await this.saveParticipant.click()
      }
    )
  }


  async selectParticipant() {
    await Allure.step(
      'should Navigate through the dropdown and select one participant',
      async () => {
        await this.chooseParticipant.click()
      }
    )
  }

  async clickOnSearchEmailParticipant() {
    await Allure.step(
      'should Navigate to search textfield to get the contacts or emails',
      async () => {
        await this.searchContactEmail.click()
      }
    )
  }

  async clickOnParticipants() {
    await Allure.step(
      'should Navigate to Participants Tab',
      async () => {
        await this.participants.click()
      }
    )
  }

  async fillAndEnterEventName(fillEventName: string) {
    await Allure.step(
      'should Fill the Event Name',
      async () => {
        await this.eventName.fill(fillEventName)
      }
    )
  }

  //Function to generate a dynamic event name
  async generateEventName(baseName: string): Promise<string> {
    const timestamp = new Date().getTime();
    return `${baseName}_${timestamp}`;
  }
  async clickOnAddEvent() {
    await Allure.step(
      'should Navigate to Calendar application when collapse icon is clicked',
      async () => {
        await this.addEvent.click()
      }
    )
  }

  async navigateToCollapseButton() {
    await Allure.step(
      'should Navigate to Calendar application when collapse icon is clicked',
      async () => {
        await this.collapseButton.click()
      }
    )
  }

  async navigateToCalendar() {
    await Allure.step(
      'should Navigate to Calendar application when calendar icon is clicked',
      async () => {
        await this.calendarApp.click()
      }
    )
  }

  async navigateToWeekView() {
    await Allure.step(
      'should Navigate to Calendar Week view when dropdown Week value is clicked',
      async () => {
        await this.weekview.click()
      }
    )
  }
  async navigateToMonthView() {
    await Allure.step(
      'should Navigate to Calendar Month view when dropdown Month value is clicked',
      async () => {
        await this.monthview.click()
      }
    )
  }

  async goto(baseURL: string | undefined) {
    await Allure.step('Navigate to Calendar URL', async () => {
      await this.page.goto(`${baseURL}${CalendarPage.URL}`)
    })
  }
}
