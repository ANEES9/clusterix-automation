import { BrowserContext, Page, test, expect } from '@playwright/test';
import { KeywordPage } from 'pages/company-searcher/keyword-page';
import { CompanyPage } from 'pages/company-searcher/company-page';
import { closeCurrentlyActivePopup } from 'helpers/ui/company-searcher/currently-active-popup';
import { collapseSidebar } from 'helpers/ui/company-searcher/sidebar-helper';
import { addCursorStyleAndScript } from 'common/cursor-helper';
import * as keywords from 'utils/test-data/company-searcher/keywords.json'; 
import { Allure } from 'common/allure-helper';
import { setupTestContext } from 'utils/test-context'
let sharedPage: Page;
let sharedContext: BrowserContext;

test.beforeAll(async ({ browser, baseURL }, testInfo) => {
    test.setTimeout(60000);
    sharedContext = await browser.newContext();
    sharedPage = await sharedContext.newPage();
    const { locale } = await setupTestContext(sharedPage, testInfo)
    await sharedPage.goto(baseURL!);
    await sharedPage.waitForLoadState('networkidle');
    await addCursorStyleAndScript(sharedPage);
    const companyPage = new CompanyPage(sharedPage,locale);
    const keywordPage = new KeywordPage(sharedPage, locale);
    await companyPage.companySearcherLink.click();
    await keywordPage.openSearch();
});

test.afterAll(async () => {
    await sharedContext.close();
});

test.describe('Keyword search tests', () => {
    let keywordPage: KeywordPage;
    let searchTerms: string[];

    test.beforeEach(async ({}, testInfo) => {
        const locale = (testInfo.project.use?.locale ?? 'en') as 'en' | 'de';
        keywordPage = new KeywordPage(sharedPage, locale);
        searchTerms = keywords[locale];  // Load keywords based on locale
        await sharedPage.reload();
        await sharedPage.waitForLoadState('networkidle');
        await collapseSidebar(sharedPage);
        await closeCurrentlyActivePopup(sharedPage);
    });

    test('Verify keyword page navigation and initial state', async () => {
    Allure.addSeverity('critical');
    Allure.addDescription( 'Test to verify that the keyword search page is accessible and initial state is as expected.');
        await keywordPage.verifySearchInput();
        await keywordPage.verifyInitialMessage();
        await keywordPage.verifyButtonVisible('save_search')
      });


      test('Verify all UI elements are present', async () => {
        Allure.addSeverity('critical');
        Allure.addDescription('Test to verify that the keyword search page is accessible and ui elements are present.');
        await keywordPage.verifyElementsPresence();
    });
    
    test('Verify company modal opens for multiple attempts and contains all elements', async () => {
        Allure.addSeverity('critical');
        Allure.addDescription('Test to verify that the company modal opens for multiple attempts and contains all elements.');
        const numberOfTermsToCheck = 1; // Number of random search terms to check
        const instances = 2; // Number of modal instances to test
        const randomSearchTerms = keywordPage.pickRandomItems(searchTerms, numberOfTermsToCheck);
        await keywordPage.searchAndVerifyModals(randomSearchTerms, instances);
    });


    test('Verify Next Page Button Functionality', async () => {
        Allure.addSeverity('critical');
        Allure.addTag('navigation');
        Allure.addDescription('Test to verify that clicking the Next button navigates to the next page and each page has data.');
        const numberOfTermsToCheck = 1; // Number of random search terms to check
        const pagesToNavigate = 2; // Number of pages to navigate through
        await keywordPage.pickAndProcessRandomSearchTerms(searchTerms, numberOfTermsToCheck, pagesToNavigate);
        
    });






});