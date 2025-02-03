import { ApiResponse } from 'common/api-response'
import { Page } from 'playwright'
import { emailURLs } from './email-endpoints'

export class FetchRemoteData {
  static async fetchAccountId(page: Page): Promise<string | null> {
    const fetchAccId = await ApiResponse(page, emailURLs.account())
    await console.log(await page.title())

    let matchingItem: any,
      id: string | null = null

    const { status: fetchAccStatus, data: fetchAccData } = await fetchAccId()

    if (fetchAccData) {
      matchingItem = fetchAccData?.find(
        (item: any) => item.ee_email === process.env.CLUSTERIX_EMAIL
      )
      if (matchingItem) {
        id = matchingItem.id
        console.log('Matched ID:', id)
      } else {
        console.log(
          `No matching item found for ee_email = "${process.env.CLUSTERIX_EMAIL}".`
        )
      }
    } else {
      console.log('No data received.')
    }
    return id
    
  }

  static async fetchRemoteId(page: Page, accountId: string | null) {
    if (!accountId) {
      console.error('Account ID is null. Cannot proceed.')
      return null
    }

    const fetchRemoteId = await ApiResponse(page, emailURLs.drafts(accountId))
    const { status: fetchRemoteStatus, data: fetchRemoteData } =
      await fetchRemoteId()

    if (fetchRemoteData?.remote_id) {
      console.log('Fetched Remote ID:', fetchRemoteData.remote_id)
      return fetchRemoteData.remote_id
    } else {
      console.log('No remote ID received.')
      return null
    }
  }

  static async sendEmail(
    page: Page,
    accountId: string | null,
    remoteId: string | null
  ) {
    if (!remoteId) {
      console.error('Remote ID is null. Cannot proceed with email sending.')
      return null
    }
    if (!accountId) {
      console.error('Account ID is null. Cannot proceed with email sending.')
      return null
    }

    const sendURL = await ApiResponse(
      page,
      emailURLs.submit(accountId, remoteId)
    )
    const { status: sendURLStatus, data: sendURLData } = await sendURL()

    console.log('Email Send Status:', sendURLStatus)
    return sendURLStatus
  }

  static async fetchSignatureSettings(page: Page, accountId: string | null) {
    if (!accountId) {
      console.error('Account ID is null. Cannot fetch signature settings.')
      return null
    }
    const fetchSetting = await ApiResponse(page, emailURLs.signature(accountId))
    const { status: fetchSettingStatus, data: fetchSettingData } =
      await fetchSetting()

    console.log('Fetch Signature Settings Status:', fetchSettingStatus)
    return fetchSettingStatus
  }

  static async fetchMailboxStatus(page: Page, accountId: string | null) {
    if (!accountId) {
        console.error('Account ID is null. Cannot fetch mailbox status.');
        return null;
    }
    
    const fetchMailBox = await ApiResponse(page, emailURLs.mailBox(accountId));
    const { status: fetchMailBoxStatus, data: fetchMailBoxData } = await fetchMailBox();
    
    console.log('Fetch Mailbox Status:', fetchMailBoxStatus);
    return fetchMailBoxStatus;
}


}
