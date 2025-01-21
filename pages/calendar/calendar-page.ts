import { Page, Locator } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { APP_URLS } from 'config/constants/app-urls'

export class CalendarPage {
  private page: Page
  private closeCurrentApp: Locator
  private weekView: Locator
  private monthView: Locator
  private calendarApp: Locator
  private collapseButton: Locator
  private addEvent: Locator
  private eventName: Locator
  private participants: Locator
  private searchContactEmail: Locator
  private chooseParticipant: Locator
  private saveParticipant: Locator
  private createEvent: Locator
  private closeEventCreated: Locator
  private foldOut: Locator
  private viewEvent: string | undefined
  private deleteEvent: Locator
  private deleteButton: Locator
  private chooseFirstParticipant: Locator
  private saveEvent: Locator
  private filterLocator: Locator
  private filterByCreator: Locator
  private startTypingTextInCreator: Locator
  private filterByCreatorMe: Locator
  private filterByGuest: Locator
  private startTypingTextInGuest: Locator
  private filterByGuestMe: Locator
  private yearView:Locator
  private listView:Locator
  private dayView:Locator
  private twoDaysView:Locator

  static readonly URL = '/calendar'

  constructor(page: Page, viewEvent?: string) {
    if (viewEvent) {
      this.viewEvent = viewEvent // Only set if provided
    }
    this.page = page
    this.closeCurrentApp = page.locator('.t2NoaA5h7fzt0q0GapK3')
    this.calendarApp = page.getByRole('button', { name: 'Calendar' })
    this.dayView = page.getByRole('button', { name: 'Day', exact: true })
    this.twoDaysView = page.getByRole('button', { name: 'Days'})
    this.weekView = page.getByRole('button', { name: 'Week' })
    this.monthView = page.getByRole('button', { name: 'Month' })
    this.yearView = page.getByRole('button', { name: 'Year' })
    this.listView = page.getByRole('button', { name: 'List' })
    this.collapseButton = page.locator('._collapseButton_16zcl_522')
    this.addEvent = page.getByRole('button', { name: 'Add Event' })
    this.eventName = page.getByPlaceholder('Untitled Event')
    this.participants = page.getByText('Participant(s)')
    this.searchContactEmail = page.getByPlaceholder('Search contact, email or')
    this.chooseParticipant = page
      .locator('div.participants-dropdown-dropdown-internal > div > div')
      .getByRole('checkbox', {})
      .nth(7)
    this.saveParticipant = page.getByRole('button', { name: 'Save' })
    this.createEvent = page.getByText('Create Event')
    this.closeEventCreated = page.getByRole('button', { name: 'Close' })
    this.foldOut = page.getByText('').nth(1)
    this.deleteEvent = page.getByText('Delete')
    this.deleteButton = page.getByRole('button', { name: 'Delete' })
    this.chooseFirstParticipant = page
      .locator('div.participants-dropdown-dropdown-internal > div > div')
      .getByRole('checkbox', {})
      .first()
    this.saveEvent = page.getByText('Save changes')
    this.filterLocator = page.locator('.FiltersGroups_filtersLabel__PHj7j')
    this.filterByCreator = page.getByText('Filter by creator')
    this.startTypingTextInCreator = page.getByRole('textbox', {
      name: 'Please start typing',
    })
    this.filterByCreatorMe = page.getByText('Me', { exact: true }).first()
    this.filterByGuest = page.getByText('Filter by guest')
    this.startTypingTextInGuest = page
      .getByPlaceholder('Please start typing')
      .nth(2)
    this.filterByGuestMe = page.getByText('Me', { exact: true }).nth(1)
  }

  async closeCurrentApplication() {
    await Allure.step(
      'should close the current application modal when cancel is clicked',
      async () => {
        await this.closeCurrentApp.click()
      }
    )
  }

  async clickOnFilterByGuestMe() {
    await Allure.step('should select me in filter by guest', async () => {
      await this.filterByGuestMe.click()
    })
  }

  async clickOnStartTypingInFilterGuest() {
    await Allure.step(
      'should click on start typing here textfield of filter by guest',
      async () => {
        await this.startTypingTextInGuest.click()
      }
    )
  }

  async clickOnFilterByGuest() {
    await Allure.step(
      'should click on filters and navigate to filter by guest ',
      async () => {
        await this.filterByGuest.click()
      }
    )
  }

  async clickOnFilterByCreatorMe() {
    await Allure.step('should select me in filter by creator', async () => {
      await this.filterByCreatorMe.click()
    })
  }

  async clickOnStartTypingInFilterCreator() {
    await Allure.step(
      'should click on start typing here textfield of filter by creator',
      async () => {
        await this.startTypingTextInCreator.click()
      }
    )
  }
  async clickOnFilterByCreator() {
    await Allure.step(
      'should click on filters and navigate to filter by creator ',
      async () => {
        await this.filterByCreator.click()
      }
    )
  }

  async clickOnFilterLocator() {
    await Allure.step('should click on filters ', async () => {
      await this.filterLocator.click()
    })
  }

  async clickOnSaveEvent() {
    await Allure.step('should click on save event button ', async () => {
      await this.saveEvent.click()
    })
  }
  //To click on first participant
  async selectFirstParticipant() {
    await Allure.step(
      'should click on first participant in the dropdown ',
      async () => {
        await this.chooseFirstParticipant.click()
      }
    )
  }

  //To click on delete button inside the delete modal pop up
  async clickOnDeleteButton() {
    await Allure.step('should click on delete button ', async () => {
      await this.deleteButton.click()
    })
  }
  //To click on delete button inside the event modal
  async clickOnDeleteEvent() {
    await Allure.step('should click on delete button ', async () => {
      await this.deleteEvent.click()
    })
  }

  async clickOnViewEvent() {
    // To Use this.eventName dynamically
    const eventLocator = this.page
      .locator('.calendar-event-details-chip-title-name', {
        hasText: this.viewEvent,
      })
      .nth(0)
    await eventLocator.click()
  }

  async clickOnFoldOut() {
    await Allure.step(
      'should click on foldout button to check if the event exists on weekends',
      async () => {
        await this.foldOut.click()
      }
    )
  }
  async clickOnCloseEventCreatedModal() {
    await Allure.step(
      'should click on close button on the event successfully create modal',
      async () => {
        await this.closeEventCreated.click()
      }
    )
  }

  async clickOnCreateEvent() {
    await Allure.step('should click on create event button', async () => {
      await this.createEvent.click()
    })
  }
  async clickOnSaveParticipant() {
    await Allure.step(
      'should navigate through the dropdown and select one participant and click on save button',
      async () => {
        await this.saveParticipant.click()
      }
    )
  }

  async selectParticipant() {
    await Allure.step(
      'should navigate through the dropdown and select one participant',
      async () => {
        await this.chooseParticipant.click()
      }
    )
  }

  async clickOnSearchEmailParticipant() {
    await Allure.step(
      'should navigate to search textfield to get the contacts or emails',
      async () => {
        await this.searchContactEmail.click()
      }
    )
  }

  async clickOnParticipants() {
    await Allure.step(
      'should navigate to participants tabto view the participants',
      async () => {
        await this.participants.click()
      }
    )
  }

  async fillAndEnterEventName(fillEventName: string) {
    await Allure.step(
      'should fill the event name in the event textfield',
      async () => {
        await this.eventName.fill(fillEventName)
      }
    )
  }

  //Function to generate a dynamic event name
  async generateEventName(baseName: string): Promise<string> {
    const timestamp = new Date().getTime()
    return `${baseName}_${timestamp}`
  }
  async clickOnAddEvent() {
    await Allure.step(
      'should navigate to calendar application when collapse icon is clicked',
      async () => {
        await this.addEvent.click()
      }
    )
  }

  async navigateToCollapseButton() {
    await Allure.step(
      'should navigate to calendar application when collapse icon is clicked',
      async () => {
        await this.collapseButton.click()
      }
    )
  }

  async navigateToCalendar() {
    await Allure.step(
      'should navigate to calendar application when calendar icon is clicked',
      async () => {
        await this.calendarApp.click()
      }
    )
  }

  async navigateToWeekView() {
    await Allure.step(
      'should navigate to calendar week view when dropdown week value is clicked',
      async () => {
        await this.weekView.click()
      }
    )
  }
  async navigateToMonthView() {
    await Allure.step(
      'should navigate to calendar month view when dropdown month value is clicked',
      async () => {
        await this.monthView.click()
      }
    )
  }
  async navigateToYearView() {
    await Allure.step(
      'should navigate to calendar year view when dropdown year value is clicked',
      async () => {
        await this.yearView.click()
      }
    )
  }

  async navigateToListView() {
    await Allure.step(
      'should navigate to calendar list view when dropdown list value is clicked',
      async () => {
        await this.listView.click()
      }
    )
  }

  async navigateToDayView() {
    await Allure.step(
      'should navigate to calendar day view when dropdown day value is clicked',
      async () => {
        await this.dayView.click()
      }
    )
  }

  async navigateToTwoDaysView() {
    await Allure.step(
      'should navigate to calendar 2 days view when dropdown 2 days value is clicked',
      async () => {
        await this.twoDaysView.click()
      }
    )
  }
  async goto(baseURL: string | undefined) {
    await Allure.step('Navigate to Calendar URL', async () => {
      //await this.page.goto(`${baseURL}${CalendarPage.URL}`)
      await this.page.goto(`${baseURL}${APP_URLS.calendar.base}`)
    })
  }
}
