import { test, expect } from '@playwright/test';
import { closeWelcomePopUp } from '../../helpers/welcome-popup-helper';
import { closeTimerPopUp } from '../../helpers/timer-helper';

test.describe('Project Management - Overview', () => {
    test.beforeEach(async ({ page, baseURL }) => {
        // Navigate to the overview page
        await page.goto(`${baseURL}/project-management/projects/overview`);
        await page.waitForLoadState('networkidle');
        // Close any pop-ups
        await closeWelcomePopUp(page);
        await closeTimerPopUp(page);
        //Assertion
        const titleLocator = page.locator('.project-management-overview-title >> text=All Projects');
        await expect(titleLocator).toBeVisible();
    });

    test('Verify the projects list is displayed', async ({ page }) => {
        const projectList = page.locator('div[title="Project Title"]');
        await expect(projectList).toBeVisible();
    });

    test('Get a project title and search for it', async ({ page }) => {
        await page.waitForLoadState('networkidle');
        await page.waitForSelector('.project-management-overview .project-title-column span', { state: 'visible', timeout: 15000 });
        const projectTitleLocator = page.locator('.project-management-overview .project-title-column span');
        const projectTitle = await projectTitleLocator.first().innerText();
        const searchInput = page.locator('input[placeholder="Search for projects"]');
        await searchInput.fill(projectTitle);
        await page.keyboard.press('Enter');
        const searchResult = page.locator('.project-title-column span').filter({ hasText: projectTitle });
        await expect(searchResult).toBeVisible();
    });

    test('Verify the project filters functionality', async ({ page }) => {
        const filterButton = page.getByRole('button', { name: 'Filter' });
        await filterButton.click();
        const filterOption = page.getByRole('option', { name: 'All Types' });
        await expect(filterOption).toBeVisible();
    });

    test('Verify navigation to a project\'s details from List View', async ({ page }) => {
        const projectDetailIcon = page.locator('.project-details-icon').first(); // Assuming .project-details-icon locates the magnifying glass icon
        await projectDetailIcon.click();
        const projectDetailsPage = page.locator('.project-details-title'); // Replace with actual selector for project details page
        await expect(projectDetailsPage).toBeVisible();
    });

    test('Verify navigation to a project\'s details from Tile View', async ({ page }) => {
        await page.getByRole('button', { name: 'Tile view' }).click(); // Switch to Tile View
        const projectTile = page.locator('.project-tile').first(); // Replace with actual selector for project tiles
        await projectTile.click();
        const projectDetailsPage = page.locator('.project-details-title');
        await expect(projectDetailsPage).toBeVisible();
    });

    test('Verify navigation to a project\'s details from Kanban View', async ({ page }) => {
        await page.getByRole('button', { name: 'Kanban view' }).click(); // Switch to Kanban View
        const projectCard = page.locator('.kanban-card').first(); // Replace with actual selector for Kanban cards
        await projectCard.click();
        const projectDetailsPage = page.locator('.project-details-title');
        await expect(projectDetailsPage).toBeVisible();
    });

    test('Verify grouping functionality', async ({ page }) => {
        const groupingToggle = page.locator('button:has-text("Make Grouping On")');
        await groupingToggle.click();
        const groupingHeader = page.locator('.grouping-header'); // Replace with actual selector for grouping headers
        await expect(groupingHeader).toBeVisible();
    });

    test('Verify pagination and number of items displayed', async ({ page }) => {
        const itemsCountLocator = page.locator('.table-items-count'); // Replace with actual selector for table item count
        const rows = page.locator('.table-row'); // Replace with the actual selector for table rows
        const itemCountText = await itemsCountLocator.innerText();
        const rowCount = await rows.count();
        expect(rowCount).toBe(parseInt(itemCountText, 10));
    });

    test('Verify view transitions (List, Tile, Kanban)', async ({ page }) => {
        // Check List View
        await page.getByRole('button', { name: 'List view' }).click();
        await expect(page.locator('.list-view')).toBeVisible();

        // Check Tile View
        await page.getByRole('button', { name: 'Tile view' }).click();
        await expect(page.locator('.tile-view')).toBeVisible();

        // Check Kanban View
        await page.getByRole('button', { name: 'Kanban view' }).click();
        await expect(page.locator('.kanban-view')).toBeVisible();
    });
});
