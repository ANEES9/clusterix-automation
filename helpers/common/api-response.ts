import { Page } from '@playwright/test'
import { getEnvBasedUrl } from './get-api-url'

export async function ApiResponse(
  page: Page,
  apiProdUrl: string,
  apiTestUrl?: string
) {
  const apiUrl = getEnvBasedUrl(apiProdUrl, apiTestUrl)
  console.log(apiUrl)
  let status: number | null = null
  let data: any = null

  // Intercept the API request
  await page.route(apiUrl, async (route) => {
    console.log('Intercepting API Request:', apiUrl)
    route.continue() // Allow the request to proceed
  })

  // Wait for the API response
  const response = await page.waitForResponse(
    (response) =>
      response.url() === apiUrl &&
      response.status() >= 200 &&
      response.status() < 600,
    { timeout: 80000 } // Adjust the timeout as needed
  )

  if (response) {
    try {
      // Capture the status
      status = response.status()
      console.log('API Response Status:', status)

      // Extract the JSON response body (if applicable)
      data = await response.json().then((res) => res?.data || null)
      console.log('API Response Body:', data)
    } catch (error) {
      console.error('Error processing API response:', error)
    }
  } else {
    console.error('No response received for the API call.')
  }

  return () => ({
    status,
    data,
  })
}
