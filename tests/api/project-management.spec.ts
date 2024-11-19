import { test, expect, APIRequestContext } from '@playwright/test'
import { getAccessTokenFromStorageState } from '../../helpers/auth-helper'

test.describe('Project Management API Tests', () => {
  let apiContext: APIRequestContext
  let accessToken: string

  test.beforeAll(async ({ playwright }) => {
    accessToken = await getAccessTokenFromStorageState()
    console.log('Access Token:', accessToken)
    apiContext = await playwright.request.newContext({
      baseURL: 'https://ims-customers.innoscripta.com/api',
      extraHTTPHeaders: {
        accept: 'application/json',
        authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'partner-id': '10679',
        timezone: 'Europe/Istanbul',
      },
    })
  })
  test('Create a new project via API', async () => {
    const payload = {
      type_id: '5',
      short_title: 'Test Automation',
      title:
        'Test automation project management project creation with API request',
      started_at: '2024-01-01',
      finished_at: '2025-12-31',
    }
    const response = await apiContext.post('/projects', {
      data: payload,
    })
    console.log('Response Status:', response.status())

    if (
      response.status() === 204 ||
      !(await response.body()).toString().trim()
    ) {
      console.error('Response body is empty or not JSON!')
    } else {
      const responseBody = await response.json()
      console.log('Response Body:', responseBody)
    }
    const rawResponse = await response.text()
    console.log('Raw Response:', rawResponse)

    expect(response.status()).toBe(201)
    const responseBody = await response.json()
    console.log('Response Body:', responseBody)
    expect(responseBody).toHaveProperty('id')
    expect(responseBody.title).toBe(payload.title)
    expect(responseBody.short_title).toBe(payload.short_title)
  })

  test.afterAll(async () => {
    await apiContext.dispose()
  })
})
