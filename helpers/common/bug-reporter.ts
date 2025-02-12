import axios from 'axios'
import FormData from 'form-data'
import { applicationConfig } from 'config/application-config'
import * as dotenv from 'dotenv'
dotenv.config()

export async function reportBug(
  description: string,
  applicationSlug: keyof typeof applicationConfig,
  reportType: string,
  screenshotBuffer?: Buffer
) {
  const config = applicationConfig[applicationSlug]
  if (!config) {
    throw new Error(`Invalid application slug: ${applicationSlug}`)
  }

  const formData = new FormData()
  formData.append('description', description)
  formData.append('application_id', config.application_id.toString())
  formData.append('user_id', config.user_id.toString())
  formData.append('report_type', reportType)

  if (screenshotBuffer) {
    formData.append('screenshot', screenshotBuffer, 'screenshot.png')
  }

  try {
    await axios.post(process.env.BUG_REPORT_API!, formData, {
      headers: {
        authorization: `Bearer ${process.env.BUG_REPORT_TOKEN}`,
        ...formData.getHeaders(),
      },
    })
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Axios error occurred - Status: ${error.response?.status}, Data: ${JSON.stringify(error.response?.data)}`
      )
    } else {
      throw error
    }
  }
}
