export interface TestSetupConfig {
  global: {
    skipSurvey: boolean
    skipTimer: boolean
    skipProductTour: boolean
    skipTutorial: boolean
  }
  folders: Record<
    string,
    {
      skipSurvey: boolean
      skipTimer: boolean
      skipProductTour: boolean
      skipTutorial: boolean
    }
  >
  files: Record<
    string,
    {
      skipSurvey: boolean
      skipTimer: boolean
      skipProductTour: boolean
      skipTutorial: boolean
    }
  >
}

export const testSetupConfig: TestSetupConfig = {
  global: {
    skipSurvey: true,
    skipTimer: true,
    skipProductTour: true,
    skipTutorial: true,
  },
  folders: {
    accounting: {
      skipSurvey: true,
      skipTimer: true,
      skipProductTour: true,
      skipTutorial: true,
    },
    auth: {
      skipSurvey: false,
      skipTimer: false,
      skipProductTour: false,
      skipTutorial: false,
    },
    home: {
      skipSurvey: true,
      skipTimer: true,
      skipProductTour: true,
      skipTutorial: true,
    },
  },
  files: {
    'home/survey.spec.ts': {
      skipSurvey: false,
      skipTimer: false,
      skipProductTour: false,
      skipTutorial: false,
    },
  },
}
