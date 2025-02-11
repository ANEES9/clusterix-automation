import { faker } from '@faker-js/faker'
import { IBAN_LENGTHS } from 'config/iban-lengths'

/**
 * DataFactory provides utility methods for generating random data.
 * These methods can be used in tests to create realistic mock data.
 */
export class DataFactory {
  /**
   * Generates a mock user object with random email and password.
   * @returns {Object} User object with email and password
   * Example: { email: "john.doe@example.com", password: "password123" }
   */
  static createUser() {
    return {
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
  }

  /**
   * Generates a mock project object with random name and description.
   * @returns {Object} Project object with name and description
   * Example: { name: "Tech Innovations Inc.", description: "A groundbreaking project." }
   */
  static createProject() {
    return {
      name: faker.company.name(),
      description: faker.lorem.sentence(),
    }
  }

  /**
   * Generates a random file name with a random file extension.
   * @returns {string} Random file name
   * Example: "document.pdf"
   */
  static createFileName() {
    return faker.system.fileName()
  }

  /**
   * Generates a random file name with the specified length and a random file extension.
   * @param {number} length - The length of the random string (default is 10)
   * @returns {string} Random file name with specified length
   * Example: "A1b2C3d4E5f6G7H8.json"
   */
  static createRandomFileName(length: number = 10): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return `${result}.${faker.system.commonFileExt()}` // Adds a random file extension
  }

  /**
   * Generates a valid IBAN based on the given country code.
   * @param {string} countryCode - The country code (e.g., "DE", "FR", "ES").
   * @returns {string} A valid IBAN for the given country.
   */
  static generateIBAN(countryCode: string): string {
    countryCode = countryCode.toUpperCase()

    if (!IBAN_LENGTHS[countryCode]) {
      throw new Error(`Unsupported country code: ${countryCode}`)
    }

    // Calculate IBAN body length (excluding country code + check digits)
    const totalLength = IBAN_LENGTHS[countryCode]
    const bodyLength = totalLength - countryCode.length - 2

    // Generate a random IBAN body
    const randomNumbers = faker.string.numeric(bodyLength)

    // Generate a random check digit (01-99)
    const checkDigits = String(faker.number.int({ min: 10, max: 99 }))

    return `${countryCode}${checkDigits}${randomNumbers}`
  }
}
