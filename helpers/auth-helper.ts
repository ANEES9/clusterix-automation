import { Page, BrowserContext } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

const env = process.env.NODE_ENV || 'production';
dotenv.config({ path: `.env.${env}` });

const sessionFilePath = path.join('sessions', `storageState.${env}.json`);
const tokenFilePath = path.join('sessions', `authToken.${env}.json`);

export async function loginAndSaveSession(page: Page) {
    await page.goto(process.env.BASE_URL || '');

    await page.getByRole('button', { name: 'Login' }).nth(1).click();
    await page.getByPlaceholder('Email').fill(process.env.EMAIL || '');
    await page.getByPlaceholder('Password').fill(process.env.PASSWORD || '');
    await page.locator('div').filter({ hasText: /^Login$/ }).first().click();

    await page.waitForURL(`${process.env.BASE_URL}`);
    console.log('Login successful.');

    await page.context().storageState({ path: sessionFilePath });
    console.log(`Session saved to: ${sessionFilePath}`);
}

export async function loginAndSaveToken(page: Page) {
    let token: string | null = null;

    page.on('response', async (response) => {
        if (response.url().includes('/api/login') && response.status() === 200) {
            const responseBody = await response.json();
            token = responseBody.token || responseBody.accessToken;
        }
    });

    await page.goto(process.env.BASE_URL || '');
    await page.getByRole('button', { name: 'Login' }).nth(1).click();
    await page.getByPlaceholder('Email').fill(process.env.EMAIL || '');
    await page.getByPlaceholder('Password').fill(process.env.PASSWORD || '');
    await page.locator('div').filter({ hasText: /^Login$/ }).first().click();

    await page.waitForURL(`${process.env.BASE_URL}`);
    console.log('Login successful.');

    if (token) {
        fs.writeFileSync(tokenFilePath, JSON.stringify({ token }, null, 2));
        console.log(`Token saved to: ${tokenFilePath}`);
    } else {
        console.warn('Token not found during login.');
    }
}
