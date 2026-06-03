/** Calculate WCAG 2.0 relative luminance */
function relativeLuminance(hex: string): number {
  const clean = hex.replace('#', '')
  if (clean.length < 6) return 0
  const r = parseInt(clean.slice(0, 2), 16) / 255
  const g = parseInt(clean.slice(2, 4), 16) / 255
  const b = parseInt(clean.slice(4, 6), 16) / 255
  const toLinear = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
}

/** Calculate two-color contrast (WCAG 2.0) */
export function contrastRatio(fg: string, bg: string): number {
  if (!fg.startsWith('#') || !bg.startsWith('#')) return 0
  const l1 = relativeLuminance(fg)
  const l2 = relativeLuminance(bg)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return Math.round(((lighter + 0.05) / (darker + 0.05)) * 10) / 10
}

/** WCAG 2.0 compliance level */
export type WcagLevel = 'AAA' | 'AA' | 'AA Large' | 'Fail'

export function getWcagLevel(ratio: number, largeText = false): WcagLevel {
  if (ratio >= 7) return 'AAA'
  if (ratio >= 4.5) return 'AA'
  if (ratio >= 3 && largeText) return 'AA Large'
  return 'Fail'
}

export function wcagBadgeClass(level: WcagLevel): string {
  return {
    AAA: 'bg-emerald-100 text-emerald-700',
    AA: 'bg-blue-100 text-blue-700',
    'AA Large': 'bg-amber-100 text-amber-700',
    Fail: 'bg-red-100 text-red-600',
  }[level]
}
