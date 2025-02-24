import imaps from 'imap-simple'
import { simpleParser } from 'mailparser'

export async function getPasswordResetLink(user: string, pass: string) {
  const config = {
    imap: {
      user,
      password: pass,
      host: 'imap.ethereal.email', // IMAP server for Ethereal Email
      port: 993,
      tls: true,
      authTimeout: 3000,
    },
  }

  return new Promise<string>(async (resolve, reject) => {
    try {
      const connection = await imaps.connect(config)
      await connection.openBox('INBOX')

      const searchCriteria = ['UNSEEN', ['SUBJECT', 'Reset your password']]
      const fetchOptions = { bodies: [''], markSeen: true }

      const messages = await connection.search(searchCriteria, fetchOptions)
      if (!messages.length) {
        reject('No password reset emails found.')
      }

      const emailBody = await simpleParser(messages[0].parts[0].body)
      const resetLink = emailBody.text?.match(/https?:\/\/[^\s]+/g)?.[0] || ''

      await connection.end()
      resolve(resetLink)
    } catch (error) {
      reject(error)
    }
  })
}
