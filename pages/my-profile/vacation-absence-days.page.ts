import { Page, Locator, expect } from '@playwright/test';
import { Allure } from 'common/allure-helper';
let selectedDay: number | null = null;

export class VacationAbsenceDaysPage {
  private page: Page;

  // Locators
  private newRequest: Locator;
  private selectPaidVacation: Locator;
  private selectAbsenceTypeHeading: Locator;
  private pleaseChooseDesc: Locator;
  private paidVacation: Locator;
  private sickLeave: Locator;
  private homeOffice: Locator;
  private createButton: Locator;

  private nextButton: Locator;
  private sendButton: Locator;

  private responsibleDropdown: Locator;
  private responsibleDropdownList: Locator;
  private closeResponsibleDropdownList: Locator;

  private vacationConfirmationDialogMessage: Locator;
  private vacationAppliedDate: Locator;
  private vacationConfirmationDialogDesc: Locator;
  private vacationDialogCloseButton: Locator;


  constructor(page: Page) {
    this.page = page;

    // Initialize locators
    this.newRequest = page.locator('div').filter({ hasText: /^New Request$/ }).nth(1);
    this.selectPaidVacation = page.locator('(//*[@class="Tbns5pyn_LdzU09XB_0r"])[1]')
    this.createButton = page.getByRole('button', { name: 'Create a request' });

    this.selectAbsenceTypeHeading = page.getByText('Select absence type');
    this.pleaseChooseDesc = page.getByText('Please choose the type of');
    this.paidVacation = page.getByText('Paid Vacation', { exact: true });
    this.sickLeave = page.getByText('Sick Leave');
    this.homeOffice = page.getByText('Home Office', { exact: true });

    this.nextButton = page.getByRole('button', { name: 'Next' });
    this.sendButton = page.getByRole('button', { name: 'Send' });

    this.responsibleDropdown = page.getByPlaceholder('Please select');
    this.responsibleDropdownList = page.locator('(//*[@data-ui-element="dropdown-list"])[4]//div[1]/div[1]/div');
    this.closeResponsibleDropdownList = page.locator('.ca-fixed');

    this.vacationConfirmationDialogMessage = page.getByText('Your vacation request is sent!')
    this.vacationAppliedDate = page.locator('//*[@class="gWc1kJi6nF3s2lJE2JbJ"]/span[2]');
    this.vacationConfirmationDialogDesc = page.locator('//*[@class="P3XclPtF4XBYW7l57ez1"]');
    this.vacationDialogCloseButton = page.getByRole('button', { name: 'Close' });

  }

  async clickOnNewRequest() {
    await Allure.step(
      'should Click on New Request Button',
      async () => {
        await this.newRequest.click()
      }
    )
  }

  async VerifyAvailableAbsenceTypes() {
    await Allure.step(
      'should Choose paid vacation',
      async () => {

        await expect(this.selectAbsenceTypeHeading).toBeVisible();
        console.log("select Absence Type Heading is displayed");

        await expect(this.pleaseChooseDesc).toBeVisible();
        console.log("please choose descrption is visible");

        await expect(this.paidVacation).toBeVisible();
        console.log("Paid vacation is visible");

        await expect(this.sickLeave).toBeVisible();
        console.log("sick Leave is visible");

        await expect(this.homeOffice).toBeVisible();
        console.log("home Office is visible");

      }
    )
  }


  async choosePaidVacation() {
    await Allure.step(
      'should Choose paid vacation',
      async () => {
        expect(this.selectPaidVacation).toBeVisible();
        await this.selectPaidVacation.click()
        console.log("Choosed paid vacation option");
      }
    )
  }

  async clickCreateButton() {
    await Allure.step(
      'Clicked on the create Button',
      async () => {
        expect(this.createButton).toBeVisible();
        await this.createButton.click()
        console.log("Clicked on the create Button");
      }
    )
  }

  async selectADay() {
    await Allure.step(
      'select a day',
      async () => {
        await this.findAndApplyVacation();
        console.log("Day is selected");
        await this.page.waitForTimeout(5000);

      }
    )
  }

  async clickOnHalfDayCheckBox() {
    await Allure.step(
      'Half day is selected',
      async () => {
        await this.clickOnHalfDayCheckBox();
        console.log("Half Day is selected");

      }
    )
  }

  async clickOnNextButton() {
    await Allure.step(
      'Clicked on the Next Button',
      async () => {
        expect(this.nextButton).toBeVisible();
        await this.nextButton.click();
        console.log("Clicked on the Next Button");
      }
    )
  }

  async clickOnSendButton() {
    await Allure.step(
      'Clicked on the Send Button',
      async () => {
        expect(this.sendButton).toBeVisible();
        await this.sendButton.click();
        console.log("Clicked on the Send Button");
      }
    )
  }

  async selectACoWorker() {
    await Allure.step(
      'Co-worker is selected',
      async () => {

        await expect(this.responsibleDropdown).toBeVisible();
        await this.responsibleDropdown.click();
        console.log("opened reponsible dropdown");

        await expect(this.responsibleDropdownList).toBeVisible();
        await this.responsibleDropdownList.click();
        console.log("Choosed 1-st Person from dropdown");

        await expect(this.closeResponsibleDropdownList).toBeVisible();
        await this.closeResponsibleDropdownList.click();
        console.log("Closed responsile dropdown ");

      }
    )
  }

  async verifyVacationConfirmationDialogMessage() {
    await Allure.step(
      'vacation Confirmation Dialog is opened ',
      async () => {
        await expect(this.vacationConfirmationDialogMessage).toBeVisible();
        await this.vacationConfirmationDialogMessage.textContent();
        console.log("vacation Confirmation Dialog is opened");

      }
    )
  }

  async verifyVacationAppliedDate() {
    await Allure.step(
      'Able to see the date format',
      async () => {
        const formattedDate = `${16} Jan. 2025 - ${16} Jan. 2025`; // Format the selected date.
        await expect(this.vacationAppliedDate).toHaveText(formattedDate); // Validate the displayed date.
        console.log("Able to see the date format");

      }
    )
  }

  async verifyVacationConfirmationDialogMessageDesc() {
    await Allure.step(
      'Vacation confirmation description message is displayed',
      async () => {
        await expect(this.vacationConfirmationDialogDesc).toHaveText(
          'You will get notified when your teamlead, CEO and HR approves your vacation request.');
        console.log("Vacation confirmation description message is displayed");

      }
    )
  }

  async verifyVacationDialogCloseButton() {
    await Allure.step(
      'vacation Confirmation Dialog is closed',
      async () => {
        await expect(this.vacationDialogCloseButton).toBeVisible();
        await this.vacationDialogCloseButton.click(); // Close the confirmation dialog.
        console.log("vacation Confirmation Dialog is closed");

      }
    )
  }

  // Fetch German public holidays (static for this example) || (used for next method=getValidVacationDay)
  async getGermanPublicHolidays(): Promise<string[]> {
    return [
      '2025-01-01', // New Year's Day
      '2025-04-18', // Good Friday
      '2025-04-21', // Easter Monday
      '2025-05-01', // Labour Day
      '2025-05-29', // Ascension Day
      '2025-06-09', // Whit Monday
      '2025-10-03', // Day of German Unity
      '2025-12-25', // Christmas Day
      '2025-12-26', // Boxing Day
    ];
  }

  // Get valid First Valid day for vacation from starting Today (used for next method=findAndApplyVacation) returns : Day
  async getValidVacationDay(): Promise<number | null> {
    const publicHolidays = await this.getGermanPublicHolidays(); // Fetch public holidays
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Get the total number of days in the current month
    const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Iterate over the days of the current month
    for (let day = today.getDate(); day <= totalDaysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

      // Check if it's a weekday (Mon-Fri) and not a public holiday
      if (dayOfWeek >= 1 && dayOfWeek <= 5 && !publicHolidays.includes(date.toISOString().split('T')[0])) {
        console.log(`Valid day found: ${day}`);
        return day; // Return the first valid day
      }
    }

    return null; // No valid day found
  }

  async selectDynamicVacationDay(day: number): Promise<Locator | null> {
    try {
      const vacationDay = this.page.locator('div')
        .filter({
          hasText: new RegExp(`^${day}$`), // Match the exact day
        }).first();

      await vacationDay.isVisible();
      console.log(`Selecting vacation for the ${day}th.`);
      await vacationDay.click();

      // Return the selected date locator for further actions (like clicking next)
      return vacationDay;
    } catch (error) {
      console.error(`Failed to select vacation for day ${day}: ${error}`);
      return null;
    }
  }

  // Find valid day and apply vacation
  async findAndApplyVacation(): Promise<number | null> {
    const validDay = await this.getValidVacationDay();

    if (validDay !== null) {
      console.log(`Attempting to apply vacation for day: ${validDay}`);
      const success = await this.selectDynamicVacationDay(validDay);

      if (success) {
        console.log(`Vacation successfully applied for day: ${validDay}`);
        return validDay;
      } else {
        console.log(`Failed to apply vacation for day: ${validDay}`);
        return null;
      }
    } else {
      console.log('No valid days available for vacation this month.');
      return null;
    }
  }


  // Get employee ID from the response
  async getEmployeeIdFromResponse(): Promise<number | null> {
    const [response] = await Promise.all([
      this.page.waitForResponse((response) =>
        response.url().includes('api/days_off/requests') && response.status() === 200
      ),
      this.sendButton.click(),
    ]);

    const responseBody = await response.json();
    console.log('Employee ID from response:', responseBody?.employee_id);
    return responseBody?.employee_id ?? null;
  }

}
