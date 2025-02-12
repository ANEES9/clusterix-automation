export function generateRandomIBAN(country: string, bankCode: string): string {
  const countryDetails: { [key: string]: number } = {
    NL: 10, // Netherlands account number length
    DE: 10, // Germany account number length
    FR: 11, // France account number length
    GB: 14, // UK account number length
  }

  if (!countryDetails[country]) {
    throw new Error(`Country ${country} is not supported for IBAN generation.`)
  }

  const accountNumberLength = countryDetails[country]
  let accountNumber: string

  while (true) {
    // Generate a random account number of the correct length
    accountNumber = Math.floor(
      Math.pow(10, accountNumberLength - 1) +
        Math.random() * 9 * Math.pow(10, accountNumberLength - 1)
    )
      .toString()
      .padStart(accountNumberLength, '0')

    // Placeholder IBAN without checksum
    const placeholderIban = `${bankCode}${accountNumber}${convertLettersToNumbers(country)}00`

    // Calculate checksum
    const checksum = BigInt(98) - (BigInt(placeholderIban) % BigInt(97))
    const checksumStr = checksum.toString().padStart(2, '0')

    // Construct the IBAN
    const iban = `${country}${checksumStr}${bankCode}${accountNumber}`

    // Validate the IBAN
    if (validateIban(iban)) {
      return iban // Return the valid IBAN
    }
  }
}

// Helper function to validate an IBAN
function validateIban(iban: string): boolean {
  // Rearrange the IBAN
  const rearranged = iban.slice(4) + iban.slice(0, 4)

  // Replace letters with numbers
  const numericIban = rearranged
    .split('')
    .map((char) => (isNaN(Number(char)) ? char.charCodeAt(0) - 55 : char))
    .join('')

  // Perform MOD-97 calculation
  return BigInt(numericIban) % BigInt(97) === BigInt(1)
}

// Helper function to convert letters to numbers
function convertLettersToNumbers(input: string): string {
  return input
    .split('')
    .map((char) => (char.charCodeAt(0) - 55).toString()) // 'A' = 10, 'B' = 11, ..., 'Z' = 35
    .join('')
}
