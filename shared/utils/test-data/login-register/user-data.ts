export const userData = {
  valid: {
    email: process.env.CLUSTERIX_EMAIL || '',
    password: process.env.CLUSTERIX_PASSWORD || '',
  },
  invalid: {
    emails: [
      'plainaddress', // Missing domain
      '@missingusername.com', // Missing username
      'username@.com', // Missing domain name
      'username@com', // Missing top-level domain
      'username@domain..com', // Double dot in domain
      'username@domain,com', // Invalid character (comma)
      'username@domain.com.', // Trailing dot in domain
      //'username@-domain.com', // Domain starts with a dash (NEED FIX)
      'username@domain..com', // Consecutive dots
      'user name@domain.com', // Space in email
      'username@domain..com', // Double dot
      'username@domain.com (Joe)', // Invalid characters
      'username@domain', // Missing TLD
    ],
    passwords: [
      'short', // Too short
      '12345678', // Numbers only
      'password', // Common weak password
      'Password1', // Common with slight modification
      'Pa$$w0rd', // Predictable variation
      'veryveryverylongpassword', // Too long (if there's a limit)
      '1234!@#$%^', // Special characters only
      'passwordwithnochange', // Predictable phrase
    ],
  },
  empty: {
    emptyEmail: '', // Empty
    emptyPassword: '', // Empty
    oneSpaceEmail: ' ', // One space
    oneSpacePassword: ' ', // One space
    tenSpaceEmail: '          ', // Ten spaces
    tenSpacePassword: '          ', // Ten spaces
  },
}
