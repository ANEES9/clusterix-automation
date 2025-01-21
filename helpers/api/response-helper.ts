export class ResponseHelper {
  /**
   * Validates the response status code.
   * @param status - The actual status code returned from the response.
   * @param expectedStatus - The expected status code or array of acceptable status codes.
   */
  static validateStatus(
    status: number,
    expectedStatus: number | number[]
  ): void {
    const isValid = Array.isArray(expectedStatus)
      ? expectedStatus.includes(status)
      : status === expectedStatus

    if (!isValid) {
      throw new Error(
        `Unexpected response status: received ${status}, expected ${
          Array.isArray(expectedStatus)
            ? `one of [${expectedStatus.join(', ')}]`
            : expectedStatus
        }.`
      )
    }
  }

  /**
   * Checks if the response status indicates success.
   * @param status - The actual status code returned from the response.
   */
  static isSuccessStatus(status: number): boolean {
    return status >= 200 && status < 300
  }

  /**
   * Validates if the response status indicates success.
   * @param status - The actual status code returned from the response.
   */
  static ensureSuccessStatus(status: number): void {
    if (!this.isSuccessStatus(status)) {
      throw new Error(`Response status ${status} does not indicate success.`)
    }
  }
}
