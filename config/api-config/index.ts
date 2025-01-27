import { authServiceConfig } from './auth-service'

export const services = {
  authService: authServiceConfig,
}

export type ServicesType = typeof services
