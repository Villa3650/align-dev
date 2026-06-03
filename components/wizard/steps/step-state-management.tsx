'use client'

import { useWizardStore } from '@/lib/wizard-store'
import { OptionCard } from '@/components/shared/option-card'
import { SectionHeader } from '@/components/shared/section-header'

const REACT_GLOBAL_STATES = [
  { value: 'zustand' as const,       label: 'Zustand',       description: 'Lightweight and flexible, hooks-first, recommended' },
  { value: 'redux-toolkit' as const, label: 'Redux Toolkit', description: 'Mature ecosystem, ideal for complex apps' },
  { value: 'jotai' as const,         label: 'Jotai',         description: 'Atomic state with fine-grained subscriptions' },
  { value: 'context-api' as const,   label: 'Context API',   description: 'No extra dependencies, fine for simple cases' },
]

const VUE_GLOBAL_STATES = [
  { value: 'pinia' as const, label: 'Pinia', description: 'Officially recommended for Vue, lightweight Composition API style' },
  { value: 'vuex' as const,  label: 'Vuex',  description: 'Legacy official option, Vuex 4 supports Vue 3' },
]

const REACT_SERVER_STATES = [
  { value: 'tanstack-query' as const, label: 'TanStack Query v5', description: 'Go-to data fetching, powerful caching' },
  { value: 'swr' as const,           label: 'SWR',               description: 'By Vercel, lightweight and minimal' },
  { value: 'none' as const,          label: 'None',             description: 'Use native fetch or axios' },
]

const VUE_SERVER_STATES = [
  { value: 'tanstack-query' as const, label: 'TanStack Query (Vue)', description: '@tanstack/vue-query, full caching solution' },
  { value: 'nuxt-built-in' as const,  label: 'Nuxt Built-in',             description: 'useFetch / useAsyncData (Nuxt only)' },
  { value: 'none' as const,           label: 'None',                 description: 'Use VueUse / native fetch' },
]

const SVELTE_GLOBAL_STATES = [
  { value: 'svelte-store' as const, label: 'Svelte Stores',  description: 'Built-in writable / readable / derived, zero deps' },
  { value: 'zustand' as const,      label: 'Zustand',        description: 'Framework-agnostic, also works in Svelte' },
]

const SVELTE_SERVER_STATES = [
  { value: 'sveltekit-built-in' as const, label: 'SvelteKit load()',    description: '+page.server.ts / +page.ts, SSR built-in' },
  { value: 'tanstack-query' as const,     label: 'TanStack Query',      description: '@tanstack/svelte-query, client-side caching' },
  { value: 'none' as const,              label: 'None',               description: 'Use native fetch or axios' },
]

export function StepStateManagement() {
  const { framework, globalState, serverState, setField } = useWizardStore()

  const isVue = framework === 'vue' || framework === 'nuxt'
  const isSvelte = framework === 'svelte'
  const globalOptions = isVue ? VUE_GLOBAL_STATES : isSvelte ? SVELTE_GLOBAL_STATES : REACT_GLOBAL_STATES
  const serverOptions = isVue ? VUE_SERVER_STATES : isSvelte ? SVELTE_SERVER_STATES : REACT_SERVER_STATES

  const REACT_ONLY_GLOBAL = ['redux-toolkit', 'jotai', 'context-api']
  const VUE_ONLY_GLOBAL = ['pinia', 'vuex']
  const SVELTE_ONLY_GLOBAL = ['svelte-store']
  const globalInvalid = isVue
    ? [...REACT_ONLY_GLOBAL, ...SVELTE_ONLY_GLOBAL].some(v => v === globalState)
    : isSvelte
    ? [...REACT_ONLY_GLOBAL, ...VUE_ONLY_GLOBAL].some(v => v === globalState)
    : [...VUE_ONLY_GLOBAL, ...SVELTE_ONLY_GLOBAL].some(v => v === globalState)
  const serverInvalid = isVue
    ? ['swr', 'sveltekit-built-in'].includes(serverState)
    : isSvelte
    ? ['nuxt-built-in', 'swr'].includes(serverState)
    : ['nuxt-built-in', 'sveltekit-built-in'].includes(serverState)

  return (
    <div className="space-y-8">
      <SectionHeader
        title="State Management"
        subtitle={isVue ? 'State management for the Vue ecosystem' : isSvelte ? 'State management for the Svelte ecosystem' : 'Pick client global state and server-side data fetching'}
      />

      {globalInvalid && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs text-amber-700">
          The current framework is <strong>{ framework === 'vue' ? 'Vue 3' : framework === 'nuxt' ? 'Nuxt 3' : framework === 'svelte' ? 'Svelte' : 'React' }</strong>. Please pick a compatible state management option.
        </div>
      )}

      <div>
        <p className="mb-3 text-sm font-medium">Global State</p>
        <div className="grid grid-cols-2 gap-3">
          {globalOptions.map((g) => (
            <OptionCard
              key={g.value}
              selected={globalState === g.value}
              onClick={() => setField('globalState', g.value)}
              label={g.label}
              description={g.description}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium">Server State / Data Fetching</p>
        {serverInvalid && (
          <p className="mb-2 text-[11px] text-amber-600">This option doesn&rsquo;t apply to the current framework, please pick another</p>
        )}
        <div className="grid grid-cols-2 gap-3">
          {serverOptions.map((s) => (
            <OptionCard
              key={s.value}
              selected={serverState === s.value}
              onClick={() => setField('serverState', s.value)}
              label={s.label}
              description={s.description}
            />
          ))}
        </div>
      </div>

      {isVue && (
        <div className="rounded-lg border bg-muted/30 px-4 py-3 text-xs text-muted-foreground space-y-1">
          <p className="font-medium text-foreground">Picking Vue state management</p>
          <p>· <strong>New projects</strong>: prefer <strong>Pinia</strong>, officially recommended, TypeScript-friendly, Composition API support</p>
          <p>· <strong>Existing Vuex projects</strong>: keep using Vuex 4 or migrate gradually to Pinia</p>
          {framework === 'nuxt' && <p>· <strong>Nuxt built-in</strong>: page-level data fetching prefers <code>useFetch</code>, cleaner for SSR/SSG</p>}
        </div>
      )}
      {isSvelte && (
        <div className="rounded-lg border bg-muted/30 px-4 py-3 text-xs text-muted-foreground space-y-1">
          <p className="font-medium text-foreground">Picking Svelte state management</p>
          <p>· <strong>Svelte Stores</strong>: built-in <code>writable</code> / <code>derived</code> / <code>readable</code>, zero bundle cost — pick this first</p>
          <p>· <strong>SvelteKit load()</strong>: server-side data fetching via <code>+page.server.ts</code>, type-safe, the SSR default</p>
        </div>
      )}
    </div>
  )
}
