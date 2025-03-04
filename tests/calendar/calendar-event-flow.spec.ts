import { test, Browser, Page, TestInfo } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { CalendarPage } from 'pages/calendar/calendar-page'
import { calendarTestData } from 'utils/test-data/calendar/calendar-data'
import { setupTestContext } from 'utils/test-context'
import { BrowserContext } from 'playwright'

let calendarPage: CalendarPage
let locale: string
let browser: Browser
let context: BrowserContext
let page: Page
let eventName: string
let shouldNavigateBack = false

test.describe.parallel('calendar test suite', () => {
  test.beforeAll(async ({ browser: testBrowser, baseURL }, testInfo) => {
    browser = testBrowser
    context = await browser.newContext()
    page = await context.newPage()
    Allure.addAppOwner('Calendar')
    Allure.addSeverity('normal')
    Allure.addTag('smoke')
    const testContext = await setupTestContext(page, testInfo)
    locale = testContext.locale
    calendarPage = new CalendarPage(page, locale)
    await calendarPage.goto(baseURL)
    await page.waitForLoadState('networkidle')
  })

  test.afterEach(async ({ page, baseURL }) => {
    if (shouldNavigateBack) {
      await calendarPage.goto(baseURL)
      await page.waitForLoadState('networkidle')
    }
  })
  test('new event creation', async () => {
    Allure.addDescription('to create a new meeting')
    Allure.addTag('smoke')
    Allure.addSeverity('critical')
    eventName = await calendarPage.generateEventName(
      calendarTestData.eventTitle
    )
    await calendarPage.verifyNavigateToCollapseButton()
    await calendarPage.navigateToCollapseButton()
    await calendarPage.verifyAddEventButton()
    await calendarPage.clickOnAddEvent()
    await calendarPage.verifyAddEventModalVisibility()
    await calendarPage.fillAndEnterEventName(eventName)
    await calendarPage.verifyAddEventModal()
    await calendarPage.clickOnParticipants()
    await calendarPage.clickOnSearchEmailParticipant()
    await calendarPage.selectParticipant()
    await calendarPage.clickOnSaveParticipant()
    await calendarPage.clickOnCreateEvent()
    await calendarPage.clickOnCloseEventCreatedModal()
  })

  test('to view the event that was recently created', async () => {
    shouldNavigateBack = true
    Allure.addDescription('to create a recently created meeting')
    Allure.addTag('smoke')
    Allure.addSeverity('critical')
    await calendarPage.clickOnFoldOut()
    await calendarPage.clickOnViewEvent(eventName)
  })
  test('to update the event by adding a extra participant', async () => {
    Allure.addDescription('to update a recently created meeting')
    Allure.addTag('smoke')
    Allure.addSeverity('critical')
    await calendarPage.clickOnFoldOut()
    await calendarPage.clickOnViewEvent(eventName)
    await calendarPage.clickOnParticipants()
    await calendarPage.clickOnSearchEmailParticipant()
    await calendarPage.selectFirstParticipant()
    await calendarPage.clickOnSaveParticipant()
    await calendarPage.clickOnSaveEvent()
    await calendarPage.clickOnCloseEventCreatedModal()
  })
  test('to click on cancel button to avoid deletion of the event', async () => {
    Allure.addDescription('to avoid deleting the meeting')
    Allure.addTag('smoke')
    Allure.addSeverity('critical')
    await calendarPage.clickOnFoldOut()
    await calendarPage.clickOnViewEvent(eventName)
    await calendarPage.clickOnDeleteEvent()
    await calendarPage.clickOnCancelButton(eventName)
    await calendarPage.selectToCloseAddEventModal()
  })
  test('to delete recently created meeting', async () => {
    Allure.addDescription('to delete meeting')
    Allure.addTag('smoke')
    Allure.addSeverity('critical')
    await calendarPage.clickOnFoldOut()
    await calendarPage.clickOnViewEvent(eventName)
    await calendarPage.clickOnDeleteEvent()
    await calendarPage.clickOnDeleteButton(eventName)
  })

  test('to filter by guest and filter by creator ', async () => {
    Allure.addDescription('to check the meetings available for myself')
    Allure.addTag('smoke')
    Allure.addSeverity('critical')
    await calendarPage.clickOnFilterLocator()
    await calendarPage.clickOnFilterByCreator()
    await calendarPage.clickOnStartTypingInFilterCreator()
    await calendarPage.clickOnFilterByCreatorMe()
    await calendarPage.clickOnFilterByGuest()
    await calendarPage.clickOnStartTypingInFilterGuest()
    await calendarPage.clickOnFilterByGuestMe()
  })

  test('to clear all the filters added ', async () => {
    Allure.addDescription(
      'to check if the user is able to clear all the filters added'
    )
    Allure.addTag('smoke')
    Allure.addSeverity('critical')
    await calendarPage.clickOnFilterLocator()
    await calendarPage.clickOnFilterByCreator()
    await calendarPage.selectUsernameForFilterCreator()
    await calendarPage.clickOnFilterByGuest()
    await calendarPage.selectUsernameForFilterGuest()
    await calendarPage.clickOnClearAllFilters()
  })

  test('to search for a particular meeting', async () => {
    Allure.addDescription('to check if a particular meeting exists')
    Allure.addTag('smoke')
    Allure.addSeverity('critical')
    eventName = await calendarPage.generateEventName(
      calendarTestData.eventTitle
    )
    await calendarPage.verifyNavigateToCollapseButton()
    await calendarPage.navigateToCollapseButton()
    await calendarPage.verifyAddEventButton()
    await calendarPage.clickOnAddEvent()
    await calendarPage.verifyAddEventModalVisibility()
    await calendarPage.fillAndEnterEventName(eventName)
    await calendarPage.verifyAddEventModal()
    await calendarPage.clickOnParticipants()
    await calendarPage.clickOnSearchEmailParticipant()
    await calendarPage.selectParticipant()
    await calendarPage.clickOnSaveParticipant()
    await calendarPage.clickOnCreateEvent()
    await calendarPage.clickOnCloseEventCreatedModal()
    await calendarPage.addSearchInputText()
    const meetingName = eventName
    await calendarPage.fillAndEnterSearchEventName(meetingName)
    await page.keyboard.press(calendarTestData.enterText)
    await calendarPage.clickOnFoldOut()
    await calendarPage.verifyMeetingVisibility(meetingName)
  })
  test('create teams meeting', async () => {
    Allure.addDescription('to create a new teams meeting')
    Allure.addTag('smoke')
    Allure.addSeverity('critical')
    eventName = await calendarPage.generateEventName(
      calendarTestData.eventTitle
    )
    await calendarPage.verifyNavigateToCollapseButton()
    await calendarPage.navigateToCollapseButton()
    await calendarPage.verifyAddEventButton()
    await calendarPage.clickOnAddEvent()
    await calendarPage.verifyAddEventModalVisibility()
    await calendarPage.fillAndEnterEventName(eventName)
    await calendarPage.verifyAddEventModal()
    await calendarPage.navigateToMeetingSection()
    await calendarPage.selectMeeting()
    await calendarPage.selectTeamsMeeting()
    await calendarPage.clickOnParticipants()
    await calendarPage.clickOnSearchEmailParticipant()
    await calendarPage.selectParticipant()
    await calendarPage.clickOnSaveParticipant()
    await calendarPage.clickOnCreateEvent()
    await calendarPage.clickOnCloseEventCreatedModal()
  })
  test('create zoom meeting', async () => {
    Allure.addDescription('to create a new zoom meeting')
    Allure.addTag('smoke')
    Allure.addSeverity('critical')
    eventName = await calendarPage.generateEventName(
      calendarTestData.eventTitle
    )
    await calendarPage.verifyAddEventButton()
    await calendarPage.clickOnAddEvent()
    await calendarPage.verifyAddEventModalVisibility()
    await calendarPage.fillAndEnterEventName(eventName)
    await calendarPage.navigateToMeetingSection()
    await calendarPage.selectMeeting()
    await calendarPage.selectZoomMeeting()
    await calendarPage.clickOnParticipants()
    await calendarPage.clickOnSearchEmailParticipant()
    await calendarPage.selectParticipant()
    await calendarPage.clickOnSaveParticipant()
    await calendarPage.clickOnCreateEvent()
    await calendarPage.clickOnCloseEventCreatedModal()
  })
  test('create online meeting others', async () => {
    Allure.addDescription(
      'to create a new online meeting which is of type others'
    )
    Allure.addTag('smoke')
    Allure.addSeverity('critical')
    eventName = await calendarPage.generateEventName(
      calendarTestData.eventTitle
    )
    await calendarPage.verifyAddEventButton()
    await calendarPage.clickOnAddEvent()
    await calendarPage.verifyAddEventModalVisibility()
    await calendarPage.fillAndEnterEventName(eventName)
    await calendarPage.navigateToMeetingSection()
    await calendarPage.selectMeeting()
    await calendarPage.selectTOnlineMeetingOther()
    await calendarPage.addEventLink()
    await calendarPage.clickOnParticipants()
    await calendarPage.clickOnSearchEmailParticipant()
    await calendarPage.selectParticipant()
    await calendarPage.clickOnSaveParticipant()
    await calendarPage.clickOnCreateEvent()
    await calendarPage.clickOnCloseEventCreatedModal()
  })
  test('create offline meeting ', async ({ page }) => {
    Allure.addDescription('to create a  offline meeting')
    Allure.addTag('smoke')
    Allure.addSeverity('critical')
    eventName = await calendarPage.generateEventName(
      calendarTestData.eventTitle
    )
    await calendarPage.verifyAddEventButton()
    await calendarPage.clickOnAddEvent()
    await calendarPage.verifyAddEventModalVisibility()
    await calendarPage.fillAndEnterEventName(eventName)
    await calendarPage.navigateToMeetingSection()
    await calendarPage.selectMeeting()
    await calendarPage.selectOfflineMeeting()
    await calendarPage.addOfflineLocation()
    await calendarPage.clickOnParticipants()
    await calendarPage.clickOnSearchEmailParticipant()
    await calendarPage.selectParticipant()
    await calendarPage.clickOnSaveParticipant()
    await calendarPage.clickOnCreateEvent()
    await calendarPage.clickOnCloseEventCreatedModal()
  })
})
