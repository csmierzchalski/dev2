/**
 * Formats a numeric amount as GBP using UK English locale rules.
 */
export function formatGbp(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount);
}
