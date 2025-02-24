import { Page, expect } from '@playwright/test'
import { Allure } from 'common/allure-helper'

export class CompanyModal {
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
        this.page = page;
        
        // Initialize locators
        this.companyModal =this.page.locator('.mnJziLomBY55AkkNgeOP');
        this.modal = this.page.locator('.CompanyDetailsWrapper-module_companyDetailsWrapper__6lUe-');
        this.address = this.page.locator('.AddressItem-module_addressItem__86eaZ');
        this.website = this.page.locator('.WebsitesItem-module_websitesItem__W02rz');
        this.employees = this.page.locator('.EmployeesItem-module_employeesItem__pxh6V >> nth=0');
        this.financialData = this.page.locator('.FinancialDataItem-module_financialDataItem__WAzjj');
        this.fieldOfActivity = this.page.locator('.SectionWrapper-module_sectionWrapper__Z0Ava >> nth=1');
        this.products = this.page.locator('.Products-module_product__0bDy4');
        this.balanceSheet = this.page.locator('.BalanceSheets-module_balanceSheets__5K7O6');
        this.closeButton = this.page.locator('.Lh9S26U3vePNRhTr3fPq'); 
    }

    async openModal(index: number) {
        await Allure.step(`Open company modal for company at index ${index}`, async () => {
        await this.companyModal.nth(index).click();
    });
    }
     

  async openModal(index: number) {
    await this.companyModal.nth(index).click()
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
    await this.closeButton.click()
  }
}
export class communicationModal {
    private readonly page: Page;

    // Locators
    private commentInputLocator: Locator;
    private sendButtonLocator: Locator;
    private commentDisplayLocator: Locator;
    private userTagPopupLocator: Locator;
    private userTagOptionLocator: (text: string) => Locator;

    constructor(page: Page) {
        this.page = page;
        this.commentInputLocator = this.page.locator('.remirror-editor');
        this.sendButtonLocator = this.page.locator('div.ca-bg-theme-10.ca-text-theme.ca-fill-theme>>nth=4');
        this.commentDisplayLocator = this.page.locator('.CommentCard-module_commentContent__7zLeA>>nth=0');
        this.userTagPopupLocator = this.page.locator('.remirror-floating-popover');
        this.userTagOptionLocator = (text: string) =>  this.userTagPopupLocator.locator(`text=/.*${text}.*/i`).first();
    }

    async tagUser(username: string) {
        await Allure.step(`Tag user: ${username}`, async () => {
            await this.commentInputLocator.fill(`@${username}`);
            await this.page.waitForTimeout(1000);
            await this.page.waitForSelector('.remirror-floating-popover', { state: 'visible' });
            await this.userTagOptionLocator(username).waitFor({ state: 'visible' });
            await this.userTagOptionLocator(username).click();
        });
    }
    async fillComment(comment: string) {
        await Allure.step(`Submit comment: ${comment}`, async () => {
            await this.commentInputLocator.fill(comment);
            await this.sendButtonLocator.click();
        });
    }
    
    async appendComment(comment: string) {
        await Allure.step(`Append comment: ${comment}`, async () => {
            await this.page.evaluate(({ selector, text }) => {
                const el = document.querySelector(selector);
                if (el) {
                    const textNode = document.createTextNode(" " + text); // Ensure a space before appending
                    el.appendChild(textNode);
                }
            }, { selector: '.remirror-editor', text: comment });
        });
    }
    

    async getCommentText(): Promise<string> {
        const text = await this.commentInputLocator.textContent();
        return text || "";
    }
    
    async submitComment() {
        await Allure.step("Submit comment", async () => {
            await this.sendButtonLocator.click();
        });
    }

    async checkCommentDisplayed(comment: string) {
        await Allure.step(`Check that comment: ${comment} is displayed`, async () => {
            await expect(this.commentDisplayLocator).toContainText(comment);
        });
    }

    async checkTaggedCommentDisplayed(fullComment: string) {
        await Allure.step(`Check that comment: '${fullComment}' is displayed`, async () => {
            await expect(this.commentDisplayLocator).toContainText(fullComment);
        });
    }


    async tagAndSubmitComment(username: string, comment: string) {
        await Allure.step(`Tag user and submit comment for ${username}`, async () => {
            await this.tagUser(username);
            await this.appendComment(comment);
            await this.submitComment();
            await this.page.waitForTimeout(1000); // Wait for the comment to be processed
        });
    }

    async genarateComments(numComments: number) {
        for (let i = 0; i < numComments; i++) {
            const comment = faker.lorem.sentence();
            await this.appendComment(comment);
            await this.submitComment();
            await this.checkCommentDisplayed(comment);


        }
    }


    async genarateTaggedComments(numComments: number, usernames: string[]) {
        for (let i = 0; i < numComments; i++) {
            const randomName = usernames[Math.floor(Math.random() * usernames.length)];
            const comment = faker.lorem.sentence();
            await this.tagAndSubmitComment(randomName, comment);
            await this.checkTaggedCommentDisplayed(comment);
        }
}
}