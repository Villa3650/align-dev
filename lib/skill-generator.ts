import type { WizardState } from '@/types/wizard'
import { FALLBACK_VERSIONS, type VersionMap } from '@/lib/pkg-versions'

let _v: VersionMap = {}
const mv = (pkg: string, fb: string): string => _v[pkg] ?? FALLBACK_VERSIONS[pkg] ?? fb

const SPEC_FILENAME = 'frontend-align.md'

function fwLabel(fw: string): string {
  const m: Record<string, string> = {
    nextjs:      `Next.js ${mv('next', '16')} (App Router)`,
    'react-spa': `React ${mv('react', '19')} + Vite ${mv('vite', '6')}`,
    vue:         `Vue ${mv('vue', '3')} + Vite ${mv('vite', '6')}`,
    nuxt:        `Nuxt ${mv('nuxt', '4')}`,
    svelte:      `Svelte ${mv('svelte', '5')} / SvelteKit`,
  }
  return m[fw] ?? fw
}

function fwShort(fw: string): string {
  return { nextjs: 'nextjs', 'react-spa': 'react', vue: 'vue', nuxt: 'nuxt', svelte: 'svelte' }[fw] ?? fw
}

function cssLabel(css: string): string {
  const m: Record<string, string> = {
    tailwind:            `Tailwind CSS v${mv('tailwindcss', '4')}`,
    'css-modules':       'CSS Modules',
    'styled-components': `Styled Components v${mv('styled-components', '6')}`,
    scss:                'SCSS',
  }
  return m[css] ?? css
}

function stateLabel(gs: string): string {
  const m: Record<string, string> = {
    zustand:         `Zustand ${mv('zustand', '5')}`,
    'redux-toolkit': `Redux Toolkit ${mv('@reduxjs/toolkit', '2')}`,
    jotai:           `Jotai ${mv('jotai', '2')}`,
    'context-api':   'React Context',
    pinia:           `Pinia ${mv('pinia', '2')}`,
    vuex:            'Vuex 4',
    'svelte-store':  'Svelte Stores',
  }
  return m[gs] ?? gs
}

function serverStateLabel(ss: string): string {
  const m: Record<string, string> = {
    'tanstack-query':     `TanStack Query v${mv('@tanstack/react-query', '5')}`,
    swr:                  `SWR ${mv('swr', '2')}`,
    'nuxt-built-in':      'Nuxt useFetch',
    'sveltekit-built-in': 'SvelteKit load()',
    none:                 'native fetch',
  }
  return m[ss] ?? ss
}

const PM_RUN: Record<string, string> = { npm: 'npm run', yarn: 'yarn', pnpm: 'pnpm', bun: 'bun run' }
const PM_EXEC: Record<string, string> = { npm: 'npx', yarn: 'yarn', pnpm: 'pnpm dlx', bun: 'bunx' }

export function generateSkill(s: WizardState, v: VersionMap = {}): string {
  _v = { ...FALLBACK_VERSIONS, ...v }

  const pm = PM_RUN[s.pkgMgr]
  const px = PM_EXEC[s.pkgMgr]
  const isTS = s.language === 'typescript'

  // Build stack summary for description
  const stack = [
    fwLabel(s.framework),
    isTS ? 'TypeScript' : 'JavaScript',
    cssLabel(s.cssSolution),
    stateLabel(s.globalState),
    s.serverState !== 'none' ? serverStateLabel(s.serverState) : '',
  ].filter(Boolean).join(', ')

  // Build lint / typecheck / test commands
  const lintCmd = s.linter === 'biome'
    ? `${px} @biomejs/biome check --apply .`
    : `${pm} lint`
  const typecheckCmd = isTS ? `${px} tsc --noEmit` : null
  const testCmd = s.testing.length > 0 ? `${pm} test` : null

  const checkCmds = [lintCmd, typecheckCmd, testCmd].filter(Boolean).join(' / ')

  // Compliance checklist items — customised to the chosen stack
  const checklist = [
    'Component naming follows the standard.',
    'Folder structure follows the standard.',
    isTS ? 'TypeScript types are explicit — no `any`.' : 'JSDoc types are documented.',
    'API request style follows the standard.',
    `State management (${stateLabel(s.globalState)}) follows the standard.`,
    `Styling (${cssLabel(s.cssSolution)}) follows the standard.`,
    'Error / loading / empty states are handled.',
    'No unnecessary dependencies are added.',
    ...(s.i18n !== 'none' ? ['All user-facing strings go through the i18n layer.'] : []),
    ...(s.testing.length > 0 ? ['New logic has corresponding unit tests.'] : []),
  ]

  const result = `---
name: frontend-${fwShort(s.framework)}
description: >
  Use whenever writing, modifying, or reviewing frontend code in this project.
  Stack: ${stack}.
  Triggers on any component, hook, store, style, or test file change.
---

## Dependency Bootstrap

Before using this skill, check whether required skill dependencies exist.

Required skills:
- ui-ux-pro-max-skill

If any required skill is missing, run:

\`\`\`bash
npx skills add https://github.com/nextlevelbuilder/ui-ux-pro-max-skill --skill ui-ux-pro-max -y
\`\`\`

# Frontend Development Standard

Use this skill whenever modifying or creating frontend code.

## Required reading

Before coding, read:

- \`${SPEC_FILENAME}\`

## Workflow

1. Understand the requested feature or fix.
2. Check existing frontend structure and relevant files.
3. Implement according to \`${SPEC_FILENAME}\`.
4. Run \`${checkCmds}\`.
5. Before final response, perform a compliance review.

## Compliance checklist

${checklist.map(item => `- ${item}`).join('\n')}

## Final response format

Explain:

- What was changed
- Which frontend rules were followed
- Any rule that could not be fully followed
- Commands run and results`

  _v = {}
  return result
}
