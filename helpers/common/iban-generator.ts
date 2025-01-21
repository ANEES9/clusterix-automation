export function generateRandomGermanIBAN(): string {
  const country = 'DE'
  const bankCode = Math.floor(10000000 + Math.random() * 90000000).toString() // 8-digit bank code
  const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000)
    .toString()
    .padStart(10, '0') // 10-digit account number

  // Placeholder for checksum
  const placeholderIban = `${bankCode}${accountNumber}${convertLettersToNumbers(country)}00`

  // Calculate checksum
  const checksum = BigInt(98) - (BigInt(placeholderIban) % BigInt(97))
  const checksumStr = checksum.toString().padStart(2, '0')

  // Return the final IBAN
  return `${country}${checksumStr}${bankCode}${accountNumber}`
}

// Helper function to convert letters to numbers
function convertLettersToNumbers(input: string): string {
  return input
    .split('')
    .map((char) => (char.charCodeAt(0) - 55).toString()) // 'A' = 10, 'B' = 11, ..., 'Z' = 35
    .join('')
}
