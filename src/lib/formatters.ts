/**
 * Currency & Date formatting utilities adhering to European (EUR) standards
 */

export function formatEUR(amount: number, options?: { showSign?: boolean }): string {
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  
  // German locale standard: 1.234.567,89
  const formatted = absAmount.toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (isNegative) {
    return `-€${formatted}`;
  }

  if (options?.showSign && amount > 0) {
    return `+€${formatted}`;
  }

  return `€${formatted}`;
}

export function formatDate(dateString: string): string {
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  
  return d.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function formatFullDate(dateString: string): string {
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;

  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
