import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { loginAndSaveSession } from '../../helpers/auth-helper';

const sessionFilePath = path.join('sessions', `storageState.${process.env.NODE_ENV}.json`);

test('Login and save session to storageState', async ({ page }) => {
    if (fs.existsSync(sessionFilePath)) {
        fs.unlinkSync(sessionFilePath);
    }
    await loginAndSaveSession(page);
    expect(fs.existsSync(sessionFilePath)).toBeTruthy();
    const sessionData = JSON.parse(fs.readFileSync(sessionFilePath, 'utf-8'));
    expect(sessionData.cookies.length).toBeGreaterThan(0);
    console.log('Session saved and verified:', sessionData);
});
