import { Page, expect } from '@playwright/test';

export class CompanyModal {
    private readonly page: Page;

    // Locators
    private modal;
    private address;
    private website;
    private employees;
    private financialData;
    private fieldOfActivity;
    private products;
    private balanceSheet;
    private closeButton;
    private companyModal;

    constructor(page: Page) {
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
        this.closeButton = this.page.locator('css=SELECTOR_FOR_CLOSE_MODAL_BUTTON'); // Replace this with the actual selector
    }

    async openModal(index: number) {
        await this.companyModal.nth(index).click();
       
    }
     

    async verifyModalContents() {
        await expect(this.modal).toBeVisible();
        await expect(this.address).toBeVisible();
        await expect(this.website).toBeVisible();
        await expect(this.employees).toBeVisible();
        await expect(this.financialData).toBeVisible();
        await expect(this.fieldOfActivity).toBeVisible();
        const productsCount = await this.products.count();
        expect(productsCount).toBeGreaterThan(0);
        await expect(this.balanceSheet).toBeVisible();
    }

    async closeModal() {
        await this.closeButton.click();
    }
}
