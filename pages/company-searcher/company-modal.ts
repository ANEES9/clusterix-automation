import { faker } from '@faker-js/faker/locale/en'
import { Locator, Page, expect } from '@playwright/test'
import { allure } from 'allure-playwright'
import { Allure } from 'common/allure-helper'

import { getTranslations } from 'common/get-translations-helper'

export class companyModal {
  private readonly page: Page

  // Locators
  private modal
  private address
  private website
  private employees
  private financialData
  private fieldOfActivity
  private products
  private balanceSheet
  private closeButton
  private companyModal

  constructor(page: Page, locale: string) {
    this.page = page

    // Initialize locators
    this.companyModal = this.page.locator('.mnJziLomBY55AkkNgeOP')
    this.modal = this.page.locator(
      '.CompanyDetailsWrapper-module_companyDetailsWrapper__6lUe-'
    )
    this.address = this.page.locator('.AddressItem-module_addressItem__86eaZ')
    this.website = this.page.locator('.WebsitesItem-module_websitesItem__W02rz')
    this.employees = this.page.locator(
      '.EmployeesItem-module_employeesItem__pxh6V >> nth=0'
    )
    this.financialData = this.page.locator(
      '.FinancialDataItem-module_financialDataItem__WAzjj'
    )
    this.fieldOfActivity = this.page.locator(
      '.SectionWrapper-module_sectionWrapper__Z0Ava >> nth=1'
    )
    this.products = this.page.locator('.Products-module_product__0bDy4')
    this.balanceSheet = this.page.locator(
      '.BalanceSheets-module_balanceSheets__5K7O6'
    )
    this.closeButton = this.page.locator('.Lh9S26U3vePNRhTr3fPq')
  }

  async openModal(index: number) {
    await Allure.step(
      `Open company modal for company at index ${index}`,
      async () => {
        await this.companyModal.nth(index).click()
        await this.address.waitFor({ state: 'visible', timeout: 3000 })
      }
    )
  }

  async verifyModalContents() {
    await Allure.step('Verify company modal contents', async () => {
      await expect(this.modal).toBeVisible()
      await expect(this.address).toBeVisible()
      await expect(this.website).toBeVisible()
      await expect(this.employees).toBeVisible()
      await expect(this.financialData).toBeVisible()
      await expect(this.fieldOfActivity).toBeVisible()
      const productsCount = await this.products.count()
      expect(productsCount).toBeGreaterThan(0)
      await expect(this.balanceSheet).toBeVisible()
    })
  }

  async closeModal() {
    await Allure.step('Close company modal', async () => {
      await this.closeButton.click()
    })
  }

  async manageModal(instance: number) {
    for (let i = 0; i < instance; i++) {
      await this.openModal(i)
      await this.page.waitForTimeout(1000)
      await this.verifyModalContents()
      await this.closeModal()
    }
  }
}
export class communicationModal {
  private readonly page: Page
  private readonly translations: Record<string, any>

  // Locators
  private commentInputLocator: Locator
  private sendButtonLocator: Locator
  private commentDisplayLocator: Locator
  private userTagPopupLocator: Locator
  private userTagOptionLocator: (text: string) => Locator
  private searchInput: Locator
  private commentCards: Locator
  private eventCardsContainer: Locator
  private communicationTab: Locator
  private notesTab: Locator
  private contactsTab: Locator
  private documentsTab: Locator
  private closePanelButton: Locator
  private filterButton: Locator
  private notificationButton: Locator
  private searchButton: Locator
  private rightpanelcommentbutton: Locator
  private rightpanelnotesbutton: Locator
  private rightpanelcontactsbutton: Locator
  private rightpaneldocumentsbutton: Locator
  private addnotebutton: Locator
  private addcontactbutton: Locator
  private adddocumentbutton: Locator
  private NotesTab: Locator
  private newNoteButton: Locator
  private noteTitleInput: Locator
  private noteContentBox: Locator
  private saveAndCloseButton: Locator
  private displayedTitle: Locator
  private displayedContent: Locator

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('company-searcher', locale)
    this.commentInputLocator = this.page.locator('.remirror-editor')
    this.sendButtonLocator = this.page.locator(
      'div.ca-bg-theme-10.ca-text-theme.ca-fill-theme>>nth=4'
    )
    this.commentDisplayLocator = this.page.locator(
      '.CommentCard-module_commentContent__7zLeA>>nth=0'
    )
    this.userTagPopupLocator = this.page.locator('.remirror-floating-popover')
    this.userTagOptionLocator = (text: string) =>
      this.userTagPopupLocator.locator(`text=/.*${text}.*/i`).first()

    this.searchInput = this.page.locator(
      '.FiltersBar-module_searchInput__SbcRO input'
    )
    this.commentCards = this.page.locator(
      '.CommentCard-module_commentContent__7zLeA div div:nth-child(2)'
    )
    this.eventCardsContainer = this.page.locator(
      '.EventCards-module_eventCards__9h6Wc'
    )

    this.communicationTab = page.locator(
      `button:has-text("${this.translations.main.company_details_modal.right_panel.communication.title}")`
    )
    this.notesTab = page.locator(
      `button:has-text("${this.translations.main.company_details_modal.right_panel.notes.title}")`
    )
    this.contactsTab = page.locator(
      `button:has-text("${this.translations.main.company_details_modal.right_panel.contacts.title}")>>nth=1`
    )
    this.documentsTab = page.locator(
      `button:has-text("${this.translations.main.company_details_modal.right_panel.documents.title}")`
    )
    this.closePanelButton = page.locator(
      'button[class*="ExpandableSidebar-module_closePanelButton"]'
    )
    this.filterButton = page.locator(
      '.ca-bg-theme-10.ca-text-theme.ca-fill-theme >> nth=1'
    )
    this.notificationButton = page.locator(
      '.ca-bg-theme-10.ca-text-theme.ca-fill-theme >> nth=2'
    )
    this.searchButton = page.locator(
      '.ca-bg-theme-10.ca-text-theme.ca-fill-theme >> nth=3'
    )

    this.rightpanelcommentbutton = page.locator(
      '.ExpandableSidebar-module_iconWrapper__1byAq>>nth=0'
    )
    this.rightpanelnotesbutton = page.locator(
      '.ExpandableSidebar-module_iconWrapper__1byAq>>nth=1'
    )
    this.rightpanelcontactsbutton = page.locator(
      '.ExpandableSidebar-module_iconWrapper__1byAq>>nth=2'
    )
    this.rightpaneldocumentsbutton = page.locator(
      '.ExpandableSidebar-module_iconWrapper__1byAq>>nth=3'
    )

    this.addnotebutton = page.locator(
      `text=${this.translations.main.company_details_modal.right_panel.notes.New_note}`
    )
    this.addcontactbutton = page.locator(
      `text=${this.translations.main.company_details_modal.right_panel.contacts.Add_new_contact}`
    )
    this.adddocumentbutton = page.locator(
      `text=${this.translations.main.company_details_modal.right_panel.documents.upload_files}`
    )
    this.NotesTab = page.locator(
      `.ExpandableSidebar-module_tab__b3XTF ExpandableSidebar-module_active__OB70m`
    )

    //Notes Tab Locators
    this.newNoteButton = page.locator(
      `div:has-text("${this.translations.main.company_details_modal.right_panel.notes.New_note}")`
    )
    this.noteTitleInput = page.locator(
      `input[placeholder="${this.translations.main.company_details_modal.right_panel.notes.Note_title}"]`
    )
    this.noteContentBox = page.locator('div[role="textbox"]')
    this.saveAndCloseButton = page.locator(
      `div:has(svg) >> text="${this.translations.main.company_details_modal.right_panel.notes.Save_and_close}"`
    )
    this.displayedTitle = page.locator('.NoteItem-module_heading__6Uetk>>nth=0')
    this.displayedContent = page.locator(
      '.NoteItem-module_noteBody__J9ulc>>nth=0'
    )
  }

  async tagUser(username: string) {
    await Allure.step(`Tag user: ${username}`, async () => {
      await this.commentInputLocator.fill(`@${username}`)
      await this.page.waitForTimeout(1000)
      await this.page.waitForSelector('.remirror-floating-popover', {
        state: 'visible',
      })
      await this.userTagOptionLocator(username).waitFor({ state: 'visible' })
      await this.userTagOptionLocator(username).click()
    })
  }
  async fillComment(comment: string) {
    await Allure.step(`Submit comment: ${comment}`, async () => {
      await this.commentInputLocator.waitFor({
        state: 'visible',
        timeout: 2000,
      })
      await this.commentInputLocator.fill(comment)
      await this.sendButtonLocator.click()
    })
  }

  async openNotesTab() {
    await Allure.step('Open Notes Tab', async () => {
      await this.notesTab.click()
    })
  }

  async addNote() {
    await Allure.step('Add Note', async () => {
      await this.page.waitForTimeout(2000)
      await this.addnotebutton.click()
    })
  }

  async appendComment(comment: string) {
    await Allure.step(`Append comment: ${comment}`, async () => {
      await this.eventCardsContainer.waitFor({
        state: 'visible',
        timeout: 5000,
      })
      await this.page.evaluate(
        ({ selector, text }) => {
          const el = document.querySelector(selector)
          if (el) {
            const textNode = document.createTextNode(' ' + text) // Ensure a space before appending
            el.appendChild(textNode)
          }
        },
        { selector: '.remirror-editor', text: comment }
      )
    })
  }

  async getCommentText(): Promise<string> {
    const text = await this.commentInputLocator.textContent()
    return text || ''
  }

  async submitComment() {
    await Allure.step('Submit comment', async () => {
      await this.sendButtonLocator.click()
    })
  }

  async checkCommentDisplayed(comment: string) {
    await Allure.step(
      `Check that comment: ${comment} is displayed`,
      async () => {
        await expect(this.commentDisplayLocator).toContainText(comment)
      }
    )
  }

  async checkTaggedCommentDisplayed(fullComment: string) {
    await Allure.step(
      `Check that comment: '${fullComment}' is displayed`,
      async () => {
        await expect(this.commentDisplayLocator).toContainText(fullComment)
      }
    )
  }

  async tagAndSubmitComment(username: string, comment: string) {
    await Allure.step(
      `Tag user and submit comment for ${username}`,
      async () => {
        await this.tagUser(username)
        await this.appendComment(comment)
        await this.submitComment()
        await this.page.waitForTimeout(1000) // Wait for the comment to be processed
      }
    )
  }

  async genarateComments(numComments: number) {
    for (let i = 0; i < numComments; i++) {
      const comment = faker.lorem.sentence()
      await this.appendComment(comment)
      await this.submitComment()
      await this.checkCommentDisplayed(comment)
    }
  }

  async genarateTaggedComments(numComments: number, usernames: string[]) {
    for (let i = 0; i < numComments; i++) {
      const randomName = usernames[Math.floor(Math.random() * usernames.length)]
      const comment = faker.lorem.sentence()
      await this.tagAndSubmitComment(randomName, comment)
      await this.checkTaggedCommentDisplayed(comment)
    }
  }

  async pickCommentText() {
    // Ensure the selector is a string and correctly used in $eval
    return await this.page.$eval(
      '.CommentCard-module_commentContent__7zLeA:first-child div div:nth-child(2)',
      (element) => element?.textContent?.trim() || ''
    )
  }

  async typeInSearchField(text: string) {
    await this.searchInput.fill(text)
    await this.eventCardsContainer.waitFor({ state: 'visible', timeout: 2000 })
  }

  async getVisibleComments() {
    await this.page.waitForTimeout(3000) // Wait for the comments to load
    // Using $$eval with the correct string selector
    return await this.page.$$eval(
      '.CommentCard-module_commentContent__7zLeA div:nth-child(2)',
      (nodes) => nodes.map((n) => n.textContent?.trim() || '')
    )
  }

  async assertCommentsContainText(expectedText: string) {
    const visibleComments = await this.getVisibleComments()
    visibleComments.forEach((comment) => {
      if (!comment.includes(expectedText)) {
        throw new Error(
          `Expected comment to contain text: '${expectedText}', but found: '${comment}'`
        )
      }
    })
  }
  async closesidepanel() {
    await this.closePanelButton.click()
  }
  async verifyVisibility() {
    await Allure.step('Verify company modal contents', async () => {
      await this.communicationTab.waitFor({ state: 'visible', timeout: 2000 })
      await expect(this.communicationTab).toBeVisible()
      await expect(this.notesTab).toBeVisible()
      await expect(this.contactsTab).toBeVisible()
      await expect(this.documentsTab).toBeVisible()
      await expect(this.closePanelButton).toBeVisible()
      await expect(this.searchInput).toBeVisible()
      await expect(this.filterButton).toBeVisible()
      await expect(this.notificationButton).toBeVisible()
      await expect(this.searchButton).toBeVisible()
    })
  }

  async verifyclosePanel() {
    await Allure.step('Verify company modal contents', async () => {
      const isCollapsed = await this.page.isHidden(
        '.EventCards-module_eventCards__9h6Wc'
      )
      expect(isCollapsed).toBe(true)
    })
  }

  async verifyCommunicationTabNavigation() {
    await Allure.step(
      'Verify Navigation to Communtication Modal From Right Panel',
      async () => {
        this.rightpanelcommentbutton.click()
        await expect(this.eventCardsContainer).toBeVisible()
      }
    )
  }

  async VerifyNotesTabNavigation() {
    await Allure.step(
      'Verify Navigation to Notes Tab From Right Panel',
      async () => {
        this.rightpanelnotesbutton.click()
        await expect(this.addnotebutton).toBeVisible()
      }
    )
  }

  async VerifyContactsNavigation() {
    await Allure.step(
      'Verify Navigation to Contacts Tab From Right Panel',
      async () => {
        this.rightpanelcontactsbutton.click()
        await expect(this.addcontactbutton).toBeVisible()
      }
    )
  }
  async VerifyDocumentsNavigation() {
    await Allure.step(
      'Verify Navigation to Documents Tab From Right Panel',
      async () => {
        this.rightpaneldocumentsbutton.click()
        await expect(this.adddocumentbutton).toBeVisible()
      }
    )
  }

  async createAndVerifyNote() {
    await Allure.step(
      'Create and verify a note with dynamic content',
      async () => {
        const title = faker.lorem.words(3)
        const content = faker.lorem.sentence()
        await this.addNote()
        await this.noteTitleInput.fill(title)
        await this.noteContentBox.fill(content)
        await this.saveAndCloseButton.click()
        await this.page.waitForTimeout(2000) // Wait for the note to be saved
        // Verify note
        const displayedTitle = await this.displayedTitle.textContent()
        const displayedContent = await this.displayedContent.textContent()
        // Partial content checks
        expect(displayedTitle).toContain(title.substring(0, title.length / 2))
        expect(displayedContent).toContain(
          content.substring(0, content.length / 2)
        )
      }
    )
  }
}
