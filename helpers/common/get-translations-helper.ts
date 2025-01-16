import * as path from 'path'
import * as fs from 'fs'

/**
 * Get translations for a specific namespace and locale.
 * @param namespace - The namespace (e.g., 'login') to fetch.
 * @param locale - The locale (e.g., 'en', 'de').
 * @returns The translation object for the given namespace and locale.
 */
export const getTranslations = (
  namespace: string,
  locale: string
): Record<string, any> => {
  const translationsPath = path.resolve(
    process.cwd(),
    `locales/${locale}/${namespace}-translation.json`
  )

  if (!fs.existsSync(translationsPath)) {
    throw new Error(
      `Translations not found for namespace "${namespace}" and locale "${locale}"`
    )
  }

  return JSON.parse(fs.readFileSync(translationsPath, 'utf-8'))
}
