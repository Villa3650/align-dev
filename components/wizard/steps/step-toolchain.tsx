'use client'

import { useWizardStore } from '@/lib/wizard-store'
import { OptionCard } from '@/components/shared/option-card'
import { SectionHeader } from '@/components/shared/section-header'
import { Badge } from '@/components/ui/badge'
import type { TestingTool } from '@/types/wizard'

const LINTERS = [
  { value: 'eslint' as const, label: 'ESLint', description: 'Most mature ecosystem, plugin-rich' },
  { value: 'biome' as const, label: 'Biome', description: 'Written in Rust, lightning-fast lint + format' },
  { value: 'oxc' as const, label: 'OXC', description: 'Blazing-fast Rust linter, ESLint-rule compatible' },
]

const FORMATTERS = [
  { value: 'prettier' as const, label: 'Prettier', description: 'The format standard, broadly compatible' },
  { value: 'biome' as const,   label: 'Biome',    description: 'Lint and format in one tool' },
  { value: 'oxc' as const,     label: 'OXC',      description: 'oxc-transform, blazing-fast Rust formatter' },
]

const PRE_COMMITS = [
  { value: 'husky-lint-staged' as const, label: 'Husky + lint-staged', description: 'Mature and stable, staged-file checks' },
  { value: 'lefthook' as const, label: 'Lefthook', description: 'Written in Go, parallel execution is faster' },
  { value: 'none' as const, label: 'None', description: 'Maintain quality manually' },
]

const TESTING_TOOLS: { value: TestingTool; label: string; description: string; tag: string }[] = [
  { value: 'jest', label: 'Jest', description: 'Unit testing, mature ecosystem', tag: 'Unit' },
  { value: 'vitest', label: 'Vitest', description: 'Native to Vite, blazing fast', tag: 'Unit' },
  { value: 'playwright', label: 'Playwright', description: 'E2E automation, multi-browser', tag: 'E2E' },
  { value: 'cypress', label: 'Cypress', description: 'E2E testing with visual debugging', tag: 'E2E' },
]

const CICDS = [
  { value: 'github-actions' as const, label: 'GitHub Actions', description: 'Native to GitHub, YAML configuration' },
  { value: 'gitlab-ci' as const, label: 'GitLab CI', description: 'Native to GitLab, pipelines' },
  { value: 'none' as const, label: 'None', description: 'Manual deployments' },
]

export function StepToolchain() {
  const { linter, formatter, preCommit, testing, cicd, setField, toggleTesting } = useWizardStore()

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Toolchain"
        subtitle="Set up code quality, testing, and the CI/CD pipeline"
      />

      <div>
        <p className="mb-3 text-sm font-medium">Linter</p>
        <div className="grid grid-cols-2 gap-3">
          {LINTERS.map((l) => (
            <OptionCard
              key={l.value}
              selected={linter === l.value}
              onClick={() => setField('linter', l.value)}
              label={l.label}
              description={l.description}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium">Formatter</p>
        <div className="grid grid-cols-2 gap-3">
          {FORMATTERS.map((f) => (
            <OptionCard
              key={f.value}
              selected={formatter === f.value}
              onClick={() => setField('formatter', f.value)}
              label={f.label}
              description={f.description}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium">Pre-commit Hook</p>
        <div className="grid grid-cols-2 gap-3">
          {PRE_COMMITS.map((p) => (
            <OptionCard
              key={p.value}
              selected={preCommit === p.value}
              onClick={() => setField('preCommit', p.value)}
              label={p.label}
              description={p.description}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-1 text-sm font-medium">Automated Testing</p>
        <p className="mb-3 text-xs text-muted-foreground">Multiple selections allowed; combine unit and E2E testing as needed</p>
        <div className="grid grid-cols-2 gap-3">
          {TESTING_TOOLS.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => toggleTesting(t.value)}
              className={`relative flex flex-col items-start gap-1.5 rounded-lg border bg-card p-4 text-left transition-all hover:border-primary/50 ${
                testing.includes(t.value)
                  ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
                  : 'border-border'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{t.label}</span>
                <Badge variant="secondary" className="text-xs px-1.5 py-0">{t.tag}</Badge>
              </div>
              <span className="text-xs text-muted-foreground">{t.description}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium">CI/CD</p>
        <div className="grid grid-cols-2 gap-3">
          {CICDS.map((c) => (
            <OptionCard
              key={c.value}
              selected={cicd === c.value}
              onClick={() => setField('cicd', c.value)}
              label={c.label}
              description={c.description}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
