import { Locator, Page } from '@playwright/test'

export class UIResponseValidator {
  /**
   * Clicks a button, waits for a specific API response, and validates the response.
   * @param page - The Playwright page instance.
   * @param button - The Locator for the button to click.
   * @param responseUrl - The URL to match for the API response.
   * @param expectedStatus - The expected HTTP status code(s).
   * @param validateDataFn - Optional function to validate the response data.
   * @returns {Promise<APIResponse>} - Returns the APIResponse object for further use.
   */
  static async validate(
    page: Page,
    button: Locator,
    responseUrl: string,
    expectedStatus: number | number[],
    validateDataFn?: (data: any) => void
  ): Promise<Response> {
    // Ensure the button is visible and enabled
    if (!(await button.isVisible())) {
      throw new Error('Button is not visible')
    }
    if (!(await button.isEnabled())) {
      throw new Error('Button is not enabled')
    }

    console.log(`Clicking button and waiting for response: ${responseUrl}`)
    const [response] = await Promise.all([
      page.waitForResponse(
        (res) => res.url().includes(responseUrl),
        { timeout: 60000 } // Increased timeout
      ),
      button.click(),
    ])

    // Check the HTTP status code
    const actualStatus = response.status()
    const isValidStatus = Array.isArray(expectedStatus)
      ? expectedStatus.includes(actualStatus)
      : actualStatus === expectedStatus

    if (!isValidStatus) {
      throw new Error(
        `Unexpected response status: received ${actualStatus}, expected ${
          Array.isArray(expectedStatus)
            ? `one of [${expectedStatus.join(', ')}]`
            : expectedStatus
        }.`
      )
    }

    // Extract and validate the response data if a validation function is provided
    const responseData = await response.json()
    if (validateDataFn) {
      try {
        validateDataFn(responseData)
      } catch (error) {
        throw new Error(
          `Response data validation failed: ${(error as Error).message}`
        )
      }
    }

    return response
  }
}
