import { Page, Locator, expect } from '@playwright/test'
import { Allure } from '../../helpers/common/allure-helper'
import { APP_URLS } from '../../shared/constants/app-urls'
import { calendarTestData } from 'utils/test-data/calendar/calendar-data'
import { getTranslations } from '../../helpers/common/get-translations-helper'

export class CalendarPage {
  private page: Page
  private translations: Record<string, any>
  private closeCurrentApp: Locator
  private weekView: Locator
  private monthView: Locator
  private calendarApp: Locator
  private collapseButton: Locator
  private searchInput: Locator
  private addEvent: Locator
  private eventName: Locator
  private editor: Locator
  private discardEvent: Locator
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
  private cancelDeleteEvent: Locator
  private closeAddEvent: Locator
  private chooseFirstParticipant: Locator
  private saveEvent: Locator
  private filterLocator: Locator
  private filterByCreator: Locator
  private startTypingTextInCreator: Locator
  private filterByCreatorMe: Locator
  private filterByUsernameCreator: Locator
  private filterByUsernameGuest: Locator
  private filterByGuest: Locator
  private startTypingTextInGuest: Locator
  private filterByGuestMe: Locator
  private yearView: Locator
  private listView: Locator
  private dayView: Locator
  private twoDaysView: Locator
  private timeSection: Locator
  private meetingSection: Locator
  private meetingType: Locator
  private offlineMeeting: Locator
  private offlineMeetingLocation: Locator
  private onlineMeetingZoom: Locator
  private onlineMeetingTeams: Locator
  private onlineMeetingOthers: Locator
  private meetingLink: Locator
  private clearAllFilters: Locator
  private previousMonth: Locator
  private nextMonth: Locator
  private timeZone: Locator
  private changeTimeZone: Locator
  private timeZoneOption: Locator
  private selectedParticipantName: string | undefined
  // static readonly URL = '/calendar'
  // static readonly meetingLinkOther = 'https://meet.google.com/abc-123-def'
  // static readonly offlineMeetingLocationDefined = 'FUTRUE GmbH, Am Haag 14, 82166 Gräfelfing'
  constructor(page: Page, locale: string, viewEvent?: string) {
    if (viewEvent) {
      this.viewEvent = viewEvent
    }
    this.page = page
    this.translations = getTranslations('calendar', locale)
    this.closeCurrentApp = page.locator('.t2NoaA5h7fzt0q0GapK3')
    this.timeZone = page.locator(
      "[class*='CustomLabeledSingleSelectTimeZone'] >> text=Asia/Calcutta"
    )
    this.changeTimeZone = page
      .locator('#ca-portal-root')
      .getByRole('textbox', { name: this.translations['Search'] })
    this.timeZoneOption = page.locator('text=Europe/Berlin')
    this.calendarApp = page.getByRole('button', { name: 'Calendar' }).first()
    this.previousMonth = page.locator('a').filter({ hasText: '' })
    this.nextMonth = page.locator('a').filter({ hasText: '' })
    this.dayView = page.getByRole('button', {
      name: this.translations['Day'],
      exact: true,
    })
    this.twoDaysView = page.getByRole('button', {
      name: this.translations['2 Days'],
    })
    this.weekView = page.getByRole('button', {
      name: this.translations['Week'],
    })
    this.monthView = page.getByRole('button', {
      name: this.translations['Month'],
    })
    this.yearView = page.getByRole('button', {
      name: this.translations['Year'],
    })
    this.listView = page.getByRole('button', {
      name: this.translations['List'],
    })
    this.collapseButton = page.locator('._collapseButton_16zcl_522')
    this.searchInput = page.locator(
      `input[class*="_field__input_1mnea_"][placeholder="${this.translations['Search']}"]`
    )
    this.addEvent = page.getByRole('button', {
      name: this.translations['Add Event'],
    })
    this.discardEvent = page.getByText(this.translations['Discard Event'])
    this.editor = page.getByRole('button', { name: 'Editor' })
    this.eventName = page.getByPlaceholder(this.translations['Untitled Event'])
    this.participants = page.getByText(this.translations['Participant(s)'])
    this.searchContactEmail = page.getByPlaceholder(
      this.translations['Search contact, email or employee']
    )
    this.chooseParticipant = page
      .locator('div.participants-dropdown-dropdown-internal > div > div')
      .getByRole('checkbox', {})
      .nth(7)
    this.saveParticipant = page.getByRole('button', {
      name: this.translations['Save'],
    })
    this.createEvent = page.getByText(this.translations['Create Event'])
    this.closeEventCreated = page.getByRole('button', {
      name: this.translations['Close'],
    })
    this.foldOut = page.getByText('').nth(1)
    this.deleteEvent = page.getByText(this.translations['Delete']).first()
    this.deleteButton = page.getByRole('button', {
      name: this.translations['Delete'],
    })
    this.chooseFirstParticipant = page
      .locator('div.participants-dropdown-dropdown-internal > div > div')
      .getByRole('checkbox', {})
      .first()
    this.saveEvent = page.getByText(this.translations['Save changes'])
    this.filterLocator = page.locator('.FiltersGroups_filtersLabel__PHj7j')
    this.filterByCreator = page.getByText(
      this.translations['Filter by creator']
    )
    this.startTypingTextInCreator = page.getByRole('textbox', {
      name: this.translations['Please start typing'],
    })
    this.filterByCreatorMe = page.getByText('Me', { exact: true }).first()

    this.filterByGuest = page.getByText(this.translations['Filter by guest'])
    this.startTypingTextInGuest = page
      .getByPlaceholder(this.translations['Please start typing'])
      .nth(2)
    this.filterByGuestMe = page.getByText('Me', { exact: true }).nth(1)
    this.filterByUsernameCreator = page.getByText('Clarissa Rosario').nth(2)
    this.filterByUsernameGuest = page
      .locator(
        'div:nth-child(2) > .FiltersGroups_personItemClass__7ZjYC > .ca-flex'
      )
      .first()
    this.timeSection = page
      .locator('.SectionWrapper_eventViewSection__aUiS\\+')
      .first()
    this.meetingSection = page
      .locator('.SectionWrapper_eventViewSection__aUiS\\+')
      .filter({
        hasText: this.translations['Meeting link'],
      })
      .first()
    this.clearAllFilters = page.locator(
      '.FiltersGroups_clearFilterButton__k6qN9'
    )
    this.meetingType = page.getByPlaceholder(
      this.translations['Select Meeting Type']
    )
    this.offlineMeeting = page.getByText(this.translations['Offline Meeting'])
    this.onlineMeetingZoom = page.getByText(
      this.translations['Online Meeting - Zoom']
    )
    this.onlineMeetingTeams = page.getByText(
      this.translations['Online Meeting - Teams']
    )
    this.onlineMeetingOthers = page.getByText(
      this.translations['Online Meeting - Other']
    )
    this.meetingLink = page.getByPlaceholder(
      this.translations['Please add an event link']
    )
    this.offlineMeetingLocation = page.getByPlaceholder(
      this.translations['Location of offline meeting']
    )
    this.cancelDeleteEvent = page.getByRole('button', {
      name: this.translations['Cancel'],
    })
    this.closeAddEvent = page
      .locator('#rounded-modal-event-form')
      .getByRole('button')
      .first()
  }
  async navigateToMeetingSection() {
    await Allure.step('should navigate to the meeting section', async () => {
      await expect(this.meetingSection).toBeVisible()
      await expect(this.meetingSection).toBeEnabled()
      await this.meetingSection.click()
    })
  }

  async selectMeeting() {
    await Allure.step('should click on select meeting', async () => {
      await expect(this.meetingType).toBeVisible()
      await expect(this.meetingType).toBeEnabled()
      await this.meetingType.click()
    })
  }
  async clickOnTimeZone() {
    await Allure.step('should click on timezone field', async () => {
      await expect(this.timeZone).toBeVisible()
      await expect(this.timeZone).toBeEnabled()
      await this.timeZone.click()
    })
  }
  async selectTimeZone() {
    await Allure.step(
      'should click on change the timezone field to other',
      async () => {
        await expect(this.changeTimeZone).toBeVisible()
        await expect(this.changeTimeZone).toBeEnabled()
        await this.changeTimeZone.fill(`${calendarTestData.timeZone}`)
        await this.timeZoneOption.waitFor({ state: 'visible', timeout: 10000 })
        await expect(this.timeZoneOption).toBeVisible()
        await this.timeZoneOption.click()
      }
    )
  }
  async selectToCloseAddEventModal() {
    await Allure.step(
      'should click on cross icon so that the add event modal closes',
      async () => {
        await expect(this.closeAddEvent).toBeVisible()
        await expect(this.closeAddEvent).toBeEnabled()
        await this.closeAddEvent.click()
      }
    )
  }
  async selectOfflineMeeting() {
    await Allure.step(
      'should be able to create the offline meeting when in the dropdown offline meeting value is clicked',
      async () => {
        await expect(this.offlineMeeting).toBeVisible()
        await expect(this.offlineMeeting).toBeEnabled()
        await this.offlineMeeting.click()
      }
    )
  }
  async addOfflineLocation() {
    await Allure.step(
      'should click on location of offline meeting',
      async () => {
        await expect(this.offlineMeetingLocation).toBeVisible()
        await expect(this.offlineMeetingLocation).toBeEnabled()
        await this.offlineMeetingLocation.click()
        await this.offlineMeetingLocation.fill(
          calendarTestData.offlineMeetingLocationDefined
        )
      }
    )
  }
  async selectZoomMeeting() {
    await Allure.step(
      'should be able to create the online zoom meeting when in the dropdown online zoom meeting value is clicked',
      async () => {
        await expect(this.onlineMeetingZoom).toBeVisible()
        await expect(this.onlineMeetingZoom).toBeEnabled()
        await this.onlineMeetingZoom.click()
      }
    )
  }
  async selectTeamsMeeting() {
    await Allure.step(
      'should be able to create the online teams meeting when in the dropdown online teams meeting value is clicked',
      async () => {
        await expect(this.onlineMeetingTeams).toBeVisible()
        await expect(this.onlineMeetingTeams).toBeEnabled()
        await this.onlineMeetingTeams.click()
      }
    )
  }
  async selectTOnlineMeetingOther() {
    await Allure.step(
      'should be able to create the online meeting other when in the dropdown online meeting others value is clicked',
      async () => {
        await expect(this.onlineMeetingOthers).toBeVisible()
        await expect(this.onlineMeetingOthers).toBeEnabled()
        await this.onlineMeetingOthers.click()
      }
    )
  }
  async selectPreviousMonth() {
    await Allure.step(
      'should be able to view the events of the previous month',
      async () => {
        await expect(this.previousMonth).toBeVisible()
        await expect(this.previousMonth).toBeEnabled()
        await this.previousMonth.click()
      }
    )
  }
  async selectNextMonth() {
    await Allure.step(
      'should be able to view the events of the upcoming month',
      async () => {
        await expect(this.nextMonth).toBeVisible()
        await expect(this.nextMonth).toBeEnabled()
        await this.nextMonth.click()
      }
    )
  }
  async addEventLink() {
    await Allure.step('should click on please add event link', async () => {
      await expect(this.meetingLink).toBeVisible()
      await expect(this.meetingLink).toBeEnabled()
      await this.meetingLink.click()
      //await this.meetingLink.fill(CalendarPage.meetingLinkOther)
      await this.meetingLink.fill(calendarTestData.meetingLinkOther)
    })
  }

  async verifySelectedParticipant() {
    await Allure.step(
      'should verify that the selected participant is added',
      async () => {
        if (!this.selectedParticipantName) {
          throw new Error('No participant was selected for verification.')
        }
        const savedParticipant = this.page.locator(
          `text="${this.selectedParticipantName}"`
        )
        await expect(savedParticipant).toBeVisible()
      }
    )
  }

  async goto(baseURL: string | undefined) {
    await Allure.step('Navigate to Calendar URL', async () => {
      //await this.page.goto(`${baseURL}${calendarTestData.url}`)
      await this.page.goto(`${baseURL}${APP_URLS.calendar.base}`)
    })
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
      await expect(this.filterByGuestMe).toBeVisible()
      await expect(this.filterByGuestMe).toBeEnabled()
      await this.filterByGuestMe.click()
    })
  }

  async clickOnStartTypingInFilterGuest() {
    await Allure.step(
      'should click on start typing here textfield of filter by guest',
      async () => {
        await expect(this.startTypingTextInGuest).toBeVisible()
        await expect(this.startTypingTextInGuest).toBeEnabled()
        await this.startTypingTextInGuest.click()
      }
    )
  }

  async clickOnFilterByGuest() {
    await Allure.step(
      'should click on filters and navigate to filter by guest ',
      async () => {
        await expect(this.filterByGuest).toBeVisible()
        await expect(this.filterByGuest).toBeEnabled()
        await this.filterByGuest.click()
        await expect(this.clearAllFilters).toBeVisible()
      }
    )
  }
  async clickOnFilterByCreatorMe() {
    await Allure.step('should select me in filter by creator', async () => {
      await expect(this.filterByCreatorMe).toBeVisible()
      await expect(this.filterByCreatorMe).toBeEnabled()
      await this.filterByCreatorMe.click()
    })
  }
  async selectUsernameForFilterCreator() {
    await Allure.step(
      'should add a user name to start filtering the events',
      async () => {
        await expect(this.startTypingTextInCreator).toBeVisible({
          timeout: 80000,
        })
        await expect(this.startTypingTextInCreator).toBeEnabled()
        await this.startTypingTextInCreator.fill(calendarTestData.userName)
        await this.filterByUsernameCreator.waitFor({ state: 'visible' })
        await this.filterByUsernameCreator.scrollIntoViewIfNeeded()
        await this.filterByUsernameCreator.click()
      }
    )
  }
  async selectUsernameForFilterGuest() {
    await Allure.step(
      'should add a user name for guest filter to start filtering the events',
      async () => {
        await expect(this.startTypingTextInGuest).toBeVisible({
          timeout: 80000,
        })
        await expect(this.startTypingTextInGuest).toBeEnabled()
        await this.startTypingTextInGuest.fill(calendarTestData.userName)
        await this.filterByUsernameGuest.waitFor({ state: 'visible' })
        await this.filterByUsernameGuest.scrollIntoViewIfNeeded()
        await this.filterByUsernameGuest.click()
      }
    )
  }
  async clickOnStartTypingInFilterCreator() {
    await Allure.step(
      'should click on start typing here textfield of filter by creator',
      async () => {
        await expect(this.startTypingTextInCreator).toBeVisible({
          timeout: 80000,
        })

        await expect(this.startTypingTextInCreator).toBeEnabled()
        await this.startTypingTextInCreator.click()
      }
    )
  }
  async clickOnFilterByCreator() {
    await Allure.step(
      'should click on filters and navigate to filter by creator ',
      async () => {
        await expect(this.filterByCreator).toBeVisible()
        await expect(this.filterByCreator).toBeEnabled()
        await this.filterByCreator.click()
        await expect(this.clearAllFilters).toBeVisible()
      }
    )
  }

  async clickOnFilterLocator() {
    await Allure.step('should click on filters ', async () => {
      await expect(this.filterLocator).toBeVisible()
      await expect(this.filterLocator).toBeEnabled()
      await this.filterLocator.click()
      await expect(this.clearAllFilters).toBeVisible()
    })
  }

  async clickOnSaveEvent() {
    await Allure.step('should click on save event button ', async () => {
      await this.saveEvent.click()
    })
  }

  async selectFirstParticipant() {
    await Allure.step(
      'should click on first participant in the dropdown ',
      async () => {
        await this.chooseFirstParticipant.click()
      }
    )
  }

  async clickOnDeleteButton(eventName: string) {
    await Allure.step('should click on delete button ', async () => {
      await expect(this.deleteButton).toBeVisible({ timeout: 5000 })
      await expect(this.deleteButton).toBeEnabled()
      const confirmationModal = this.page.locator(
        '.delete-modal_deleteModalContent__Nsg5Z'
      )
      if (await confirmationModal.isVisible()) {
        await expect(confirmationModal).toBeVisible()
        await expect(this.deleteButton).toBeVisible()
        await this.deleteButton.click()
      }
      const eventLocator = this.page
        .locator('.calendar-event-details-chip-title-name')
        .filter({
          hasText: eventName,
        })
      await expect(eventLocator).toHaveCount(0, { timeout: 5000 })
    })
  }

  async clickOnCancelButton(eventName: string) {
    await Allure.step('should click on cancel button ', async () => {
      await expect(this.cancelDeleteEvent).toBeVisible({ timeout: 5000 })
      await expect(this.cancelDeleteEvent).toBeEnabled()
      const confirmationModal = this.page.locator(
        '.delete-modal_deleteModalContent__Nsg5Z'
      )
      if (await confirmationModal.isVisible()) {
        await expect(confirmationModal).toBeVisible()
        await expect(this.cancelDeleteEvent).toBeVisible()
        await this.cancelDeleteEvent.click()
      }
      const eventLocator = this.page
        .locator('.calendar-event-details-chip-title-name')
        .filter({
          hasText: eventName,
        })
      await expect(eventLocator).toHaveCount(1, { timeout: 5000 })
    })
  }

  async clickOnDeleteEvent() {
    await Allure.step('should click on delete button ', async () => {
      await expect(this.deleteEvent).toBeVisible({ timeout: 5000 })
      await expect(this.deleteEvent).toBeEnabled()
      await this.deleteEvent.click()
    })
  }

  async clickOnViewEvent(viewEvent: string) {
    try {
      const eventLocator = this.page
        .locator('.calendar-event-details-chip-title-name', {
          hasText: viewEvent,
        })
        .nth(0)
      await eventLocator.waitFor({ state: 'visible', timeout: 5000 })
      await eventLocator.click()
    } catch (error) {
      throw new Error('Event not found')
    }
  }

  async clickOnFoldOut() {
    await Allure.step(
      'should click on foldout button to check if the event exists on weekends',
      async () => {
        await this.page.waitForLoadState('networkidle')
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

  async verifyAddEventModalVisibility() {
    await expect(this.isAddEventModalVisible()).toBeTruthy()
  }
  async verifyMeetingVisibility(meetingName: string) {
    const meetingResult = this.page.locator(`text=${meetingName}`).first()
    await expect(meetingResult).toBeVisible()
  }

  async isAddEventModalVisible(): Promise<boolean> {
    Allure.addDescription('to verify if the add event modal is visible')
    const modalSelector =
      'div[class*="EventFormModalContent_modalContentComponent__+gKuJ new_appointment_model event-form_scroll__SlOJA"]'
    const modal = await this.page.locator(modalSelector)
    return await modal.isVisible()
  }

  async verifyAddEventModal() {
    await Allure.step('Verify if participants text is visible', async () => {
      await expect(this.participants).toBeVisible()
      await expect(this.discardEvent).toBeVisible()
      await expect(this.timeSection).toBeVisible()
      await expect(this.meetingSection).toBeVisible()
    })
  }

  async clickOnParticipants() {
    await Allure.step(
      'should navigate to participants tab to view the participants',
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
  async fillAndEnterSearchEventName(fillEventName: string) {
    await Allure.step(
      'should fill the event name in the event textfield',
      async () => {
        await this.searchInput.fill(fillEventName)
      }
    )
  }

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
  async verifyAddEventButton() {
    await Allure.step('verify add event button is visible', async () => {
      await expect(this.addEvent).toBeVisible()
    })
  }
  async navigateToCollapseButton() {
    await Allure.step(
      'should navigate to calendar application when collapse icon is clicked',
      async () => {
        await this.collapseButton.click()
      }
    )
  }
  async addSearchInputText() {
    await Allure.step(
      'should add the meeting name to be searched',
      async () => {
        await this.searchInput.click()
      }
    )
  }
  async verifyNavigateToCollapseButton() {
    await Allure.step('verify collapsebutton is visible', async () => {
      await this.page.waitForSelector('._collapseButton_16zcl_522', {
        state: 'visible',
        timeout: 10000,
      })
      await expect(this.collapseButton).toBeVisible()
    })
  }
  async navigateToCalendar() {
    await Allure.step(
      'should navigate to calendar application when calendar icon is clicked',
      async () => {
        await this.calendarApp.click()
        await this.page.waitForLoadState('networkidle')
      }
    )
  }

  async navigateToWeekView() {
    await Allure.step(
      'should navigate to calendar week view when dropdown week value is clicked',
      async () => {
        await this.weekView.waitFor({ state: 'visible' })
        await expect(this.weekView).toBeEnabled()
        await this.weekView.click()
      }
    )
  }
  async navigateToMonthView() {
    await Allure.step(
      'should navigate to calendar month view when dropdown month value is clicked',
      async () => {
        await expect(this.monthView).toBeVisible()
        await expect(this.monthView).toBeEnabled()
        await this.monthView.click()
      }
    )
  }
  async navigateToYearView() {
    await Allure.step(
      'should navigate to calendar year view when dropdown year value is clicked',
      async () => {
        await expect(this.yearView).toBeVisible()
        await expect(this.yearView).toBeEnabled()
        await this.yearView.click()
      }
    )
  }

  async navigateToListView() {
    await Allure.step(
      'should navigate to calendar list view when dropdown list value is clicked',
      async () => {
        await expect(this.listView).toBeVisible()
        await expect(this.listView).toBeEnabled()
        await this.listView.click()
      }
    )
  }

  async navigateToDayView() {
    await Allure.step(
      'should navigate to calendar day view when dropdown day value is clicked',
      async () => {
        await expect(this.dayView).toBeVisible()
        await expect(this.dayView).toBeEnabled()
        await this.dayView.click()
      }
    )
  }

  async navigateToTwoDaysView() {
    await Allure.step(
      'should navigate to calendar 2 days view when dropdown 2 days value is clicked',
      async () => {
        await expect(this.twoDaysView).toBeVisible()
        await expect(this.twoDaysView).toBeEnabled()
        await this.twoDaysView.click()
      }
    )
  }
  async clickOnClearAllFilters() {
    await Allure.step(
      'should click on clear all filters and all the events from the calendar should be cleared',
      async () => {
        await expect(this.clearAllFilters).toBeVisible()
        await expect(this.clearAllFilters).toBeEnabled()
        await this.clearAllFilters.click()
      }
    )
  }
}
