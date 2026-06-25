export interface TestSetupConfig {
  global: {
    skipSurvey: boolean
    skipTimer: boolean
    skipProductTour: boolean
    skipTutorial: boolean
    skipWelcome: boolean
  }
  folders: Record<
    string,
    {
      skipSurvey: boolean
      skipTimer: boolean
      skipProductTour: boolean
      skipTutorial: boolean
      skipWelcome: boolean
    }
  >
  files: Record<
    string,
    {
      skipSurvey: boolean
      skipTimer: boolean
      skipProductTour: boolean
      skipTutorial: boolean
      skipWelcome: boolean
    }
  >
}

export const testSetupConfig: TestSetupConfig = {
  global: {
    skipSurvey: true,
    skipTimer: true,
    skipProductTour: true,
    skipTutorial: true,
    skipWelcome: true,
  },
  folders: {
    landing: {
      skipSurvey: false,
      skipTimer: false,
      skipProductTour: false,
      skipTutorial: false,
      skipWelcome: false,
    },
    'login-register': {
      skipSurvey: false,
      skipTimer: false,
      skipProductTour: false,
      skipTutorial: false,
      skipWelcome: false,
    },
  },
  files: {
    'tests/home/survey.spec.ts': {
      skipSurvey: false, // Explicitly override for this file
      skipTimer: false,
      skipProductTour: false,
      skipTutorial: false,
      skipWelcome: false,
    },
  },
}
