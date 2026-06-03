'use client'

import { useWizardStore } from '@/lib/wizard-store'
import { OptionCard } from '@/components/shared/option-card'
import { SectionHeader } from '@/components/shared/section-header'
import type { I18n } from '@/types/wizard'

const FRAMEWORKS = [
  { value: 'nextjs' as const,    label: 'Next.js', description: 'App Router, full-stack React framework' },
  { value: 'react-spa' as const, label: 'React',  description: 'Largest ecosystem, ideal for legacy projects' },
  { value: 'vue' as const,       label: 'Vue',      description: 'Easy to learn, rich ecosystem, mature tooling' },
  { value: 'nuxt' as const,      label: 'Nuxt',     description: 'Full-stack Vue framework with SSR' },
  { value: 'svelte' as const,    label: 'Svelte / SvelteKit', description: 'No virtual DOM, compile-time framework, tiny output' },
]

const LANGUAGES = [
  { value: 'typescript' as const, label: 'TypeScript', description: 'Strict mode, strong type checking' },
  { value: 'javascript' as const, label: 'JavaScript', description: 'JSDoc comments for type inference' },
]

const PKG_MGRS = [
  { value: 'pnpm' as const, label: 'pnpm', description: 'Disk-efficient, the fastest' },
  { value: 'npm' as const, label: 'npm', description: 'Official standard, best compatibility' },
  { value: 'yarn' as const, label: 'Yarn', description: 'Yarn Berry with PnP support' },
  { value: 'bun' as const, label: 'Bun', description: 'Blazing-fast runtime, experimental' },
]

const BUILD_TOOLS = [
  { value: 'vite' as const, label: 'Vite', description: 'Instant HMR, native ESM, the modern default' },
  { value: 'rollup' as const, label: 'Rollup', description: 'Best tree-shaking, ideal for libraries' },
  { value: 'webpack' as const, label: 'Webpack', description: 'Largest ecosystem, ideal for legacy projects' },
  { value: 'none' as const, label: 'Not needed', description: 'Built into the framework (e.g. Next.js Turbopack)' },
]

const I18N_OPTIONS: Record<string, { value: I18n; label: string; description: string }[]> = {
  nextjs: [
    { value: 'next-intl', label: 'next-intl', description: 'First-class Next.js App Router support, type-safe' },
    { value: 'i18next', label: 'i18next', description: 'Universal, most mature ecosystem, plugin-rich' },
    { value: 'none', label: 'Not needed', description: 'Single-language product, no i18n required' },
  ],
  'react-spa': [
    { value: 'i18next', label: 'i18next / react-i18next', description: 'The React go-to, supports plurals/interpolation' },
    { value: 'none', label: 'Not needed', description: 'Single-language product, no i18n required' },
  ],
  vue: [
    { value: 'vue-i18n', label: 'Vue I18n v9', description: 'Officially recommended for Vue 3, Composition API support' },
    { value: 'i18next', label: 'i18next', description: 'Universal, framework-agnostic' },
    { value: 'none', label: 'Not needed', description: 'Single-language product, no i18n required' },
  ],
  nuxt: [
    { value: 'nuxt-i18n', label: '@nuxtjs/i18n', description: 'Official Nuxt module on top of Vue I18n with router integration' },
    { value: 'vue-i18n', label: 'Vue I18n v9', description: 'Manual integration, more flexible' },
    { value: 'none', label: 'Not needed', description: 'Single-language product, no i18n required' },
  ],
  svelte: [
    { value: 'i18next', label: 'i18next', description: 'Universal, pairs well with svelte-i18next' },
    { value: 'none', label: 'Not needed', description: 'Single-language product, no i18n required' },
  ],
}

const TEXT_DIRECTIONS = [
  { value: 'ltr' as const, label: 'LTR', description: 'Left-to-right, used for most languages' },
  { value: 'rtl' as const, label: 'RTL', description: 'Right-to-left, for Arabic, Hebrew, etc.' },
  { value: 'bidi' as const, label: 'LTR + RTL', description: 'Bidirectional, CSS logical properties + dir switching' },
]

export function StepCoreStack() {
  const { framework, language, pkgMgr, buildTool, i18n, textDirection, setField } = useWizardStore()
  const i18nOptions = I18N_OPTIONS[framework] ?? I18N_OPTIONS['react-spa']

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Core Stack"
        subtitle="Pick the project's core framework, language, and toolchain foundation"
      />

      <div>
        <p className="mb-3 text-sm font-medium">Frontend Framework</p>
        <div className="grid grid-cols-2 gap-3">
          {FRAMEWORKS.map((f) => (
            <OptionCard
              key={f.value}
              selected={framework === f.value}
              onClick={() => setField('framework', f.value)}
              label={f.label}
              description={f.description}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium">Language</p>
        <div className="grid grid-cols-2 gap-3">
          {LANGUAGES.map((l) => (
            <OptionCard
              key={l.value}
              selected={language === l.value}
              onClick={() => setField('language', l.value)}
              label={l.label}
              description={l.description}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium">Package Manager</p>
        <div className="grid grid-cols-2 gap-3">
          {PKG_MGRS.map((p) => (
            <OptionCard
              key={p.value}
              selected={pkgMgr === p.value}
              onClick={() => setField('pkgMgr', p.value)}
              label={p.label}
              description={p.description}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium">Build Tool</p>
        <div className="grid grid-cols-2 gap-3">
          {BUILD_TOOLS.map((b) => (
            <OptionCard
              key={b.value}
              selected={buildTool === b.value}
              onClick={() => setField('buildTool', b.value)}
              label={b.label}
              description={b.description}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-1 text-sm font-medium">Internationalization (i18n)</p>
        <p className="mb-3 text-xs text-muted-foreground">Choose whether to support multiple languages, and which library to use</p>
        <div className="grid grid-cols-2 gap-3">
          {i18nOptions.map((opt) => (
            <OptionCard
              key={opt.value}
              selected={i18n === opt.value}
              onClick={() => setField('i18n', opt.value)}
              label={opt.label}
              description={opt.description}
            />
          ))}
        </div>
      </div>

      {i18n !== 'none' && (
        <div>
          <p className="mb-1 text-sm font-medium">Text Direction</p>
          <p className="mb-3 text-xs text-muted-foreground">RTL languages need additional CSS logical properties and layout mirroring</p>
          <div className="grid grid-cols-2 gap-3">
            {TEXT_DIRECTIONS.map((d) => (
              <OptionCard
                key={d.value}
                selected={textDirection === d.value}
                onClick={() => setField('textDirection', d.value)}
                label={d.label}
                description={d.description}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
