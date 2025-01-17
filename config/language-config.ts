import path from 'path'

export const LANGUAGES = ['en', 'de'] as const
export const DEFAULT_LANGUAGE = 'en'

export const getSessionFilePath = (locale: string, env: string = 'testing') => {
  return path.join(
    process.cwd(),
    'sessions',
    `storageState.${env}.${locale}.json`
  )
}

export const getTranslationFilePath = (locale: string, fileName: string) => {
  return path.join(process.cwd(), 'locales', locale, fileName)
}
