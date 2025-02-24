import { BrowserContext, Page, test, expect } from '@playwright/test';
import { CompanyPage } from 'pages/company-searcher/company-page';
import { closeCurrentlyActivePopup } from 'helpers/ui/company-searcher/currently-active-popup';
import { collapseSidebar } from 'helpers/ui/company-searcher/sidebar-helper';
import { addCursorStyleAndScript } from 'common/cursor-helper';
import { companyModal } from 'pages/company-searcher/company-modal';
import { setupTestContext } from 'utils/test-context';
import { communicationModal } from 'pages/company-searcher/company-modal';
import usernamesData from 'utils/test-data/company-searcher/usernames.json'; // Notice this import


let sharedPage: Page;
let sharedContext: BrowserContext;

test.beforeAll(async ({ browser, baseURL }, testInfo) => {
    test.setTimeout(60000);
    sharedContext = await browser.newContext();
    sharedPage = await sharedContext.newPage();
    await sharedPage.goto(baseURL!);
    const { locale } = await setupTestContext(sharedPage, testInfo);
    await sharedPage.waitForLoadState('networkidle');
    await addCursorStyleAndScript(sharedPage);
    const companyPage = new CompanyPage(sharedPage, locale);
    await companyPage.companySearcherLink.click();
});

test.afterAll(async () => {
    await sharedContext.close();
});

test.describe.parallel('company modal tests', () => {
    let modal: companyModal;
    let commModal: communicationModal;
    let names: string[];


test.beforeEach(async ({}, testInfo) => {
        const locale = (testInfo.project.use?.locale ?? 'en') as 'en' | 'de';
        modal = new companyModal(sharedPage, locale);
        commModal = new communicationModal(sharedPage);
        test.setTimeout(testInfo.timeout + 30000);
        names = usernamesData.usernames; // Correctly accessing the usernames array 
        await sharedPage.reload();
        await sharedPage.waitForLoadState('networkidle');
        await collapseSidebar(sharedPage);
        await closeCurrentlyActivePopup(sharedPage);

    });
    test('Verify company modal opens for multiple attempts and contains all elements', async () => {
      await modal.manageModal(2); // Number of modals to open
    });

    test('user can submit multiple comments and see them displayed', async () => {
        await modal.openModal(0);
        await modal.verifyModalContents();
        await commModal.genarateComments(2); // Modify the number of comments as needed
        await modal.closeModal();
    });

    test('user can manage modals, submit comments, and tag users', async () => {
        await modal.openModal(0);
        await modal.verifyModalContents();
        await commModal.genarateTaggedComments(3, usernamesData.usernames); // Specify iterations and provide usernames
        await modal.closeModal();
    });
});

