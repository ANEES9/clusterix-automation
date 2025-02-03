const env = process.env.NODE_ENV === 'production' ? '' : '-testing'

const endpoint = `https://email-controller${env}.innoscripta.com/api`

export const emailURLs = {
  account: () => `${endpoint}/account`,
  drafts: (id: string) => `${endpoint}/account-data/${id}/email/drafts`,
  submit: (id: string, remote_id: string) => `${endpoint}/account-data/${id}/email/drafts/${remote_id}/submit`,
  signature: (id: string) => `${endpoint}/account-data/${id}/settings?keys[]=signature`,
  mailBox: (id: string) => `${endpoint}/account-data/${id}/mailbox`,
} as const
