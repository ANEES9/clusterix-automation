import { authServiceConfig } from './auth-service-config'
import { emailServiceConfig } from 'config/api-config/email-service-config'

export const services = {
  authService: authServiceConfig,
  emailService: emailServiceConfig,
}

export type ServicesType = typeof services
