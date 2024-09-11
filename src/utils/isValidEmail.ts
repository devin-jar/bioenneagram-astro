/**
 * Validates if the provided string is a valid email address.
 * 
 * @param email - The email address to validate.
 * @returns A boolean indicating whether the email is valid.
 */
export function isValidEmail(email: string): boolean {
  // Regular expression for validating email addresses
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test the email against the regular expression
  return emailRegex.test(email);
}