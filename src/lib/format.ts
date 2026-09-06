export function formatThousandsInput(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 15);
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function parseAmountInput(value: string): number {
  const n = parseFloat(value.replace(/[\.,]/g, ""));
  return isFinite(n) ? n : 0;
}

export function parsePercentageInput(value: string): number {
  const n = parseFloat(value.replace(",", "."));
  return isFinite(n) ? n : 0;
}

export function formatTRY(value: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("tr-TR").format(Math.round(value));
}