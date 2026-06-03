'use client'

import { useEffect } from 'react'
import { useWizardStore } from '@/lib/wizard-store'
import { SectionHeader } from '@/components/shared/section-header'
import { THEME_PRESETS, FUNCTIONAL_TOKEN_DEFS, NEUTRAL_TOKEN_DEFS, isColorValue } from '@/lib/theme-tokens'
import { contrastRatio, getWcagLevel, wcagBadgeClass } from '@/lib/wcag-utils'
import { computeScale, SCALE_META } from '@/lib/typography-utils'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import type { DesignToken, NeutralTokenDef } from '@/lib/theme-tokens'
import type { TypographyScale } from '@/types/wizard'
import { TokenWebDemo } from '@/components/wizard/token-web-demo'

// ── Theme card ────────────────────────────────────────────────────────────────

function ThemeCard({ preset, selected, onClick }: {
  preset: typeof THEME_PRESETS[number]
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={preset.bestFor}
      className={cn(
        'relative flex flex-col gap-1.5 rounded-lg border bg-card p-2.5 text-left transition-all hover:shadow-sm',
        selected ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/40',
      )}
    >
      {selected && (
        <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-2.5 w-2.5" />
        </span>
      )}
      {/* Palette */}
      <div className="flex gap-0.5">
        {preset.palette.map((color, i) => (
          <div
            key={i}
            className="h-4 flex-1 rounded-sm border border-black/10"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <div className="pr-5">
        <div className="flex items-center gap-1">
          <span className="text-[9px] text-muted-foreground/50">#{preset.no}</span>
          <p className="text-[11px] font-semibold leading-tight truncate">{preset.name}</p>
        </div>
        <p className="text-[9px] text-muted-foreground leading-snug line-clamp-1">{preset.bestFor}</p>
      </div>
    </button>
  )
}

// ── Token row ─────────────────────────────────────────────────────────────────

function TokenRow({ token, value, onChange }: {
  token: DesignToken
  value: string
  onChange: (v: string) => void
}) {
  const isColor = isColorValue(value)

  return (
    <tr className="border-b last:border-0 group">
      <td className="py-2 pr-3 align-middle">
        <p className="text-xs font-medium pl-4">{token.label}</p>
        <p className="text-[10px] text-muted-foreground font-mono pl-4">{token.cssVar}</p>
      </td>
      <td className="py-2 align-middle">
        <div className="flex items-center gap-2">
          {isColor && (
            <div className="relative">
              <div
                className="h-7 w-7 rounded-md border border-black/20 cursor-pointer overflow-hidden"
                style={{ backgroundColor: value }}
              >
                <input
                  type="color"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                />
              </div>
            </div>
          )}
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={cn(
              'h-7 rounded-md border bg-background px-2 text-xs font-mono',
              'focus:outline-none focus:ring-1 focus:ring-primary',
              isColor ? 'w-28' : 'w-48',
            )}
          />
        </div>
      </td>
    </tr>
  )
}

// ── Neutral color row ─────────────────────────────────────────────────────────

const NEUTRAL_GROUP_LABELS: Record<string, string> = {
  text: 'Text Layer',
  bg: 'Background Layer',
  border: 'Borders & Dividers',
}

function NeutralRow({ def, value, bgValue, onChange }: {
  def: NeutralTokenDef
  value: string
  bgValue: string   // theme bg color for contrast calculation
  onChange: (v: string) => void
}) {
  const isColor = isColorValue(value)
  const isBgColor = isColorValue(bgValue)
  const isTextToken = def.group === 'text' && def.wcagTarget !== undefined
  const ratio = (isColor && isBgColor && isTextToken) ? contrastRatio(value, bgValue) : 0
  const level = ratio > 0 ? getWcagLevel(ratio, def.wcagTarget === '3:1') : null

  return (
    <tr className="border-b last:border-0">
      <td className="py-2 pl-3 pr-2 align-middle w-8">
        {isColor && (
          <div className="relative">
            <div className="h-6 w-6 rounded border border-black/10 shrink-0" style={{ backgroundColor: value }} />
            <input type="color" value={isColor ? value : '#888888'} onChange={e => onChange(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer w-6 h-6" />
          </div>
        )}
      </td>
      <td className="py-2 pr-2 align-middle">
        <p className="text-xs font-medium leading-tight">{def.label}</p>
        <p className="text-[9px] text-muted-foreground">{def.hint}</p>
      </td>
      <td className="py-2 pr-3 align-middle">
        <input type="text" value={value} onChange={e => onChange(e.target.value)}
          className="h-7 w-32 rounded border bg-background px-2 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-primary" />
      </td>
      <td className="py-2 pr-3 align-middle w-24">
        {level && def.wcagTarget !== 'decorative' ? (
          <div className="flex items-center gap-1">
            <span className={cn('rounded px-1.5 py-0.5 text-[10px] font-semibold', wcagBadgeClass(level))}>
              {level}
            </span>
            <span className="text-[9px] text-muted-foreground">{ratio}:1</span>
          </div>
        ) : def.wcagTarget === 'decorative' ? (
          <span className="text-[9px] text-muted-foreground">Decorative</span>
        ) : null}
      </td>
    </tr>
  )
}

// ── Main step ─────────────────────────────────────────────────────────────────

const SPACING_OPTIONS = [
  { value: 4 as const, label: '4px base' },
  { value: 8 as const, label: '8px base' },
]

const CONVENTION_OPTIONS = [
  { value: 'css-vars' as const, label: 'CSS Variables' },
  { value: 'js-object' as const, label: 'JS Object' },
  { value: 'both' as const, label: 'Both' },
]

export function StepDesignTokens() {
  const {
    themeStyle, customTokens, spacingBase, tokenConvention, typographyScale,
    setTheme, setToken, setField, setTypographyScale,
  } = useWizardStore()

  useEffect(() => {
    if (Object.keys(customTokens).length === 0) {
      setTheme(themeStyle)
    }
  }, [customTokens, setTheme, themeStyle])

  const currentPreset = THEME_PRESETS.find(p => p.id === themeStyle) ?? THEME_PRESETS[0]

  // Computed typography scale (from customTokens or re-computed)
  const typoSteps = computeScale(typographyScale)

  return (
    <div className="flex gap-8 items-start">
      {/* ── Left column: all editable content ── */}
      <div className="flex-1 min-w-0 max-w-[640px] space-y-8">
      <SectionHeader
        title="Design Tokens Standards"
        subtitle="Choose a theme style, then adjust each token value as needed"
      />

      {/* Theme style selection */}
      <div>
        <p className="mb-3 text-sm font-medium">Theme Style</p>
        <div className="grid grid-cols-3 gap-2">
          {THEME_PRESETS.map((preset) => (
            <ThemeCard
              key={preset.id}
              preset={preset}
              selected={themeStyle === preset.id}
              onClick={() => setTheme(preset.id)}
            />
          ))}
        </div>
      </div>

      {/* Functional Colors */}
      <div>
        <div className="mb-1 flex items-baseline gap-2">
          <p className="text-sm font-medium">Functional Colors</p>
          <span className="text-[10px] text-muted-foreground">Follow user color expectations: green=success, red=error, yellow=warning, blue=info/link</span>
        </div>
        <p className="mb-3 text-[11px] text-muted-foreground">
          Keep functional colors consistent across the product system to avoid disrupting user expectations
        </p>
        <div className="grid grid-cols-5 gap-2">
          {FUNCTIONAL_TOKEN_DEFS.map((def) => {
            const value = customTokens[def.cssVar] ?? '#888888'
            const isColor = isColorValue(value)
            return (
              <div key={def.cssVar} className="flex flex-col gap-1.5 rounded-lg border bg-card p-3">
                {/* Color swatch */}
                <div className="relative">
                  <div
                    className="h-10 w-full rounded-md border border-black/10"
                    style={{ backgroundColor: value }}
                  />
                  {isColor && (
                    <input
                      type="color"
                      value={value}
                      onChange={(e) => setToken(def.cssVar, e.target.value)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-md"
                      title={`Click to choose color — ${def.hint}`}
                    />
                  )}
                </div>
                {/* Label */}
                <p className="text-[11px] font-semibold text-center">{def.label}</p>
                <p className="text-[9px] text-muted-foreground text-center leading-tight">{def.hint}</p>
                {/* Input */}
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setToken(def.cssVar, e.target.value)}
                  className="w-full rounded border bg-muted/50 px-1.5 py-1 text-[10px] font-mono text-center focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {/* CSS var */}
                <p className="text-[9px] text-muted-foreground font-mono text-center truncate">{def.cssVar}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Neutral Colors */}
      <div>
        <div className="mb-1 flex items-baseline gap-2">
          <p className="text-sm font-medium">Neutral Colors</p>
          <span className="text-[10px] text-muted-foreground">
            Text must meet WCAG 2.0: body &gt;= 4.5:1 (AA), large text &gt;= 3:1 (AA Large)
          </span>
        </div>
        <p className="mb-3 text-[11px] text-muted-foreground">
          Define values for both dark and light backgrounds; contrast is calculated live against the page background
        </p>
        <div className="rounded-lg border overflow-hidden">
          {(['text', 'bg', 'border'] as const).map((group) => {
            const defs = NEUTRAL_TOKEN_DEFS.filter(d => d.group === group)
            const bgToken = customTokens['--color-neutral-bg'] ?? '#ffffff'
            return (
              <div key={group}>
                <div className="border-b bg-muted/30 px-3 py-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {NEUTRAL_GROUP_LABELS[group]}
                  </span>
                </div>
                <table className="w-full">
                  <tbody>
                    {defs.map((def) => (
                      <NeutralRow
                        key={def.cssVar}
                        def={def}
                        value={customTokens[def.cssVar] ?? '#888888'}
                        bgValue={bgToken}
                        onChange={(v) => setToken(def.cssVar, v)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )
          })}
        </div>
      </div>

      {/* Typography Standards */}
      <div>
        <div className="mb-1 flex items-baseline gap-2">
          <p className="text-sm font-medium">Typography Standards</p>
          <span className="text-[10px] text-muted-foreground">
            Type scale and line height define the rhythm and order of the typography system
          </span>
        </div>
        <p className="mb-4 text-[11px] text-muted-foreground">
          Font weights usually use Regular 400 and Medium 500; use Semibold 600 for bold English text.
          Keep body text and background contrast above 7:1 (WCAG AAA).
        </p>

        {/* Type scale selection */}
        <p className="mb-2 text-xs font-medium">Type Scale Ratio</p>
        <div className="mb-5 grid grid-cols-2 gap-2">
          {(Object.keys(SCALE_META) as TypographyScale[]).map((key) => {
            const meta = SCALE_META[key]
            return (
              <button
                key={key}
                type="button"
                onClick={() => setTypographyScale(key)}
                className={cn(
                  'flex flex-col gap-0.5 rounded-lg border px-3 py-2.5 text-left transition-colors',
                  typographyScale === key
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border text-muted-foreground hover:border-primary/40',
                )}
              >
                <span className="text-xs font-semibold font-mono">{meta.label}</span>
                <span className="text-[10px] leading-tight">{meta.desc}</span>
              </button>
            )
          })}
        </div>

        {/* Type Scale x Line Height Table */}
        <p className="mb-2 text-xs font-medium">Type Scale & Line Height</p>
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="py-2 pl-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground w-12">Level</th>
                <th className="py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground w-16">Font Size</th>
                <th className="py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground w-12">Line Height</th>
                <th className="py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground w-20">Usage</th>
                <th className="py-2 pr-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Preview</th>
              </tr>
            </thead>
            <tbody>
              {typoSteps.map((step) => {
                const tokenVal = customTokens[step.cssVar]
                const displaySize = tokenVal ? parseFloat(tokenVal) : step.size
                const isHeading = ['4xl', '3xl', '2xl', 'xl', 'lg'].includes(step.step)
                return (
                  <tr key={step.step} className="border-b last:border-0">
                    <td className="py-2 pl-3 align-middle">
                      <span className="text-xs font-mono text-muted-foreground">{step.step}</span>
                    </td>
                    <td className="py-2 align-middle">
                      <input
                        type="text"
                        value={tokenVal ?? `${step.size}px`}
                        onChange={e => setToken(step.cssVar, e.target.value)}
                        className="h-6 w-16 rounded border bg-background px-1.5 text-[11px] font-mono focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </td>
                    <td className="py-2 align-middle">
                      <span className="text-[11px] font-mono text-muted-foreground">{step.lineHeight}</span>
                    </td>
                    <td className="py-2 align-middle">
                      <span className="text-[10px] text-muted-foreground leading-tight max-w-[80px] block">{step.usage.split(',')[0]}</span>
                    </td>
                    <td className="py-2 pr-3 align-middle overflow-hidden max-w-[140px]">
                      <span
                        className="block truncate text-foreground"
                        style={{
                          fontSize: Math.min(displaySize, isHeading ? 28 : 16),
                          lineHeight: step.lineHeight,
                          fontWeight: isHeading ? 600 : 400,
                        }}
                      >
                        {isHeading ? 'Typography Standards' : 'Typography Standards Typography'}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Font weight */}
        <p className="mt-5 mb-2 text-xs font-medium">Font Weight Standards</p>
        <div className="rounded-lg border overflow-hidden">
          {[
            { weight: 400, var: '--font-weight-regular', label: 'Regular', note: 'Body text, descriptions, table data' },
            { weight: 500, var: '--font-weight-medium',  label: 'Medium',  note: 'Secondary emphasis, labels, button text' },
            { weight: 600, var: '--font-weight-semibold', label: 'Semibold', note: 'Headings, bold English text, important actions' },
          ].map(({ weight, var: cssVar, label, note }, i, arr) => (
            <div key={cssVar} className={cn('flex items-center gap-4 px-4 py-3', i < arr.length - 1 && 'border-b')}>
              <div className="w-20 shrink-0">
                <span className="text-xs font-mono text-muted-foreground">{label}</span>
                <span className="ml-1.5 text-[10px] text-muted-foreground/60">{weight}</span>
              </div>
              <p className="flex-1 text-sm" style={{ fontWeight: weight }}>
                Typography Sample Aa Bb Cc - Latin layout
              </p>
              <span className="text-[10px] text-muted-foreground shrink-0 max-w-[120px] text-right leading-tight">{note}</span>
            </div>
          ))}
        </div>

        {/* Contrast validation */}
        {(() => {
          const textPrimary = customTokens['--color-text-primary']
          const textSecondary = customTokens['--color-text-secondary']
          const bg = customTokens['--color-neutral-bg']
          if (!textPrimary || !bg) return null
          const r1 = contrastRatio(textPrimary, bg)
          const r2 = textSecondary ? contrastRatio(textSecondary, bg) : 0
          const l1 = getWcagLevel(r1)
          const l2 = r2 > 0 ? getWcagLevel(r2) : null
          return (
            <div className="mt-4">
              <p className="mb-2 text-xs font-medium">Contrast Validation (Text vs Background)</p>
              <div className="rounded-lg border overflow-hidden divide-y text-xs">
                <div className="flex items-center gap-3 px-4 py-2.5">
                  <div className="flex gap-1.5 items-center shrink-0">
                    <div className="h-4 w-4 rounded-sm border border-black/10" style={{ backgroundColor: textPrimary }} />
                    <div className="h-4 w-4 rounded-sm border border-black/10" style={{ backgroundColor: bg }} />
                  </div>
                  <span className="flex-1 text-muted-foreground">Body / heading text color vs background color</span>
                  <span className={cn('rounded px-1.5 py-0.5 text-[10px] font-semibold', wcagBadgeClass(l1))}>{l1}</span>
                  <span className="w-10 text-right font-mono text-muted-foreground">{r1}:1</span>
                  <span className={cn('text-[10px]', r1 >= 7 ? 'text-emerald-600' : 'text-amber-600')}>
                    {r1 >= 7 ? '✓ AAA 7:1' : `Must be >= 7:1`}
                  </span>
                </div>
                {l2 && (
                  <div className="flex items-center gap-3 px-4 py-2.5">
                    <div className="flex gap-1.5 items-center shrink-0">
                      <div className="h-4 w-4 rounded-sm border border-black/10" style={{ backgroundColor: textSecondary }} />
                      <div className="h-4 w-4 rounded-sm border border-black/10" style={{ backgroundColor: bg }} />
                    </div>
                    <span className="flex-1 text-muted-foreground">Secondary text color vs background color</span>
                    <span className={cn('rounded px-1.5 py-0.5 text-[10px] font-semibold', wcagBadgeClass(l2))}>{l2}</span>
                    <span className="w-10 text-right font-mono text-muted-foreground">{r2}:1</span>
                    <span className={cn('text-[10px]', r2 >= 4.5 ? 'text-emerald-600' : 'text-amber-600')}>
                      {r2 >= 4.5 ? '✓ AA 4.5:1' : 'Must be >= 4.5:1'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )
        })()}
      </div>

      {/* Brand token edit table */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-medium">Brand Colors & Structural Tokens</p>
          <span className="text-[10px] text-muted-foreground">
            Click a swatch to open the color picker
          </span>
        </div>
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="py-2 pl-3 pr-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground w-40">Token</th>
                <th className="py-2 pr-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {currentPreset.tokens.map((token) => (
                <TokenRow
                  key={token.cssVar}
                  token={token}
                  value={customTokens[token.cssVar] ?? token.value}
                  onChange={(v) => setToken(token.cssVar, v)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional configuration */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="mb-2 text-sm font-medium">Spacing Base</p>
          <div className="flex gap-2">
            {SPACING_OPTIONS.map(o => (
              <button
                key={o.value}
                type="button"
                onClick={() => setField('spacingBase', o.value)}
                className={cn(
                  'flex-1 rounded-md border px-3 py-2 text-xs transition-colors',
                  spacingBase === o.value
                    ? 'border-primary bg-primary/5 text-primary font-medium'
                    : 'border-border text-muted-foreground hover:border-primary/40',
                )}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">Naming Convention</p>
          <div className="flex gap-2">
            {CONVENTION_OPTIONS.map(o => (
              <button
                key={o.value}
                type="button"
                onClick={() => setField('tokenConvention', o.value)}
                className={cn(
                  'flex-1 rounded-md border px-2 py-2 text-xs transition-colors',
                  tokenConvention === o.value
                    ? 'border-primary bg-primary/5 text-primary font-medium'
                    : 'border-border text-muted-foreground hover:border-primary/40',
                )}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      </div>{/* end left column */}

      {/* ── Right column: live web demo, sticky while the page scrolls ── */}
      <div className="sticky top-8 w-[50%] shrink-0">
        <p className="mb-1.5 text-sm font-medium">Live Web Preview</p>
        <p className="mb-3 text-[10px] text-muted-foreground">Adjust any token and the preview updates instantly</p>
        <TokenWebDemo />
      </div>
    </div>
  )
}
