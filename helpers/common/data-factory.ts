import { faker } from '@faker-js/faker'

export class DataFactory {
  static createUser() {
    return {
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
  }

  static createProject() {
    return {
      name: faker.company.name(),
      description: faker.lorem.sentence(),
    }
  }
}
