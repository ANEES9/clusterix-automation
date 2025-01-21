import { faker } from '@faker-js/faker'
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
}
