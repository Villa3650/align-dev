'use client'

import { useWizardStore } from '@/lib/wizard-store'
import { OptionCard } from '@/components/shared/option-card'
import { SectionHeader } from '@/components/shared/section-header'

const REACT_COMPONENT_LIBS = [
  { value: 'shadcn' as const,   label: 'shadcn/ui',     description: 'Copy-and-paste components built on Radix UI' },
  { value: 'antd' as const,     label: 'Ant Design',  description: 'Enterprise-grade UI, feature-complete' },
  { value: 'mui' as const,      label: 'Material UI',   description: 'Google Material Design' },
  { value: 'radix' as const,    label: 'Radix UI',      description: 'Unstyled, fully customizable' },
  { value: 'chakra' as const,   label: 'Chakra UI',     description: 'Powerful theme system, easy to use' },
  { value: 'daisyui' as const,  label: 'daisyUI',       description: 'Tailwind component classes, 60+ themes' },
  { value: 'none' as const,     label: 'No component library',       description: 'Build with raw HTML/CSS' },
]

const SVELTE_COMPONENT_LIBS = [
  { value: 'daisyui' as const,        label: 'daisyUI',                  description: 'Tailwind component classes, framework-agnostic, the Svelte default' },
  { value: 'shadcn' as const,         label: 'shadcn-svelte',            description: 'Svelte port of shadcn/ui' },
  { value: 'carbon-svelte' as const,  label: 'Carbon Components Svelte', description: 'IBM Carbon Design System, enterprise Svelte components' },
  { value: 'none' as const,           label: 'No component library',                 description: 'Build with raw HTML/CSS' },
]

const VUE_COMPONENT_LIBS = [
  { value: 'element-plus' as const,   label: 'Element Plus',   description: 'Enterprise-grade, comprehensive component library' },
  { value: 'ant-design-vue' as const, label: 'Ant Design Vue',  description: 'Vue port with feature parity' },
  { value: 'naive-ui' as const,       label: 'Naive UI',        description: 'Modern look, highly customizable' },
  { value: 'none' as const,           label: 'No component library',        description: 'Build with raw HTML/CSS' },
]

const CSS_SOLUTIONS = [
  { value: 'tailwind' as const,           label: 'Tailwind CSS',      description: 'Utility-first, peak productivity' },
  { value: 'css-modules' as const,        label: 'CSS Modules',       description: 'Locally scoped, zero dependencies' },
  { value: 'styled-components' as const,  label: 'Styled Components', description: 'CSS-in-JS, dynamic styles' },
  { value: 'scss' as const,               label: 'SCSS/Sass',         description: 'Enhanced CSS with variables and mixins' },
]

const REACT_ICON_LIBS = [
  { value: 'lucide' as const,     label: 'Lucide React', description: 'Elegant and consistent, the shadcn default' },
  { value: 'react-icons' as const, label: 'React Icons', description: 'Largest icon set, tree-shakable' },
  { value: 'heroicons' as const,  label: 'Heroicons',    description: 'Official Tailwind icon library' },
  { value: 'none' as const,       label: 'No icon library',      description: 'Use SVGs or custom icons' },
]

const VUE_ICON_LIBS = [
  { value: 'lucide' as const,    label: 'Lucide',     description: 'Universal icon library (Vue wrapper)' },
  { value: 'react-icons' as const, label: 'Icon fonts',   description: 'iconfont or Font Awesome' },
  { value: 'heroicons' as const, label: 'Custom SVG',   description: 'In-project SVG icons' },
  { value: 'none' as const,      label: 'No icon library',     description: 'Emoji or plain text' },
]

export function StepUIStyles() {
  const { framework, componentLib, cssSolution, iconLib, setField } = useWizardStore()

  const isVue = framework === 'vue' || framework === 'nuxt'
  const isSvelte = framework === 'svelte'
  const componentLibOptions = isVue
    ? VUE_COMPONENT_LIBS
    : isSvelte
    ? SVELTE_COMPONENT_LIBS
    : REACT_COMPONENT_LIBS
  const iconLibOptions = isVue ? VUE_ICON_LIBS : REACT_ICON_LIBS

  const VUE_ONLY = ['element-plus', 'ant-design-vue', 'naive-ui']
  const REACT_ONLY = ['antd', 'mui', 'radix', 'chakra']
  const SVELTE_ONLY = ['carbon-svelte']
  const isComponentLibInvalid = isVue
    ? [...REACT_ONLY, ...SVELTE_ONLY].includes(componentLib)
    : isSvelte
    ? [...VUE_ONLY, ...REACT_ONLY].includes(componentLib)
    : [...VUE_ONLY, ...SVELTE_ONLY].includes(componentLib)

  return (
    <div className="space-y-8">
      <SectionHeader
        title="UI & Styles"
        subtitle={isVue ? 'UI and styling for the Vue ecosystem' : isSvelte ? 'UI and styling for the Svelte ecosystem' : 'UI and styling for the React ecosystem'}
      />

      {isComponentLibInvalid && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs text-amber-700">
          The current framework is <strong>{ framework === 'vue' ? 'Vue 3' : framework === 'nuxt' ? 'Nuxt 3' : framework === 'svelte' ? 'Svelte' : 'React' }</strong>. Please pick a compatible component library.
        </div>
      )}

      <div>
        <p className="mb-3 text-sm font-medium">Component Library</p>
        <div className="grid grid-cols-2 gap-3">
          {componentLibOptions.map((c) => (
            <OptionCard
              key={c.value}
              selected={componentLib === c.value}
              onClick={() => setField('componentLib', c.value)}
              label={c.label}
              description={c.description}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium">CSS Solution</p>
        <div className="grid grid-cols-2 gap-3">
          {CSS_SOLUTIONS.map((c) => (
            <OptionCard
              key={c.value}
              selected={cssSolution === c.value}
              onClick={() => setField('cssSolution', c.value)}
              label={c.label}
              description={c.description}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium">Icon Library</p>
        <div className="grid grid-cols-2 gap-3">
          {iconLibOptions.map((i) => (
            <OptionCard
              key={i.value}
              selected={iconLib === i.value}
              onClick={() => setField('iconLib', i.value)}
              label={i.label}
              description={i.description}
            />
          ))}
        </div>
      </div>

      {isVue && (
        <div className="rounded-lg border bg-muted/30 px-4 py-3 text-xs text-muted-foreground space-y-1">
          <p className="font-medium text-foreground">Picking a Vue component library</p>
          <p>· <strong>Element Plus</strong>: most complete, well-documented, the default for enterprise projects</p>
          <p>· <strong>Ant Design Vue</strong>: parity with the React version, recommended for large projects</p>
          <p>· <strong>Naive UI</strong>: modern look, highly customizable, friendly for small to mid-sized projects</p>
        </div>
      )}
      {isSvelte && (
        <div className="rounded-lg border bg-muted/30 px-4 py-3 text-xs text-muted-foreground space-y-1">
          <p className="font-medium text-foreground">Picking a Svelte component library</p>
          <p>· <strong>daisyUI</strong>: Tailwind plugin, 60+ themes, zero JS runtime, the most common Svelte choice</p>
          <p>· <strong>shadcn-svelte</strong>: Svelte port of shadcn/ui, copy-and-paste components, highly customizable</p>
        </div>
      )}
    </div>
  )
}
