import { APIResponse } from '@playwright/test'

export class ResponseValidator {
  /**
   * Validates the response status and optionally its data.
   * Throws an error if validation fails.
   * @param response - The APIResponse object to validate.
   * @param expectedStatus - The expected HTTP status code(s).
   * @param validateDataFn - An optional function to validate the response data.
   */
  static async validate(
    response: APIResponse,
    expectedStatus: number | number[],
    validateDataFn?: (data: any) => void
  ): Promise<void> {
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
  }
}
