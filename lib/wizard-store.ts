import { create } from 'zustand'
import { DEFAULT_WIZARD_STATE } from '@/types/wizard'
import { fetchVersions } from '@/lib/pkg-versions'
import type { WizardState, TestingTool, ThemeStyle, TypographyScale } from '@/types/wizard'

interface UIState {
  currentStep: number
  isGenerating: boolean
  generatedDoc: string
  generatedSkill: string
  error: string | null
}

interface Actions {
  setField: <K extends keyof WizardState>(key: K, value: WizardState[K]) => void
  toggleTesting: (tool: TestingTool) => void
  setTheme: (style: ThemeStyle) => void
  setTypographyScale: (scale: TypographyScale) => void
  setToken: (cssVar: string, value: string) => void
  goToStep: (n: number) => void
  nextStep: () => void
  prevStep: () => void
  startGeneration: () => void
  resetDoc: () => void
}

type Store = WizardState & UIState & Actions

const TOTAL_STEPS = 7

async function loadTokenDefaults(style: ThemeStyle, scale: TypographyScale) {
  const [{ getDefaultTokens }, { getTypographyTokens }] = await Promise.all([
    import('@/lib/theme-tokens'),
    import('@/lib/typography-utils'),
  ])

  return { ...getDefaultTokens(style), ...getTypographyTokens(scale) }
}

export const useWizardStore = create<Store>((set, get) => ({
  ...DEFAULT_WIZARD_STATE,
  customTokens: {},
  currentStep: 0,
  isGenerating: false,
  generatedDoc: '',
  generatedSkill: '',
  error: null,

  setField: (key, value) => {
    if (key === 'framework' && get().framework !== value) {
      const updates = { [key]: value } as Partial<Store>
      if (value === 'vue' || value === 'nuxt') {
        updates.componentLib = 'element-plus'
        updates.globalState = 'pinia'
      }
      set(updates)
      return
    }
    set({ [key]: value } as Partial<Store>)
  },

  toggleTesting: (tool) => {
    const current = get().testing
    const next = current.includes(tool)
      ? current.filter((t) => t !== tool)
      : [...current, tool]
    set({ testing: next })
  },

  setTheme: async (style) => {
    const scale = get().typographyScale
    set({ themeStyle: style })
    const customTokens = await loadTokenDefaults(style, scale)
    if (get().themeStyle !== style) return
    set({
      themeStyle: style,
      customTokens,
    })
  },

  setTypographyScale: async (scale) => {
    set({ typographyScale: scale })
    const { getTypographyTokens } = await import('@/lib/typography-utils')
    set((s) => ({
      typographyScale: scale,
      customTokens: { ...s.customTokens, ...getTypographyTokens(scale) },
    }))
  },

  setToken: (cssVar, value) => {
    set((s) => ({
      customTokens: { ...s.customTokens, [cssVar]: value },
    }))
  },

  goToStep: (n) => set({ currentStep: Math.max(0, Math.min(TOTAL_STEPS - 1, n)) }),
  nextStep: () => set((s) => ({ currentStep: Math.min(TOTAL_STEPS - 1, s.currentStep + 1) })),
  prevStep: () => set((s) => ({ currentStep: Math.max(0, s.currentStep - 1) })),

  resetDoc: () => set({ generatedDoc: '', generatedSkill: '', error: null }),

  startGeneration: () => {
    const state = get()
    if (state.isGenerating) return

    const selections: WizardState = {
      framework: state.framework,
      language: state.language,
      pkgMgr: state.pkgMgr,
      buildTool: state.buildTool,
      i18n: state.i18n,
      textDirection: state.textDirection,
      componentLib: state.componentLib,
      cssSolution: state.cssSolution,
      iconLib: state.iconLib,
      globalState: state.globalState,
      serverState: state.serverState,
      linter: state.linter,
      formatter: state.formatter,
      preCommit: state.preCommit,
      testing: state.testing,
      cicd: state.cicd,
      dirPattern: state.dirPattern,
      dirDepth: state.dirDepth,
      fileNaming: state.fileNaming,
      importOrder: state.importOrder,
      maxFileLines: state.maxFileLines,
      themeStyle: state.themeStyle,
      customTokens: state.customTokens,
      colorDepth: state.colorDepth,
      spacingBase: state.spacingBase,
      tokenConvention: state.tokenConvention,
      typographyScale: state.typographyScale,
    }

    set({ isGenerating: true, generatedDoc: '', generatedSkill: '', error: null })

    ;(async () => {
      try {
        const customTokens = Object.keys(selections.customTokens).length === 0
          ? await loadTokenDefaults(selections.themeStyle, selections.typographyScale)
          : selections.customTokens
        const normalizedSelections = { ...selections, customTokens }
        if (customTokens !== selections.customTokens) {
          set({ customTokens })
        }
        const [{ generateDocument }, { generateSkill }, versions] = await Promise.all([
          import('@/lib/document-generator'),
          import('@/lib/skill-generator'),
          fetchVersions(),
        ])
        const doc = generateDocument(normalizedSelections, versions)
        const skill = generateSkill(normalizedSelections, versions)
        set({ generatedDoc: doc, generatedSkill: skill, isGenerating: false })
      } catch (err) {
        set({
          error: err instanceof Error ? err.message : 'Generation failed, please try again',
          isGenerating: false,
        })
      }
    })()
  },
}))
