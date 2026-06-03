'use client'

import { useWizardStore } from '@/lib/wizard-store'

// Shorthand to produce var(--x, fallback)
function v(name: string, fallback: string): string {
  return `var(${name}, ${fallback})`
}

// Hex color → semi-transparent variant for badge backgrounds
function alpha(cssVar: string, fallbackHex: string): string {
  return `color-mix(in srgb, var(${cssVar}, ${fallbackHex}) 18%, transparent)`
}

export function TokenWebDemo() {
  const { customTokens } = useWizardStore()

  // Mount all tokens as CSS custom properties on the root element.
  // Browsers accept "--xxx" in inline style; TS needs the cast.
  const tokenStyle = customTokens as unknown as React.CSSProperties

  // Token aliases with safe fallbacks
  const bg        = v('--color-neutral-bg',        v('--color-bg', '#ffffff'))
  const surface   = v('--color-neutral-elevated',  v('--color-surface', '#f8fafc'))
  const bgSubtle  = v('--color-neutral-bg-subtle', '#f1f5f9')
  const textPri   = v('--color-text-primary',      '#0f172a')
  const textSec   = v('--color-text-secondary',    '#64748b')
  const textTer   = v('--color-text-tertiary',     '#94a3b8')
  const textDis   = v('--color-text-disabled',     '#c0cad6')
  const primary   = v('--color-primary',           '#3b82f6')
  const primaryFg = v('--color-primary-fg',        '#ffffff')
  const border    = v('--color-neutral-border',    '#e2e8f0')
  const success   = v('--color-success',           '#22c55e')
  const error     = v('--color-error',             '#ef4444')
  const warning   = v('--color-warning',           '#f59e0b')
  const info      = v('--color-info',              '#3b82f6')
  const link      = v('--color-link',              '#2563eb')
  const radius    = v('--radius-base',             '8px')

  const sz = (step: string, fb: string) => v(`--font-size-${step}`, fb)
  const lh = (step: string, fb: string) => v(`--line-height-${step}`, fb)

  return (
    <div
      style={tokenStyle}
      className="overflow-hidden rounded-xl border shadow-sm text-[12px] leading-snug select-none"
    >
      {/* ── Navbar ── */}
      <div
        style={{ backgroundColor: primary, color: primaryFg }}
        className="flex items-center justify-between px-4 py-2"
      >
        <div className="flex items-center gap-4">
          {/* Logo mark */}
          <div className="flex items-center gap-1.5">
            <div
              style={{ backgroundColor: primaryFg, borderRadius: '4px' }}
              className="h-5 w-5 opacity-90"
            />
            <span style={{ fontWeight: v('--font-weight-semibold', '600'), fontSize: sz('sm', '13px') }}>
              Brand
            </span>
          </div>
          {/* Nav links */}
          <nav className="flex gap-4">
            {['Home', 'Product', 'Pricing', 'Docs'].map((item, i) => (
              <span
                key={item}
                style={{
                  color: primaryFg,
                  opacity: i === 0 ? 1 : 0.75,
                  fontSize: sz('xs', '12px'),
                  fontWeight: i === 0 ? v('--font-weight-medium', '500') : 'normal',
                  borderBottom: i === 0 ? `1.5px solid ${primaryFg}` : 'none',
                  paddingBottom: i === 0 ? '1px' : '0',
                }}
              >
                {item}
              </span>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <span style={{ color: primaryFg, opacity: 0.8, fontSize: sz('xs', '12px') }}>Log in</span>
          <button
            style={{
              backgroundColor: primaryFg,
              color: primary,
              borderRadius: `calc(${radius} * 0.75)`,
              fontSize: sz('xs', '12px'),
              fontWeight: v('--font-weight-medium', '500'),
              padding: '3px 10px',
            }}
          >
            Sign up
          </button>
        </div>
      </div>

      {/* ── Hero ── */}
      <div style={{ backgroundColor: bg, padding: '18px 16px 14px' }}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h2
              style={{
                color: textPri,
                fontSize: sz('2xl', '22px'),
                lineHeight: lh('2xl', '1.3'),
                fontWeight: v('--font-weight-semibold', '600'),
                marginBottom: '6px',
              }}
            >
              Build excellent user experiences
            </h2>
            <p
              style={{
                color: textSec,
                fontSize: sz('sm', '13px'),
                lineHeight: lh('sm', '1.6'),
                marginBottom: '14px',
                maxWidth: '340px',
              }}
            >
              A unified Design Token system keeps design and development aligned and gives the team a consistent visual language.
            </p>
            <div className="flex items-center gap-2">
              <button
                style={{
                  backgroundColor: primary,
                  color: primaryFg,
                  borderRadius: radius,
                  fontSize: sz('sm', '13px'),
                  fontWeight: v('--font-weight-medium', '500'),
                  padding: '6px 16px',
                  boxShadow: v('--shadow-sm', '0 1px 3px rgba(0,0,0,.12)'),
                }}
              >
                Get started
              </button>
              <button
                style={{
                  backgroundColor: 'transparent',
                  color: textPri,
                  border: `1px solid ${border}`,
                  borderRadius: radius,
                  fontSize: sz('sm', '13px'),
                  padding: '6px 16px',
                }}
              >
                View demo
              </button>
              <a style={{ color: link, fontSize: sz('sm', '13px'), textDecoration: 'underline' }}>
                Learn more →
              </a>
            </div>
          </div>

          {/* Stats card */}
          <div
            style={{
              backgroundColor: surface,
              border: `1px solid ${border}`,
              borderRadius: radius,
              padding: '12px 14px',
              minWidth: '140px',
              boxShadow: v('--shadow-sm', '0 1px 3px rgba(0,0,0,.08)'),
            }}
          >
            <p style={{ color: textTer, fontSize: '11px', marginBottom: '2px' }}>Active users this month</p>
            <p style={{ color: textPri, fontSize: sz('xl', '20px'), fontWeight: v('--font-weight-semibold', '600'), lineHeight: '1.2' }}>
              24,830
            </p>
            <p style={{ color: success, fontSize: '11px', marginTop: '2px' }}>↑ 12.4% vs last month</p>
          </div>
        </div>
      </div>

      {/* ── Cards row ── */}
      <div
        style={{
          backgroundColor: bgSubtle,
          borderTop: `1px solid ${border}`,
          borderBottom: `1px solid ${border}`,
          padding: '12px 16px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '10px',
        }}
      >
        {/* Card: Functional color status */}
        <div
          style={{
            backgroundColor: surface,
            border: `1px solid ${border}`,
            borderRadius: radius,
            padding: '12px',
          }}
        >
          <p style={{ color: textSec, fontSize: '11px', marginBottom: '4px' }}>Order status</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[
              { label: 'Completed', color: success },
              { label: 'Processing', color: info },
              { label: 'Pending confirmation', color: warning },
              { label: 'Refunded', color: error },
            ].map(({ label, color }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: color, flexShrink: 0 }} />
                <span style={{ color: textSec, fontSize: '11px' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card: Form */}
        <div
          style={{
            backgroundColor: surface,
            border: `1px solid ${border}`,
            borderRadius: radius,
            padding: '12px',
          }}
        >
          <p style={{ color: textPri, fontWeight: v('--font-weight-medium', '500'), fontSize: sz('sm', '13px'), marginBottom: '8px' }}>
            Quick login
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <input
              readOnly
              placeholder="Email address"
              style={{
                border: `1px solid ${border}`,
                borderRadius: `calc(${radius} * 0.6)`,
                padding: '4px 8px',
                fontSize: '11px',
                color: textTer,
                backgroundColor: bg,
                width: '100%',
                outline: 'none',
              }}
            />
            <input
              readOnly
              placeholder="Password"
              style={{
                border: `1px solid ${border}`,
                borderRadius: `calc(${radius} * 0.6)`,
                padding: '4px 8px',
                fontSize: '11px',
                color: textTer,
                backgroundColor: bg,
                width: '100%',
                outline: 'none',
              }}
            />
            <button
              style={{
                backgroundColor: primary,
                color: primaryFg,
                borderRadius: `calc(${radius} * 0.6)`,
                padding: '5px 0',
                fontSize: '11px',
                fontWeight: v('--font-weight-medium', '500'),
                width: '100%',
              }}
            >
              Log in
            </button>
          </div>
        </div>

        {/* Card: Typography */}
        <div
          style={{
            backgroundColor: surface,
            border: `1px solid ${border}`,
            borderRadius: radius,
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <p style={{ color: textPri, fontSize: sz('lg', '16px'), fontWeight: v('--font-weight-semibold', '600'), lineHeight: lh('lg', '1.35') }}>
            Heading H2
          </p>
          <p style={{ color: textPri, fontSize: sz('base', '14px'), fontWeight: v('--font-weight-medium', '500'), lineHeight: lh('base', '1.5') }}>
            Body Medium
          </p>
          <p style={{ color: textSec, fontSize: sz('sm', '12px'), lineHeight: lh('sm', '1.6') }}>
            Secondary helper text
          </p>
          <p style={{ color: textTer, fontSize: sz('xs', '11px'), lineHeight: lh('xs', '1.5') }}>
            Tertiary helper text
          </p>
          <p style={{ color: textDis, fontSize: sz('xs', '11px') }}>Disabled state</p>
        </div>
      </div>

      {/* ── Status bar ── */}
      <div
        style={{ backgroundColor: bg, padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {[
            { label: 'Success', cssVar: '--color-success', fb: '#22c55e' },
            { label: 'Error', cssVar: '--color-error',   fb: '#ef4444' },
            { label: 'Warning', cssVar: '--color-warning', fb: '#f59e0b' },
            { label: 'Info', cssVar: '--color-info',    fb: '#3b82f6' },
          ].map(({ label, cssVar, fb }) => (
            <span
              key={label}
              style={{
                backgroundColor: alpha(cssVar, fb),
                color: v(cssVar, fb),
                borderRadius: `calc(${radius} * 0.5)`,
                fontSize: '11px',
                fontWeight: v('--font-weight-medium', '500'),
                padding: '2px 8px',
              }}
            >
              {label}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: textTer, fontSize: '11px' }}>Powered by</span>
          <span style={{ color: link, fontSize: '11px', textDecoration: 'underline' }}>Design Tokens</span>
        </div>
      </div>
    </div>
  )
}
