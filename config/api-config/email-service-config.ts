export const emailServiceConfig = {
  apiUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://email-controller.innoscripta.com/api'
      : 'https://email-controller-testing.innoscripta.com/api',
  endpoints: {
    getDrafts: '/account-data/:id/email/drafts',
    sendDraft: '/account-data/:id/email/drafts/:remoteId/submit',
    fetchAccount: '/account',
    fetchRemoteId: '/account-data/:id/email/drafts',
  },
}
