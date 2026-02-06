/** Format a coin amount with locale separators (e.g. 1,299) */
export function formatCoins(amount: number): string {
  return amount.toLocaleString("en-US");
}
