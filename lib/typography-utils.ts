export type TypographyScale = 'minor-third' | 'major-third' | 'perfect-fourth' | 'major-sixth'

export const SCALE_META: Record<TypographyScale, { ratio: number; label: string; desc: string }> = {
  'minor-third':   { ratio: 1.2,   label: 'Minor Third  ×1.2',  desc: 'Compact, data-dense UI' },
  'major-third':   { ratio: 1.25,  label: 'Major Third  ×1.25', desc: 'Balanced, general-purpose default' },
  'perfect-fourth':{ ratio: 1.333, label: 'Perfect Fourth  ×1.333',desc: 'Strong hierarchy for content-heavy products' },
  'major-sixth':   { ratio: 1.5,   label: 'Major Sixth  ×1.5',  desc: 'Expressive, brand/marketing oriented' },
}

// Powers relative to base (16px); positive enlarges, negative reduces
const STEP_EXP: [string, number, number, string][] = [
  // [step, exp, lineHeight, usage]
  ['4xl',  5, 1.1,  'Super heading, hero area'],
  ['3xl',  4, 1.15, 'Page title H1'],
  ['2xl',  3, 1.2,  'Section heading H2'],
  ['xl',   2, 1.3,  'Subsection H3 / card title'],
  ['lg',   1, 1.4,  'Supporting heading H4'],
  ['base', 0, 1.5,  'Default body, high readability'],
  ['sm',  -1, 1.5,  'Secondary descriptive text'],
  ['xs',  -2, 1.6,  'Labels, notes, helper information'],
]

export interface TypographyStep {
  step: string
  cssVar: string
  size: number        // px
  sizeRem: string
  lineHeight: number
  usage: string
}

export function computeScale(scale: TypographyScale, basePx = 16): TypographyStep[] {
  const ratio = SCALE_META[scale].ratio
  return STEP_EXP.map(([step, exp, lh, usage]) => {
    const size = Math.round(basePx * Math.pow(ratio, exp) * 10) / 10
    return {
      step,
      cssVar: `--font-size-${step}`,
      size,
      sizeRem: `${(size / basePx).toFixed(3).replace(/\.not0+$/, '')}rem`,
      lineHeight: lh,
      usage,
    }
  })
}

export function getTypographyTokens(scale: TypographyScale): Record<string, string> {
  const steps = computeScale(scale)
  const tokens: Record<string, string> = {}
  for (const s of steps) {
    tokens[`--font-size-${s.step}`] = `${s.size}px`
    tokens[`--line-height-${s.step}`] = String(s.lineHeight)
  }
  tokens['--font-weight-regular']  = '400'
  tokens['--font-weight-medium']   = '500'
  tokens['--font-weight-semibold'] = '600'
  return tokens
}

export const TYPOGRAPHY_CSS_VARS = [
  ...STEP_EXP.map(([step]) => `--font-size-${step}`),
  ...STEP_EXP.map(([step]) => `--line-height-${step}`),
  '--font-weight-regular', '--font-weight-medium', '--font-weight-semibold',
]
