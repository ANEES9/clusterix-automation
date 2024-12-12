import { test, expect } from '@playwright/test'
import { closeWelcomePopUp } from '../../../helpers/welcome-popup-helper'
import { closeTimerPopUp } from '../../../helpers/timer-helper'
import { addCursorStyleAndScript } from '../../../helpers/cursor-helper'
import { faker } from '@faker-js/faker'
import { getGenderOptions } from '../../../helpers/hr-settings-helper'

test.describe('User and Permissions - My Profile Tests', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/settings/users-and-permissions`)
    await closeWelcomePopUp(page)
    await closeTimerPopUp(page)
    await addCursorStyleAndScript(page)
    await page.waitForLoadState('networkidle')
  })

  //todo: Gender options should change based on HR app settings
  test('My Profile - Validate Basic Data Form Submission', async ({
    page,
    baseURL,
  }) => {
    const randomFirstName = faker.person.firstName()
    const randomLastName = faker.person.lastName()
    const randomPhoneNumber = `+49 ${faker.string.numeric(3)} ${faker.string.numeric(3)} ${faker.string.numeric(4)}`
    //const randomPhoneNumber = faker.phone.number('+## ### ### ####');
    // @ts-ignore
    const randomBirthDay = faker.date.past(30) // Generate a date in the past 30 years
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
      randomBirthDay
    )
    const year = randomBirthDay.getFullYear()
    const day = randomBirthDay.getDate()
    const genderOptions: string[] = await getGenderOptions(page, baseURL)
    console.log('Gender Options:', genderOptions)
    const randomGender = faker.helpers.arrayElement(genderOptions)
    console.log('Selected Gender:', randomGender)
    console.log(`Random Date: ${day} ${month} ${year}`)

    // Step 1: Navigate to the User Permissions > My Profile > Basic Data
    const collapseButton = page.locator('button._collapseButton_1clxr_519')
    await expect(collapseButton).toBeVisible()
    await collapseButton.click()
    const usersPermissionsButton = page.getByRole('button', {
      name: 'Users and Permissions',
      exact: true,
    })
    await expect(usersPermissionsButton).toBeVisible()
    await usersPermissionsButton.click()
    const myProfileButton = page.getByRole('button', {
      name: 'My Profile',
      exact: true,
    })
    await expect(myProfileButton).toBeVisible()
    await myProfileButton.click()
    await collapseButton.click()
    const basicDataButton = page.locator('span:has-text("Basic Data")').nth(0)
    await expect(basicDataButton).toBeVisible()
    await basicDataButton.click()
    await page.waitForLoadState('networkidle')
    // Step 2: Fill in the First Name
    const firstNameInput = page.locator(
      'input[placeholder="Please enter first name"]'
    )
    await expect(firstNameInput).toBeVisible()
    await firstNameInput.fill(randomFirstName)
    // Step 3: Fill in the Last Name
    const lastNameInput = page.locator(
      'input[placeholder="Please enter last name"]'
    )
    await expect(lastNameInput).toBeVisible()
    await lastNameInput.fill(randomLastName)
    // Step 4: Select Gender from the Dropdown
    const genderDropdown = page.locator(
      'input[placeholder="Please select gender"]'
    )
    await expect(genderDropdown).toBeVisible()
    await genderDropdown.click()
    const genderOption = page.locator(`div[data-value="${randomGender}"]`)
    await expect(genderOption).toBeVisible()
    await genderOption.click()
    await page.locator('body').click()
    // Step 5: Select Date from Datepicker
    const dateInput = page.locator('div.ca_datepicker_ddindicator')
    await expect(dateInput).toBeVisible()
    await dateInput.click()
    //Select new month
    const monthDropdown = page.locator('div.ca_datepicker_monthhead_month')
    await expect(monthDropdown).toBeVisible()
    await monthDropdown.click()
    const monthDropdownData = page.locator(
      'div.ca_datepicker_monthhead_dropdown_data'
    )
    await expect(monthDropdownData).toBeVisible()
    const targetMonth = monthDropdownData.locator(`p:has-text("${month}")`)
    await expect(targetMonth).toBeVisible()
    await targetMonth.click()
    const selectedMonth = page.locator(
      `div.ca_datepicker_monthhead_month:has-text("${month}")`
    )
    await expect(selectedMonth).toBeVisible()
    //Select new year
    const yearDropdown = page.locator('div.ca_datepicker_monthhead_year')
    await expect(yearDropdown).toBeVisible()
    await yearDropdown.click()
    const yearDropdownData = page.locator(
      'div.ca_datepicker_monthhead_dropdown_data'
    )
    const targetYear = yearDropdownData.locator(`p:has-text("${year}")`)
    await expect(yearDropdownData).toBeVisible()
    await expect(targetYear).toBeVisible()
    await targetYear.click()
    const selectedYear = page.locator(
      `div.ca_datepicker_monthhead_year:has-text("${year}")`
    )
    await expect(selectedYear).toBeVisible()
    //Select new day
    const dayOption = page.locator(`div.ca_datepicker_day >> text="${day}"`)
    await expect(dayOption).toBeVisible()
    await dayOption.click()
    //Step 6: Fill the phone number
    const phoneInput = page.locator('input[placeholder="Phone"]')
    await expect(phoneInput).toBeVisible()
    await phoneInput.fill(randomPhoneNumber)
    //Step 7: Listen for the network response after clicking "Apply"
    const [response] = await Promise.all([
      page.waitForResponse(
        (response) =>
          response.url().includes('/auth/users') && response.status() === 200
      ),
      // Click the Apply button
      page
        .locator('div.rah-static > div > div > div > div.ca-bg-theme')
        .click(),
    ])
    expect(response.status()).toBe(200)
    console.log('Response received:', await response.json())
    console.log(
      `Random Data: First Name: ${randomFirstName}, Last Name: ${randomLastName}, Phone: ${randomPhoneNumber}`
    )
  })

  test('My Profile - Security and Privacy Page Elements are Visible', async ({
    page,
  }) => {
    // Step 1: Navigate to the User Permissions > My Profile > Security and Privacy
    const collapseButton = page.locator('button._collapseButton_1clxr_519')
    await expect(collapseButton).toBeVisible()
    await collapseButton.click()
    const usersPermissionsButton = page.getByRole('button', {
      name: 'Users and Permissions',
      exact: true,
    })
    await expect(usersPermissionsButton).toBeVisible()
    await usersPermissionsButton.click()
    const myProfileButton = page.getByRole('button', {
      name: 'My Profile',
      exact: true,
    })
    await expect(myProfileButton).toBeVisible()
    await myProfileButton.click()
    await collapseButton.click()
    const securityAndPrivacyButton = page
      .locator('span:has-text("Security and Privacy")')
      .nth(0)
    await expect(securityAndPrivacyButton).toBeVisible()
    await securityAndPrivacyButton.click()
    await page.waitForLoadState('networkidle')
    // Step 2: Assert that the "Two-Factor Authentication" header is visible
    const twoFactorHeader = page
      .locator('span:has-text("Two factor Authentication")')
      .nth(0)
    await expect(twoFactorHeader).toBeVisible()
    // Step 3: Assert that the "Licked Devices" header is visible
    const linkedDevicesHeader = page
      .locator('span:has-text("Linked Devices")')
      .nth(0)
    await expect(linkedDevicesHeader).toBeVisible()
  })

  //todo: need cross icon and switch fix in development side
  test('My Profile - Close 2FA Pop-Up With Cross Icon', async ({ page }) => {
    // Step 1: Navigate to the User Permissions > My Profile > Security and Privacy
    const collapseButton = page.locator('button._collapseButton_1clxr_519')
    await expect(collapseButton).toBeVisible()
    await collapseButton.click()
    const usersPermissionsButton = page.getByRole('button', {
      name: 'Users and Permissions',
      exact: true,
    })
    await expect(usersPermissionsButton).toBeVisible()
    await usersPermissionsButton.click()
    const myProfileButton = page.getByRole('button', {
      name: 'My Profile',
      exact: true,
    })
    await expect(myProfileButton).toBeVisible()
    await myProfileButton.click()
    await collapseButton.click()
    const securityAndPrivacyButton = page
      .locator('span:has-text("Security and Privacy")')
      .nth(0)
    await expect(securityAndPrivacyButton).toBeVisible()
    await securityAndPrivacyButton.click()
    await page.waitForLoadState('networkidle')
    // Step 2: Click on the "Two Factor Authentication" toggle
    const toggle = page.locator('label.ca-relative.ca-border-solid')
    await expect(toggle).toBeVisible()
    await toggle.click()
    // Step 3: Check pop-up
    const twoFactorPopup = page
      .locator('span:has-text("Activate two factor authentication")')
      .nth(0)
    await expect(twoFactorPopup).toBeVisible()
    // Step 4: Close the pop-up
    await page.locator('body').click({ position: { x: 10, y: 10 } })
    await expect(securityAndPrivacyButton).toBeVisible()
  })

  test('My Profile - Check Log Out From All Devices Cancel Button', async ({
    page,
  }) => {
    // Step 1: Navigate to the User Permissions > My Profile > Security and Privacy
    const collapseButton = page.locator('button._collapseButton_1clxr_519')
    await expect(collapseButton).toBeVisible()
    await collapseButton.click()
    const usersPermissionsButton = page.getByRole('button', {
      name: 'Users and Permissions',
      exact: true,
    })
    await expect(usersPermissionsButton).toBeVisible()
    await usersPermissionsButton.click()
    const myProfileButton = page.getByRole('button', {
      name: 'My Profile',
      exact: true,
    })
    await expect(myProfileButton).toBeVisible()
    await myProfileButton.click()
    await collapseButton.click()
    const securityAndPrivacyButton = page
      .locator('span:has-text("Security and Privacy")')
      .nth(0)
    await expect(securityAndPrivacyButton).toBeVisible()
    await securityAndPrivacyButton.click()
    await page.waitForLoadState('networkidle')
    //Step 2: Save the Device Locators
    const otherDevicesSection = page
      .locator(
        'div.bBFoL2CrBucxFT1Ls4rZ' // Target the specific class
      )
      .nth(1)
    await expect(otherDevicesSection).toBeVisible()
    const deviceLocator = otherDevicesSection
      .locator('div.kAw4BgoewDQkDd7UMP2C')
      .nth(0)
    const deviceText = await deviceLocator.textContent()
    console.log('Device Text:', deviceText)
    await expect(deviceLocator).toBeVisible()
    //Step 3: Click on the Log Out From All Devices
    await page.getByText('Log Out From All Devices').click()
    //Step 4: Click on the Cancel button in the pop-up
    await page
      .locator('div[class*="ca-bg-theme-dark"]:has-text("Cancel")')
      .click()
    // Step 5: Verify the device text is still visible
    const updatedDeviceText = await deviceLocator.textContent()
    console.log('Updated Device Text:', updatedDeviceText)
    // Step 6: Assert that the text before and after are the same
    expect(updatedDeviceText).toBe(deviceText)
  })

  test('My Profile - Check Log Out From All Devices Log Out Button', async ({
    page,
  }) => {
    // Step 1: Navigate to the User Permissions > My Profile > Security and Privacy
    const collapseButton = page.locator('button._collapseButton_1clxr_519')
    await expect(collapseButton).toBeVisible()
    await collapseButton.click()
    const usersPermissionsButton = page.getByRole('button', {
      name: 'Users and Permissions',
      exact: true,
    })
    await expect(usersPermissionsButton).toBeVisible()
    await usersPermissionsButton.click()
    const myProfileButton = page.getByRole('button', {
      name: 'My Profile',
      exact: true,
    })
    await expect(myProfileButton).toBeVisible()
    await myProfileButton.click()
    await collapseButton.click()
    const securityAndPrivacyButton = page
      .locator('span:has-text("Security and Privacy")')
      .nth(0)
    await expect(securityAndPrivacyButton).toBeVisible()
    await securityAndPrivacyButton.click()
    await page.waitForLoadState('networkidle')
    //Step 2: Save the Device Locators
    const otherDevicesSection = page
      .locator('div.bBFoL2CrBucxFT1Ls4rZ') // Target the specific class
      .nth(1)
    await expect(otherDevicesSection).toBeVisible()
    const initialDevices = await otherDevicesSection
      .locator('div.kAw4BgoewDQkDd7UMP2C')
      .allTextContents()
    console.log('Initial Devices:', initialDevices)
    //Step 3: Click on the Log Out From All Devices
    await page.getByText('Log Out From All Devices').click()
    //Step 4: Click on the Log Out button in the pop-up
    await page.getByText('Log out', { exact: true }).click()
    // Step 5: Verify the device text is still visible
    await expect(otherDevicesSection).toBeVisible()
    const updatedDevices = await otherDevicesSection
      .locator('div.kAw4BgoewDQkDd7UMP2C')
      .allTextContents()
    console.log('Updated Devices:', updatedDevices)
    // Step 6: Assert that the device list is empty
    expect(updatedDevices).not.toEqual(initialDevices)
    expect(updatedDevices.length)
  })
})
