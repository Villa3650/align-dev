'use client'

import { useWizardStore } from '@/lib/wizard-store'
import { OptionCard } from '@/components/shared/option-card'
import { SectionHeader } from '@/components/shared/section-header'

const FILE_NAMINGS = [
  { value: 'kebab-case' as const, label: 'kebab-case', description: 'user-profile.tsx (recommended)' },
  { value: 'camelCase' as const, label: 'camelCase', description: 'userProfile.tsx' },
]

const IMPORT_ORDERS = [
  {
    value: 'framework-first' as const,
    label: 'Framework first',
    description: 'React → libraries → absolute paths → relative paths',
  },
  {
    value: 'absolute-then-relative' as const,
    label: 'Absolute first',
    description: 'Absolute paths (@/) → relative paths (../)',
  },
]

const MAX_FILE_LINES = [
  { value: 200 as const, label: '200 lines', description: 'Strict, highly cohesive components' },
  { value: 300 as const, label: '300 lines', description: 'Balanced, recommended' },
  { value: 500 as const, label: '500 lines', description: 'Loose, suitable for page files' },
]

const NAMING_EXAMPLES = [
  { type: 'File / directory', kebab: 'user-profile.tsx', camel: 'userProfile.tsx' },
  { type: 'React component', kebab: 'UserProfile', camel: 'UserProfile' },
  { type: 'React hook', kebab: 'useUserProfile', camel: 'useUserProfile' },
  { type: 'Utility function', kebab: 'formatDate', camel: 'formatDate' },
  { type: 'Constant', kebab: 'MAX_RETRY_COUNT', camel: 'MAX_RETRY_COUNT' },
  { type: 'TypeScript type', kebab: 'UserProfile', camel: 'UserProfile' },
  { type: 'Interface', kebab: 'IUserProfile', camel: 'IUserProfile' },
]

export function StepNamingCode() {
  const { fileNaming, importOrder, maxFileLines, setField } = useWizardStore()

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Naming & Code Conventions"
        subtitle="Unify team code style and reduce cognitive load"
      />

      <div>
        <p className="mb-3 text-sm font-medium">File Naming Style</p>
        <div className="grid grid-cols-2 gap-3">
          {FILE_NAMINGS.map((f) => (
            <OptionCard
              key={f.value}
              selected={fileNaming === f.value}
              onClick={() => setField('fileNaming', f.value)}
              label={f.label}
              description={f.description}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium">Import Order</p>
        <div className="grid grid-cols-1 gap-3">
          {IMPORT_ORDERS.map((i) => (
            <OptionCard
              key={i.value}
              selected={importOrder === i.value}
              onClick={() => setField('importOrder', i.value)}
              label={i.label}
              description={i.description}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium">Max Lines per File</p>
        <div className="grid grid-cols-3 gap-3">
          {MAX_FILE_LINES.map((m) => (
            <OptionCard
              key={m.value}
              selected={maxFileLines === m.value}
              onClick={() => setField('maxFileLines', m.value)}
              label={m.label}
              description={m.description}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-muted-foreground">Naming Conventions Preview</p>
        <div className="overflow-auto rounded-lg border">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-3 text-left font-medium">Type</th>
                <th className="p-3 text-left font-medium">
                  {fileNaming === 'kebab-case' ? 'kebab-case (current)' : 'Example'}
                </th>
              </tr>
            </thead>
            <tbody>
              {NAMING_EXAMPLES.map((row, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="p-3 text-muted-foreground">{row.type}</td>
                  <td className="p-3 font-mono">
                    {fileNaming === 'kebab-case' ? row.kebab : row.camel}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
