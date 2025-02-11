import { BrowserContext, Page, test, expect } from '@playwright/test';
import { KeywordPage } from 'pages/company-searcher/keyword-page';
import { CompanyPage } from 'pages/company-searcher/company-page';
import { closeCurrentlyActivePopup } from 'helpers/ui/company-searcher/currently-active-popup';
import { collapseSidebar } from 'helpers/ui/company-searcher/sidebar-helper';
import { addCursorStyleAndScript } from 'common/cursor-helper';
import { skipProductTourHelper } from 'common/skip-product-tour-helper';
import { skipSurveyHelper } from 'common/skip-survey-helper';
import * as keywords from 'utils/test-data/company-searcher/keywords.json'; 
import { Allure } from 'common/allure-helper';
import { CompanyModal } from 'pages/company-searcher/company-modal';

let sharedPage: Page;
let sharedContext: BrowserContext;



test.beforeAll(async ({ browser, baseURL }, testInfo) => {
    sharedContext = await browser.newContext();
    sharedPage = await sharedContext.newPage();

    await sharedPage.goto(baseURL!);
    await skipSurveyHelper(sharedPage, testInfo);
    await skipProductTourHelper(sharedPage, testInfo);
    await sharedPage.waitForLoadState('networkidle');
    await addCursorStyleAndScript(sharedPage);
    const companyPage = new CompanyPage(sharedPage);
    await companyPage.companySearcherLink.click();
   
});

test.afterAll(async () => {
    await sharedContext.close();
});

test.describe('Keyword search tests', () => {


    test.beforeEach(async ({}, testInfo) => {
        const locale = (testInfo.project.use?.locale ?? 'en') as 'en' | 'de';
        await collapseSidebar(sharedPage);
        await closeCurrentlyActivePopup(sharedPage);
    });
    test('Verify company modal opens for multiple entries and contains all elements', async () => {
   
        const companyModal = new CompanyModal(sharedPage);
        for (let i = 0; i < 2; i++) {
            await companyModal.openModal(i);
             await sharedPage.waitForTimeout(2000);
            await companyModal.verifyModalContents();
            await companyModal.closeModal();
        }
    });
});
