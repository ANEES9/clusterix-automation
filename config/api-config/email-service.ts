export const authServiceConfig = {
  apiUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://email-controller.innoscripta.com/api'
      : 'https://email-controller-testing.innoscripta.com/api',
  endpoints: {
    login: '/login',
    logout: '/logout',
  },
} as const
