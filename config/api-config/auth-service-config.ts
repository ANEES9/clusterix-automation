export const authServiceConfig = {
  apiUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://api.innoscripta.com/auth'
      : 'https://api-testing.innoscripta.com/auth',
  endpoints: {
    login: '/login',
    logout: '/logout',
  },
} as const // Use `as const` to ensure TypeScript treats the object as a literal type
