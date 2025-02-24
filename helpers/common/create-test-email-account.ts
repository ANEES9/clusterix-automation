import nodemailer from 'nodemailer'

export async function createTestEmailAccount() {
  const testAccount = await nodemailer.createTestAccount()
  return {
    user: testAccount.user,
    pass: testAccount.pass,
    smtp: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
  }
}
