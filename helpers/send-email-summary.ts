import nodemailer from 'nodemailer'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

const readSummary = (): any => {
  const resultsPath = 'allure-report/widgets/summary.json'
  if (!fs.existsSync(resultsPath)) {
    console.error('Test summary not found!')
    return null
  }
  return JSON.parse(fs.readFileSync(resultsPath, 'utf8'))
}

async function sendEmail() {
  const summary = readSummary()

  if (!summary) {
    console.error('Test summary could not be read!')
    return
  }

  const total = summary.statistic.total
  const passed = summary.statistic.passed
  const failed = summary.statistic.failed
  const broken = summary.statistic.broken
  const skipped = summary.statistic.skipped
  const duration = (summary.time.duration / 1000).toFixed(2)

  const htmlContent = `
    <h2 style="color:#9869e0;">🚀 Clusterix Automation Test Results</h2>
    <p>Hey Team,</p>
    <p>This is <b>Büşra</b> speaking 🌟</p>
    <p>Here’s what went down in the latest test execution:</p>
    <ul>
      <li><b>Total Tests:</b> ${total}</li>
      <li><b style="color:green;">Passed:</b> ${passed}</li>
      <li><b style="color:red;">Failed:</b> ${failed}</li>
      <li><b style="color:orange;">Broken:</b> ${broken}</li>
      <li><b style="color:grey;">Skipped:</b> ${skipped}</li>
      <li><b>Duration:</b> ${duration} seconds</li>
    </ul>
    <p>🎯 Looks like we survived another round of testing!</p>
    <p>For those who enjoy digging into the juicy details (developers), here’s your link to the full report:</p>
    <p>
      <a href="https://clusterix-automation.innoscripta.com/allure-docker-service-ui/signin" style="color:blue;">
        Allure Report - Click Here to Relive the Drama 🤡
      </a>
    </p>
  `
  console.log('EMAIL_USER:', process.env.EMAIL_USER)
  console.log('EMAIL_PASS:', process.env.EMAIL_PASS)
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const mailOptions = {
    from: `"QA Team" <${process.env.EMAIL_USER}>`,
    to: 'b.ozturk@innoscripta.com',
    subject: '📢 Clusterix Automation Test Results',
    html: htmlContent,
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', info.response)
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

sendEmail()
