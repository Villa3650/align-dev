export type Framework = 'nextjs' | 'react-spa' | 'vue' | 'nuxt' | 'svelte'
export type Language = 'typescript' | 'javascript'
export type PkgMgr = 'npm' | 'yarn' | 'pnpm' | 'bun'
export type BuildTool = 'vite' | 'rollup' | 'webpack' | 'none'
export type I18n = 'none' | 'next-intl' | 'i18next' | 'vue-i18n' | 'nuxt-i18n'
export type TextDirection = 'ltr' | 'rtl' | 'bidi'

export type ComponentLib = 'antd' | 'shadcn' | 'mui' | 'radix' | 'chakra' | 'element-plus' | 'ant-design-vue' | 'naive-ui' | 'daisyui' | 'carbon-svelte' | 'none'
export type CssSolution = 'tailwind' | 'css-modules' | 'styled-components' | 'scss'
export type IconLib = 'lucide' | 'react-icons' | 'heroicons' | 'none'

export type GlobalState = 'zustand' | 'redux-toolkit' | 'jotai' | 'context-api' | 'pinia' | 'vuex' | 'svelte-store'
export type ServerState = 'tanstack-query' | 'swr' | 'nuxt-built-in' | 'sveltekit-built-in' | 'none'

export type Linter = 'eslint' | 'biome' | 'oxc'
export type Formatter = 'prettier' | 'biome' | 'oxc'
export type PreCommit = 'husky-lint-staged' | 'lefthook' | 'none'
export type TestingTool = 'jest' | 'vitest' | 'playwright' | 'cypress'
export type CICD = 'github-actions' | 'gitlab-ci' | 'none'

export type DirPattern = 'feature-based' | 'layer-based' | 'monorepo'
export type DirDepth = 2 | 3 | 4

export type FileNaming = 'kebab-case' | 'camelCase'
export type ImportOrder = 'framework-first' | 'absolute-then-relative'
export type MaxFileLines = 200 | 300 | 500

// 49 styles from ui-ux-pro-max-skill
export type ThemeStyle =
  | 'minimalism'
  | 'neumorphism'
  | 'glassmorphism'
  | 'brutalism'
  | '3d-hyperrealism'
  | 'vibrant-block'
  | 'dark-oled'
  | 'accessible-ethical'
  | 'claymorphism'
  | 'aurora'
  | 'retro'
  | 'flat'
  | 'skeuomorphism'
  | 'liquid-glass'
  | 'motion-driven'
  | 'micro-interactions'
  | 'inclusive-design'
  | 'zero-interface'
  | 'soft-ui'
  | 'neubrutalism'
  | 'bento'
  | 'y2k'
  | 'cyberpunk'
  | 'organic-biophilic'
  | 'ai-native'
  | 'memphis'
  | 'vaporwave'
  | 'dimensional-layering'
  | 'exaggerated-minimalism'
  | 'kinetic-typography'
  | 'parallax-storytelling'
  | 'swiss-modernism-2'
  | 'hud-scifi'
  | 'pixel-art'
  | 'bento-grids'
  | 'spatial-ui'
  | 'e-ink'
  | 'gen-z-chaos'
  | 'biomimetic'
  | 'anti-polish'
  | 'tactile-digital'
  | 'nature-distilled'
  | 'interactive-cursor'
  | 'voice-first'
  | '3d-product'
  | 'gradient-mesh'
  | 'editorial-grid'
  | 'chromatic-aberration'
  | 'vintage-analog'

export type ColorDepth = '3-tier' | '5-tier'
export type SpacingBase = 4 | 8
export type TokenConvention = 'css-vars' | 'js-object' | 'both'
export type TypographyScale = 'minor-third' | 'major-third' | 'perfect-fourth' | 'major-sixth'

export interface WizardState {
  framework: Framework
  language: Language
  pkgMgr: PkgMgr
  buildTool: BuildTool
  i18n: I18n
  textDirection: TextDirection
  componentLib: ComponentLib
  cssSolution: CssSolution
  iconLib: IconLib
  globalState: GlobalState
  serverState: ServerState
  linter: Linter
  formatter: Formatter
  preCommit: PreCommit
  testing: TestingTool[]
  cicd: CICD
  dirPattern: DirPattern
  dirDepth: DirDepth
  fileNaming: FileNaming
  importOrder: ImportOrder
  maxFileLines: MaxFileLines
  themeStyle: ThemeStyle
  customTokens: Record<string, string>
  colorDepth: ColorDepth
  spacingBase: SpacingBase
  tokenConvention: TokenConvention
  typographyScale: TypographyScale
}

export const STEP_LABELS = [
  'Core Stack',
  'UI & Styles',
  'State Management',
  'Toolchain',
  'Directory',
  'Naming & Code',
  'Design Tokens',
] as const

export const DEFAULT_WIZARD_STATE: WizardState = {
  framework: 'nextjs',
  language: 'typescript',
  pkgMgr: 'pnpm',
  buildTool: 'vite',
  i18n: 'none',
  textDirection: 'ltr',
  componentLib: 'shadcn',
  cssSolution: 'tailwind',
  iconLib: 'lucide',
  globalState: 'zustand',
  serverState: 'tanstack-query',
  linter: 'eslint',
  formatter: 'prettier',
  preCommit: 'husky-lint-staged',
  testing: ['vitest'],
  cicd: 'github-actions',
  dirPattern: 'feature-based',
  dirDepth: 3,
  fileNaming: 'kebab-case',
  importOrder: 'framework-first',
  maxFileLines: 300,
  themeStyle: 'minimalism',
  customTokens: {},
  colorDepth: '5-tier',
  spacingBase: 4,
  tokenConvention: 'css-vars',
  typographyScale: 'major-third',
}
