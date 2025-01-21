export function generateRandomFileName(): string {
  // Function to generate a random alphanumeric string of a given length
  const randomString = (length: number): string => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }

  // Generate a random length between 5 and 15
  const randomLength = Math.floor(Math.random() * (15 - 5 + 1)) + 5 // Range: 5 to 15

  // Generate the random file name
  return randomString(randomLength) // Example: abc123
}
