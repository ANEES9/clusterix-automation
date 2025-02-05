import { test } from '@playwright/test'
import { Allure } from 'common/allure-helper' // Import Allure
import * as dotenv from 'dotenv'
import { addCursorStyleAndScript } from 'common/cursor-helper'
import { skipSurveyHelper } from 'common/skip-survey-helper'
import { skipProductTourHelper } from 'common/skip-product-tour-helper'
import { skipTimerHelper } from 'common/skip-timer-helper'
import { EmailPage, Setting } from 'pages/email'

const env = process.env.NODE_ENV || 'production'
dotenv.config({ path: `.env.${env}` })

test.describe('Email Setting UI Validation', () => {
  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    await Allure.step(
      'Navigate to Base URL, Close Popups and navigate to Email application',
      async () => {
        const emailPage = new EmailPage(page, 'en')
        await page.goto(baseURL!)
        await addCursorStyleAndScript(page)
        await skipSurveyHelper(page, testInfo)
        await skipProductTourHelper(page, testInfo)
        await page.waitForTimeout(4000)
        await skipTimerHelper(page, testInfo)
        await page.waitForLoadState('networkidle')

        //Navigateion to Email Application
        await emailPage.navigateToEmail()
        await page.waitForLoadState('networkidle')
        await console.log(await page.title())
        await page.waitForTimeout(15000)
      }
    )
  })

  test('General Setting section UI Validation', async ({ page }) => {
    const emailSettingPage = new Setting(page, 'en')
    const emailPage = new EmailPage(page, 'en')
    Allure.addSeverity('normal')
    Allure.addTag('smoke')
    Allure.addDescription(
      'Validating the UI elements of the General Settings section. This test ensures that all necessary components, such as account details, preferences, and theme settings, are correctly displayed and interactable.'
    )
    await Allure.step('Step 1: Verify and Click on Settings', async () => {
      await emailPage.verifySettingButton()
      await emailPage.clickOnSettings()
      Allure.addAttachment(
        'Setting report',
        'Setting is visiable and able to click. Navigate to Settings page'
      )
    })
    await Allure.step(
      'Step 2: Verify and Click on General Setting',
      async () => {
        await emailSettingPage.verifyGeneralSettingButton()
        await emailSettingPage.clickGeneralSettingButton()
        Allure.addAttachment(
          'General Setting report',
          'General Setting is visiable and able to click. Navigate to General Settings page'
        )
      }
    )

    await Allure.step(
      'Step 3: Verify General setting and their sub options are visible',
      async () => {
        await emailSettingPage.verifyGeneralTab()
        await Allure.step(
          'Step 3.1: Verify Last Select Signature is visible',
          async () => {
            await emailSettingPage.verifyLastSelectedSignature()
            await emailSettingPage.verifyAlwaysUseLastSelected()
          }
        )
        await Allure.step(
          'Step 3.2: Verify Conversation view is visible',
          async () => {
            await emailSettingPage.verifyConversationView()
            await emailSettingPage.verifyShowEmailsAsConversations()
          }
        )
        await Allure.step(
          'Step 3.3: Verify Lazy Loading is visible',
          async () => {
            await emailSettingPage.verifyLazyLoadEmails()
            await emailSettingPage.verifyToggleLazyLoadingEmails()
          }
        )
        await Allure.addAttachment(
          'General setting and their sub options report',
          'General setting and their sub options is visiable'
        )
      }
    )

    await Allure.step(
      'Step 4: Verify Export Attachments section are visible',
      async () => {
        await Allure.step(
          'Step 4.1: Verify Export Attachments heading section are visible',
          async () => {
            await emailSettingPage.verifyExportAttachments()
          }
        )
        await Allure.step(
          'Step 4.2: Verify Export Attachments info section are visible',
          async () => {
            await emailSettingPage.verifyExportAttachmentsInfo()
          }
        )
        await Allure.step(
          'Step 4.3: Verify Export Attachments button are visible',
          async () => {
            await emailSettingPage.verifyemailFirst()
          }
        )
        await Allure.addAttachment(
          'Export Attachments section report',
          'Export Attachments section is visiable'
        )
      }
    )
    await Allure.step(
      'Step 5: Verify Mailbox section are visible',
      async () => {
        await Allure.step(
          'Step 5.1: Verify Mailbox heading section are visible',
          async () => {
            await emailSettingPage.verifyMailbox()
          }
        )
        await Allure.step(
          'Step 5.2: Verify Mailbox info section are visible',
          async () => {
            await emailSettingPage.verifyForceRefresh()
            await emailSettingPage.verifyForceRefreshInfo()
          }
        )
        await Allure.step(
          'Step 5.3: Verify Force Refresh Mailbox button are visible',
          async () => {
            await emailSettingPage.verifyRefreshButton()
            await emailSettingPage.clickRefreshButton()
          }
        )
        await Allure.addAttachment(
          'Mailbox section report',
          'Mailbox section is visiable'
        )
      }
    )
    await Allure.step(
      'Step 6: Verify Default Search section are visible',
      async () => {
        await Allure.step(
          'Step 6.1: Verify Default Search heading section are visible',
          async () => {
            await emailSettingPage.verifyDefaultSearchBy()
          }
        )
        await Allure.step(
          'Step 6.2: Verify Default Search info section are visible',
          async () => {
            await emailSettingPage.verifyChooseDefaultSearch()
          }
        )
        await Allure.step(
          'Step 6.3: Verify Default Search dropdown are visible',
          async () => {
            await emailSettingPage.verifyChooseDefaultSearchDropdown()
          }
        )
        await Allure.addAttachment(
          'Default Search section report',
          'Default Search section is visiable'
        )
      }
    )

    await Allure.step(
      'Step 7: Verify Default Search section are visible',
      async () => {
        await Allure.step(
          'Step 7.1: Verify Default Search heading section are visible',
          async () => {
            await emailSettingPage.verifyRememberLastActions()
          }
        )
        await Allure.step(
          'Step 7.2: Verify Remember last opened message section are visible',
          async () => {
            await emailSettingPage.verifyRememberLastOpenedMessage()
            await emailSettingPage.verifyRememberLastOpenedInfo()
          }
        )
        await Allure.step(
          'Step 7.3: Verify Remember last draft section are visible',
          async () => {
            await emailSettingPage.verifyRememberLastDraft()
            await emailSettingPage.verifyRememberLastDraftInfo()
          }
        )
        await Allure.addAttachment(
          'Default Search section report',
          'Default Search section is visiable'
        )
      }
    )

    await Allure.step(
      'Step 8: Verify Keyboard Shortcuts section are visible',
      async () => {
        await emailSettingPage.verifyKeyboardShortcuts()
        await emailSettingPage.verifyCreateNewMessageShift()
        await emailSettingPage.verifyReplyEmailShift()
        await emailSettingPage.verifyReplyAllShift()
        await emailSettingPage.verifyForwardMessageShift()
        await emailSettingPage.verifySendEmailCtrlEnter()
        await emailSettingPage.verifyDeleteMessage()
        Allure.addAttachment(
          'Keyboard Shortcuts section report',
          'Keyboard Shortcuts section is visiable'
        )
      }
    )
  })

  test('Compose and Reply Setting section page UI Validation', async ({
    page,
  }) => {
    const emailSettingPage = new Setting(page, 'en')
    const emailPage = new EmailPage(page, 'en')
    Allure.addSeverity('normal')
    Allure.addTag('smoke')
    Allure.addDescription(
      'Verifying the UI elements of the Compose and Reply Settings section. This test ensures that all text fields, formatting options, reply preferences, and signature settings are properly displayed and functional.'
    )
    await Allure.step('Step 1: Verify and Click on Settings', async () => {
      await emailPage.verifySettingButton()
      await emailPage.clickOnSettings()
      await Allure.addAttachment(
        'Setting report',
        'Setting is visiable and able to click. Navigate to Settings page'
      )
    })
    await Allure.step(
      'Step 2: Verify and Click on Compose and Reply Setting',
      async () => {
        await emailSettingPage.verifyComposeAndReply()
        await emailSettingPage.navigateToComposeAndReply()
        await Allure.addAttachment(
          'Compose and Reply Setting report',
          'Compose and Reply Setting is visiable and able to click. Navigate to Compose and Reply Settings page'
        )
      }
    )
    await Allure.step('Step 3: Verify Signature Tab', async () => {
      await Allure.step(
        'Step 3.1: Verify Signatures Tab and Manage signatureis button is visible',
        async () => {
          await emailSettingPage.verifySignaturesTab()
          await emailSettingPage.verifyManageSignaturesButton()
        }
      )
      await Allure.step(
        'Step 3.2: Verify Company Signature Munich',
        async () => {
          await emailSettingPage.verifyCompanySignatureMunich()
        }
      )
      await Allure.step(
        'Step 3.3: Verify Company Signature Vienna',
        async () => {
          await emailSettingPage.verifyCompanySignatureVienna()
        }
      )
      await Allure.step(
        'Step 3.4: Verify Company Signature Cologne',
        async () => {
          await emailSettingPage.verifyCompanySignatureCologne()
        }
      )
      await Allure.step(
        'Step 3.5: Verify Company Signature Turkey',
        async () => {
          await emailSettingPage.verifyCompanySignatureTurkey()
        }
      )
      await Allure.step(
        'Step 3.6: Verify Company Signature Paris',
        async () => {
          await emailSettingPage.verifyCompanySignatureParis()
        }
      )
      await Allure.step('Step 3.7: Verify Company Signature UK', async () => {
        await emailSettingPage.verifyCompanySignatureUK()
      })
      await Allure.addAttachment(
        'Signature Tab report',
        'Signature Tab is visiable'
      )
    })
    await Allure.step('Step 4. Verify and Click on Templates Tab', async () => {
      await Allure.step(
        'Step 4.1: Verify Templates Tab and Manage Templates button is visible',
        async () => {
          await emailSettingPage.verifyTemplatesTab()
          await emailSettingPage.verifyManageTemplatesButton()
        }
      )
      await emailSettingPage.verifySetYourTemplates()
      Allure.addAttachment('Templates Tab report', 'Templates Tab is visiable')
    })
    await Allure.step('5: Verify Delay Sending Emails', async () => {
      await emailSettingPage.verifyDelaySendingEmails()
      await emailSettingPage.verifyEmailDelayOptions()
    })
  })

  test('AI Helper section UI Validation', async ({ page }) => {
    const emailSettingPage = new Setting(page, 'en')
    const emailPage = new EmailPage(page, 'en')
    Allure.addSeverity('normal')
    Allure.addTag('smoke')
    Allure.addDescription(
      'Ensuring the correct display and functionality of the AI Helper section UI. This test validates the visibility of AI-related options, response suggestions, AI-generated email features, and user customization settings.'
    )
    await Allure.step('Step 1: Verify and Click on Settings', async () => {
      await emailPage.verifySettingButton()
      await emailPage.clickOnSettings()
      await Allure.addAttachment(
        'Setting report',
        'Setting is visiable and able to click. Navigate to Settings page'
      )
    })
    await Allure.step(
      'Step 2: Verify and Click on AI Helper Setting',
      async () => {
        await emailSettingPage.verifyAIHelperButton()
        await emailSettingPage.clickAIHelperButton()
        await Allure.addAttachment(
          'AI Helper report',
          'AI Helper is visiable and able to click. Navigate to AI Helper page'
        )
      }
    )

    await Allure.step(
      'Step 3: Verify Automatic AI Reply Preparation section is visible',
      async () => {
        await emailSettingPage.verifyAutomaticAIReplyPreparation()
        await emailSettingPage.verifyAIFeatureDescription()
        await emailSettingPage.verifyEmailInAutomaticAIReplyPreparation()
        await Allure.addAttachment(
          'Automatic AI Reply Preparation section Report',
          'Automatic AI Reply Preparation section is visible'
        )
      }
    )
    await Allure.step(
      'Step 4: Verify Automatic Event Detection is visible',
      async () => {
        await emailSettingPage.verifyAutomaticEventDetection()
        await emailSettingPage.verifyDetectCalendarEvents()
        await emailSettingPage.verifyAIEventFromText()
        await emailSettingPage.verifyOnViewAIEventFromText()
        await Allure.addAttachment(
          'Automatic Event Detection section Report',
          'Automatic Event Detection section is visible'
        )
      }
    )
    await Allure.step(
      'Step 5: Verify Automatic AI Contact is visible',
      async () => {
        await emailSettingPage.verifyAutomaticAIContact()
        await emailSettingPage.verifyEmailInAutomaticAIContact()
        await Allure.addAttachment(
          'Automatic AI Contact section Report',
          'Automatic AI Contact section is visible'
        )
      }
    )
  })

  test('Automation Reply section UI Validation', async ({ page }) => {
    const emailSettingPage = new Setting(page, 'en')
    const emailPage = new EmailPage(page, 'en')
    Allure.addSeverity('normal')
    Allure.addTag('smoke')
    Allure.addDescription(
      'Verifying the UI elements in the Automatic Reply Settings section. This test ensures the correct display and interactivity of automatic reply configurations, scheduling options, and custom reply messages.'
    )
    await Allure.step('Step 1: Verify and Click on Settings', async () => {
      await emailPage.verifySettingButton()
      await emailPage.clickOnSettings()
      await Allure.addAttachment(
        'Setting report',
        'Setting is visiable and able to click. Navigate to Settings page'
      )
    })

    await Allure.step(
      'Step 2: Verify and Click on Automatic Replies Setting',
      async () => {
        await emailSettingPage.verifyAutomaticRepliesButton()
        await emailSettingPage.clickAutomaticRepliesButton()
        await Allure.addAttachment(
          'Automatic Replies report',
          'Automatic Replies is visiable and able to click. Navigate to Automatic Replies page'
        )
      }
    )

    await Allure.step('Step 3: Verify Automatic Replies buttons', async () => {
      await emailSettingPage.verifyAutomaticRepliesHeading()
      await emailSettingPage.verifyAutomaticRepliesSubHeading()
      await Allure.addAttachment(
        'Automatic Replies Verification',
        'Both Automatic Replies buttons are visible'
      )
    })

    await Allure.step('Step 4: Verify Use Automatic Replies text', async () => {
      await emailSettingPage.verifyUseAutomaticRepliesText()
      await Allure.addAttachment(
        'Use Automatic Replies Verification',
        '"Use automatic replies to let" text is visible'
      )
    })

    await Allure.step('Step 5: Verify and Check General Checkbox', async () => {
      await emailSettingPage.verifyGeneralCheckbox()
      await emailSettingPage.checkGeneralCheckbox()
      await Allure.addAttachment(
        'General Checkbox Verification',
        'General checkbox is visible and checked'
      )
    })

    await Allure.step('Step 6: Verify Send Replies text', async () => {
      await emailSettingPage.verifySendRepliesText()
      await Allure.addAttachment(
        'Send Replies Verification',
        '"Send replies only during a" text is visible'
      )
    })

    await Allure.step(
      'Step 7: Verify and Check Specific Time Period Checkbox',
      async () => {
        await emailSettingPage.verifySpecificTimePeriodCheckbox()
        await emailSettingPage.checkSpecificTimePeriodCheckbox()
        await Allure.addAttachment(
          'Specific Time Period Checkbox Verification',
          'Specific time period checkbox is visible'
        )
      }
    )

    await Allure.step('Step 8: Verify Start and End Time Buttons', async () => {
      await emailSettingPage.verifyStartTimeButton()
      await emailSettingPage.verifyEndTimeButton()
      await Allure.addAttachment(
        'Time Buttons Verification',
        'Start Time and End Time buttons are visible'
      )
    })

    await Allure.step(
      'Step 9: Verify Set Automatic Reply Dropdown',
      async () => {
        await emailSettingPage.verifySetAutomaticReplyDropdown()
        await Allure.addAttachment(
          'Set Automatic Reply Dropdown Verification',
          'Set Automatic Reply dropdown is visible'
        )
      }
    )

    await Allure.step('Step 10: Verify No Delay Option', async () => {
      await emailSettingPage.verifyNoDelayOption()
      await Allure.addAttachment(
        'No Delay Option Verification',
        'No Delay option is visible in dropdown'
      )
    })

    await Allure.step(
      'Step 11: Verify Automatic Reply Mail Heading',
      async () => {
        await emailSettingPage.verifyAutomaticReplyMailHeading()
        await Allure.addAttachment(
          'Automatic Reply Mail Heading Verification',
          'Automatic Reply Mail heading is visible'
        )
      }
    )

    await Allure.step('Step 12: Verify Subject Field', async () => {
      await emailSettingPage.verifySubjectField()
      await Allure.addAttachment(
        'Subject Field Verification',
        'Subject field is visible'
      )
    })

    await Allure.step('Step 13: Verify Text Box', async () => {
      await emailSettingPage.verifyTextBox()
      await Allure.addAttachment('Text Box Verification', 'Text box is visible')
    })

    await Allure.step('Step 14: Verify Save Button', async () => {
      await emailSettingPage.verifySaveButton()
      await Allure.addAttachment(
        'Save Button Verification',
        'Save button is visible'
      )
    })
  })

  test('Automatic Action section UI Validation', async ({ page }) => {
    const emailSettingPage = new Setting(page, 'en')
    const emailPage = new EmailPage(page, 'en')
    Allure.addSeverity('normal')
    Allure.addTag('smoke')
    Allure.addDescription(
      'Validating the UI layout and elements in the Automatic Actions section. This test checks the presence and functionality of automated email actions, rule configurations, and email sorting options.'
    )
    const moveInvitationEmailSelectText = `${process.env.CLUSTERIX_EMAIL}${process.env.CLUSTERIX_EMAIL}`
    emailSettingPage.emailListItemLocator = process.env.CLUSTERIX_EMAIL || ''
    emailSettingPage.moveInvitationEmailSelectTextocator =
      moveInvitationEmailSelectText

    await Allure.step('Step 1: Verify and Click on Settings', async () => {
      await emailPage.verifySettingButton()
      await emailPage.clickOnSettings()
      await Allure.addAttachment(
        'Setting report',
        'Setting is visiable and able to click. Navigate to Settings page'
      )
    })

    await Allure.step(
      'Step 2: Verify and Click Automatic Actions Button',
      async () => {
        await emailSettingPage.verifyAutomaticActionsButton()
        await emailSettingPage.clickAutomaticActionsButton()
        await Allure.addAttachment(
          'Automatic Actions Button Verification',
          'Automatic Actions button is visible and clicked'
        )
      }
    )

    await Allure.step('Step 3: Verify Quick Actions Text', async () => {
      await emailSettingPage.verifyQuickActionsText()
      await Allure.addAttachment(
        'Quick Actions Text Verification',
        '"Quick Actions" text is visible'
      )
    })

    await Allure.step('Step 4: Verify New Quick Action Button', async () => {
      await emailSettingPage.verifyNewQuickActionButton()
      await Allure.addAttachment(
        'New Quick Action Button Verification',
        '"New Quick Action" button is visible'
      )
    })

    await Allure.step('Step 5: Verify Quick Actions Start Text', async () => {
      await emailSettingPage.verifyQuickActionsStartText()
      await Allure.addAttachment(
        'Quick Actions Start Text Verification',
        '"Quick actions will start" text is visible'
      )
    })

    await Allure.step('Step 6: Verify Select Your Account Text', async () => {
      await emailSettingPage.verifySelectYourAccountText()
      await Allure.addAttachment(
        'Select Your Account Text Verification',
        '"Select your account" text is visible'
      )
    })

    await Allure.step(
      'Step 7: Verify and Click Quick Action Dropdown Indicator',
      async () => {
        await emailSettingPage.verifyQuickActionDropdownIndicator()
        await emailSettingPage.clickQuickActionDropdownIndicator()
        await Allure.addAttachment(
          'Quick Action Dropdown Indicator Verification',
          'Dropdown indicator is visible and clicked'
        )
      }
    )

    await Allure.step('Step 8: Verify and Click Email List Item', async () => {
      await emailSettingPage.verifyEmailListItem()
      await emailSettingPage.clickEmailListItem()
      await Allure.addAttachment(
        'Email List Item Verification',
        '"bhat@innoscripta.com" email is visible in the list and clicked'
      )
    })

    await Allure.step('Step 9: Verify No Quick Actions Text', async () => {
      await emailSettingPage.verifyNoQuickActionsText()
      await Allure.addAttachment(
        'No Quick Actions Text Verification',
        '"You haven\'t created any quick" text is visible'
      )
    })

    await Allure.step(
      'Step 10: Verify Move Invitation Emails Text',
      async () => {
        await emailSettingPage.verifyMoveInvitationEmailsText()
        await Allure.addAttachment(
          'Move Invitation Emails Text Verification',
          '"Move Invitation Emails" text is visible'
        )
      }
    )

    await Allure.step(
      'Step 11: Verify Move Invitation Email Select Text',
      async () => {
        await emailSettingPage.verifymoveInvitationEmailSelectText()
        await Allure.addAttachment(
          'Move Invitation Email Select Text Verification',
          'Logged-in user’s email ID is visible in Move Invitation Emails section'
        )
      }
    )

    await Allure.step(
      'Step 12: Verify and Check Move Invitation Email Checkbox',
      async () => {
        await emailSettingPage.verifyMoveInvitationEmailCheckbox()
        await page.waitForTimeout(2000)
        await emailSettingPage.checkMoveInvitationEmailCheckbox()
        await Allure.addAttachment(
          'Move Invitation Email Checkbox Verification',
          'Move Invitation Email checkbox is visible and checked'
        )
      }
    )

    await Allure.step(
      'Step 13: Verify Move Invitation Email Select Option',
      async () => {
        await emailSettingPage.verifyMoveInvitationEmailSelectOption()
        await Allure.addAttachment(
          'Move Invitation Email Select Option Verification',
          'Dropdown option is visible'
        )
      }
    )

    await Allure.step(
      'Step 14: Verify Move Invitation Email Dropdown',
      async () => {
        await emailSettingPage.verifyMoveInvitationEmailDropdown()
        await Allure.addAttachment(
          'Move Invitation Email Dropdown Verification',
          '"Please select" placeholder text is visible'
        )
      }
    )
  })
})
