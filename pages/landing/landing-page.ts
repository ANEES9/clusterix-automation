import { expect, Locator, Page } from '@playwright/test'
import { getTranslations } from 'common/get-translations-helper'
import { Allure } from 'common/allure-helper'
import { APP_URLS } from 'constants/app-urls'
import { RegisterPage } from 'pages/login-register/register-page'

export class LandingPage {
  private page: Page
  private translations: Record<string, any>

  private registerPage: RegisterPage

  //Header Items
  public headerLogiButton: Locator

  public mainTitle: Locator
  public mainDescription: Locator
  public startFreeButton: Locator
  public scheduleDemoButton: Locator
  public mainContentHeader: Locator
  public mainContentHeader2: Locator
  public mainContentHeader3: Locator
  public box1Title: Locator
  public box1Description: Locator
  public box2Title: Locator
  public box2Description: Locator
  public box3Title: Locator
  public box3Description: Locator
  public box4Title: Locator
  public box4Description: Locator
  public ourAppsTitle: Locator
  public humanResourcesButton: Locator
  public humanResourcesTitle: Locator
  public humanResourcesDescription: Locator
  public timeTrackingButton: Locator
  public timeTrackingTitle: Locator
  public timeTrackingDescription: Locator
  public documentManagementButton: Locator
  public documentManagementTitle: Locator
  public documentManagementDescription: Locator
  public chatButton: Locator
  public chatTitle: Locator
  public chatDescription: Locator
  public calendarButton: Locator
  public calendarTitle: Locator
  public calendarDescription: Locator
  public emailButton: Locator
  public emailTitle: Locator
  public emailDescription: Locator
  public learnMoreButton: Locator

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('landing', locale)

    this.registerPage = new RegisterPage(page, locale)

    //Header Locators
    this.headerLogiButton = page.locator(
      `span:has-text("${this.translations.Main.login}")`
    )
    //Page Content Items
    this.mainTitle = page.locator(
      `span:has-text("${this.translations.Main.hero_title}")`
    )
    this.mainDescription = page.locator(
      `span:has-text("${this.translations.Main.hero_description}")`
    )
    this.startFreeButton = page.locator(
      `button:has-text("${this.translations.Main.hero_button1}")`
    )
    this.scheduleDemoButton = page.locator(
      `button:has-text("${this.translations.Main.hero_button2}")`
    )
    this.mainContentHeader = this.page.locator(
      `div:has-text("${this.translations.Main.content_header_text}")`
    )
    this.mainContentHeader2 = this.page.locator(
      `div:has-text("${this.translations.Main.content_header_text2}")`
    )
    this.mainContentHeader3 = page.locator(
      `span:has-text("${this.translations.Main.content_header_text3}")`
    )
    this.box1Title = this.page.locator(
      `div:has-text("${this.translations.Main.box1_title}")`
    )
    this.box1Description = this.page.locator(
      `div:has-text("${this.translations.Main.box1_description}")`
    )
    this.box2Title = this.page.locator(
      `div:has-text("${this.translations.Main.box2_title}")`
    )
    this.box2Description = this.page.locator(
      `div:has-text("${this.translations.Main.box2_description}")`
    )
    this.box3Title = this.page.locator(
      `div:has-text("${this.translations.Main.box3_title}")`
    )
    this.box3Description = this.page.locator(
      `div:has-text("${this.translations.Main.box3_description}")`
    )
    this.box4Title = this.page.locator(
      `div:has-text("${this.translations.Main.box4_title}")`
    )
    this.box4Description = this.page.locator(
      `div:has-text("${this.translations.Main.box4_description}")`
    )
    this.ourAppsTitle = this.page.locator(
      `div:has-text("${this.translations.AppMenu.our_apps}")`
    )
    this.humanResourcesButton = page.locator(
      `button:has-text("${this.translations.AppMenu.app_hr}")`
    )
    this.humanResourcesTitle = this.page.locator(
      `div:has-text("${this.translations.AppMenu.app_hr}")`
    )
    this.humanResourcesDescription = this.page.locator(
      `div:has-text("${this.translations.AppMenu.app_hr_desc}")`
    )
    this.timeTrackingButton = page.getByRole('button', {
      name: this.translations.AppMenu.app_time_tracking,
    })
    this.timeTrackingTitle = this.page.locator(
      `div:has-text("${this.translations.AppMenu.app_time_tracking}")`
    )
    this.timeTrackingDescription = this.page.locator(
      `div:has-text("${this.translations.AppMenu.app_time_tracking_desc}")`
    )
    this.documentManagementButton = page.locator(
      `button:has-text("${this.translations.AppMenu.app_document_management}")`
    )
    this.documentManagementTitle = this.page.locator(
      `div:has-text("${this.translations.AppMenu.app_document_management}")`
    )
    this.documentManagementDescription = this.page.locator(
      `div:has-text("${this.translations.AppMenu.app_document_management_desc}")`
    )
    this.chatButton = page.getByRole('button', {
      name: this.translations.AppMenu.app_livechat,
    })
    this.chatTitle = this.page.locator(
      `div:has-text("${this.translations.AppMenu.app_livechat}")`
    )
    this.chatDescription = this.page.locator(
      `div:has-text("${this.translations.AppMenu.app_livechat_desc}")`
    )
    this.calendarButton = page.getByRole('button', {
      name: this.translations.AppMenu.app_calendar,
    })

    this.calendarTitle = this.page.locator(
      `div:has-text("${this.translations.AppMenu.app_calendar}")`
    )
    this.calendarDescription = this.page.locator(
      `div:has-text("${this.translations.AppMenu.app_calendar_desc}")`
    )
    this.emailButton = page.locator(
      `button:has-text("${this.translations.AppMenu.app_email.trim()}")`
    )
    this.emailTitle = this.page.locator(
      `div:has-text("${this.translations.AppMenu.app_email}")`
    )
    this.emailDescription = this.page.locator(
      `div:has-text("${this.translations.AppMenu.app_email_desc}")`
    )
    this.learnMoreButton = page.locator(
      `span:has-text("${this.translations.AppMenu.learn_more}")`
    )
  }

  /**
   * Navigate to the categories.
   * @param baseURL - The base URL of the application.
   */
  async goto(baseURL: string | undefined) {
    if (!baseURL) throw new Error('Base URL is not defined')
    await this.page.goto(`${baseURL}`)
  }
  async clickStartFreeButtonAndValidate() {
    await Allure.step(
      'Click on the "Start now - Free for 1 month" Button',
      async () => {
        await this.startFreeButton.nth(0).click()
      }
    )
    await Allure.step(
      'Navigate to register page and validate the URL',
      async () => {
        await this.page.waitForLoadState('networkidle')
        await expect(this.page).toHaveURL(new RegExp(`${APP_URLS.register}$`))
        await this.registerPage.mainHeader.isVisible()
      }
    )
    await Allure.step('Back to landing with browser back button', async () => {
      await this.page.goBack()
      await this.mainTitle.isVisible()
    })
  }
  async clickScheduleDemoButtonAndValidate() {
    let newPage: Page

    await Allure.step('Click on the "Schedule Demo" Button', async () => {
      const [popup] = await Promise.all([
        this.page.context().waitForEvent('page'),
        this.scheduleDemoButton.nth(1).click(),
      ])

      newPage = popup
      await newPage.waitForLoadState('domcontentloaded')
    })

    await Allure.step(
      'Navigate to appointly page and validate the URL',
      async () => {
        await expect(newPage).toHaveURL(
          new RegExp(`${APP_URLS.landing.freddyAppointly}$`)
        )
      }
    )

    await Allure.step('Close only the new tab, keep browser open', async () => {
      await newPage.close()
    })

    await Allure.step(
      'Ensure the main landing page is still active',
      async () => {
        await expect(this.mainTitle).toBeVisible()
      }
    )
  }
  async validateContentHeaderText() {
    await Allure.step('Scroll down to the content header section', async () => {
      await this.mainContentHeader.nth(7).scrollIntoViewIfNeeded()
    })

    await Allure.step('Validate the content header text', async () => {
      await expect(this.mainContentHeader.nth(7)).toBeVisible()
    })

    await Allure.step('Validate the content sub-header texts', async () => {
      await expect(this.mainContentHeader2.nth(7)).toBeVisible()
      await expect(this.mainContentHeader3).toBeVisible()
    })
  }
  async validateMainBoxes() {
    await Allure.step('Scroll down to Box 1 and Box 2', async () => {
      await this.box1Title.nth(6).scrollIntoViewIfNeeded()
    })
    await Allure.step('Validate the Box 1 Title text', async () => {
      await expect(this.box1Title.nth(6)).toBeVisible()
    })
    await Allure.step('Validate the Box 1 Description text', async () => {
      await expect(this.box1Description.nth(6)).toBeVisible()
    })
    await Allure.step('Validate the Box 2 Title text', async () => {
      await expect(this.box2Title.nth(6)).toBeVisible()
    })
    await Allure.step('Validate the Box 2 Description text', async () => {
      await expect(this.box2Description.nth(6)).toBeVisible()
    })
    await Allure.step('Scroll down to Box 3 and Box 4', async () => {
      await this.box3Title.nth(6).scrollIntoViewIfNeeded()
    })
    await Allure.step('Validate the Box 3 Title text', async () => {
      await expect(this.box3Title.nth(6)).toBeVisible()
    })
    await Allure.step('Validate the Box 3 Description text', async () => {
      await expect(this.box3Description.nth(6)).toBeVisible()
    })
    await Allure.step('Validate the Box 4 Title text', async () => {
      await expect(this.box4Title.nth(6)).toBeVisible()
    })
    await Allure.step('Validate the Box 4 Description text', async () => {
      await expect(this.box4Description.nth(6)).toBeVisible()
    })
  }
  async validateHumanResourcesAppContent() {
    await Allure.step(
      'Scroll down to the Our Apps header section and validate',
      async () => {
        await this.ourAppsTitle.nth(5).scrollIntoViewIfNeeded()
        await expect(this.ourAppsTitle.nth(5)).toBeVisible()
      }
    )
    await Allure.step('Click on the Human Resources Button', async () => {
      await this.humanResourcesButton.click()
    })

    await Allure.step(
      'Validate Human Resources title and description',
      async () => {
        await expect(this.humanResourcesTitle.nth(8)).toBeVisible()
        await expect(this.humanResourcesDescription.nth(7)).toBeVisible()
      }
    )
  }
  async validateTimeTrackingAppContent() {
    await Allure.step(
      'Scroll down to the Our Apps header section and validate',
      async () => {
        await this.ourAppsTitle.nth(5).scrollIntoViewIfNeeded()
        await expect(this.ourAppsTitle.nth(5)).toBeVisible()
      }
    )
    await Allure.step('Click on the Time Tracking Button', async () => {
      await this.timeTrackingButton.nth(1).click()
    })

    await Allure.step(
      'Validate Time Tracking title and description',
      async () => {
        await expect(this.timeTrackingTitle.nth(8)).toBeVisible()
        await expect(this.timeTrackingDescription.nth(7)).toBeVisible()
      }
    )
  }
  async validateDocumentManagementAppContent() {
    await Allure.step(
      'Scroll down to the Our Apps header section and validate',
      async () => {
        await this.ourAppsTitle.nth(5).scrollIntoViewIfNeeded()
        await expect(this.ourAppsTitle.nth(5)).toBeVisible()
      }
    )
    await Allure.step('Click on the Document Management Button', async () => {
      await this.documentManagementButton.click()
    })

    await Allure.step(
      'Validate Document Management title and description',
      async () => {
        await expect(this.documentManagementTitle.nth(8)).toBeVisible()
        await expect(this.documentManagementDescription.nth(7)).toBeVisible()
      }
    )
  }
  async validateChatAppContent() {
    await Allure.step(
      'Scroll down to the Our Apps header section and validate',
      async () => {
        await this.ourAppsTitle.nth(5).scrollIntoViewIfNeeded()
        await expect(this.ourAppsTitle.nth(5)).toBeVisible()
      }
    )
    await Allure.step('Click on the Chat Button', async () => {
      await this.chatButton.click()
    })

    await Allure.step('Validate Chat title and description', async () => {
      await expect(this.chatTitle.nth(8)).toBeVisible()
      await expect(this.chatDescription.nth(7)).toBeVisible()
    })
  }
  async validateCalendarAppContent() {
    await Allure.step(
      'Scroll down to the Our Apps header section and validate',
      async () => {
        await this.ourAppsTitle.nth(5).scrollIntoViewIfNeeded()
        await expect(this.ourAppsTitle.nth(5)).toBeVisible()
      }
    )
    await Allure.step('Click on the Calendar Button', async () => {
      await this.calendarButton.click()
    })

    await Allure.step('Validate Calendar title and description', async () => {
      await expect(this.calendarTitle.nth(8)).toBeVisible()
      await expect(this.calendarDescription.nth(7)).toBeVisible()
    })
  }
  async validateEmailAppContent() {
    await Allure.step(
      'Scroll down to the Our Apps header section and validate',
      async () => {
        await this.ourAppsTitle.nth(5).scrollIntoViewIfNeeded()
        await expect(this.ourAppsTitle.nth(5)).toBeVisible()
      }
    )
    await Allure.step('Click on the Email Button', async () => {
      const buttonText = await this.emailButton.nth(1).textContent()
      await this.emailButton.nth(1).click({ force: true })
    })

    await Allure.step('Validate Email title and description', async () => {
      await expect(this.emailTitle.nth(8)).toBeVisible()
      await expect(this.emailDescription.nth(7)).toBeVisible()
    })
  }

  async validateAppNavigation(expectedAppURL: string, nthIndex: number) {
    let newPage: Page

    await Allure.step(`Click on Learn More button (${nthIndex})`, async () => {
      const [popup] = await Promise.all([
        this.page.context().waitForEvent('page'),
        this.learnMoreButton.nth(nthIndex).click(),
      ])

      newPage = popup
      await newPage.waitForLoadState('domcontentloaded')
    })

    await Allure.step(`Validate app page URL: ${expectedAppURL}`, async () => {
      const actualURL = newPage.url()
      expect(actualURL.includes(expectedAppURL)).toBeTruthy()
    })

    await Allure.step(
      'Close the new tab and return to the main page',
      async () => {
        await newPage.close()
      }
    )

    await Allure.step(
      'Ensure the main landing page is still active',
      async () => {
        await expect(this.mainTitle).toBeVisible()
      }
    )
  }
}
