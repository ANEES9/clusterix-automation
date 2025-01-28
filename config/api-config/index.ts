import { authServiceConfig } from './auth-service'
import { emailServiceConfig } from 'config/api-config/email-service'

export const services = {
  authService: authServiceConfig,
  emailService: emailServiceConfig,
}

export type ServicesType = typeof services
