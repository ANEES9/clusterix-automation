import { test, expect, request } from '@playwright/test';

test.describe('Project Management API - Project Creation', () => {
    let apiContext;

    test.beforeAll(async ({ playwright }) => {
        apiContext = await playwright.request.newContext({
            baseURL: 'https://ims-customers.innoscripta.com/api',
            extraHTTPHeaders: {
                accept: 'application/json',
                authorization: 'Bearer YOUR_ACCESS_TOKEN',
            },
        });
    });

    test('Create a new project via API', async () => {
        const payload = {
            type_id: '5',
            short_title: 'Test Automation',
            title: 'Test automation project management project creation with API request',
            started_at: '2024-01-01',
            finished_at: '2025-12-31',
        };
        const response = await apiContext.post('/projects', {
            data: payload,
        });
        expect(response.status()).toBe(201);
        const responseBody = await response.json();
        console.log(responseBody);

        expect(responseBody).toHaveProperty('id');
        expect(responseBody.title).toBe(payload.title);
        expect(responseBody.short_title).toBe(payload.short_title);
    });

    test.afterAll(async () => {
        await apiContext.dispose();
    });
});
