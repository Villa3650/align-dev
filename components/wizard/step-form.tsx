'use client'

import { useEffect, useState, type ComponentType } from 'react'
import { useWizardStore } from '@/lib/wizard-store'
import { STEP_LABELS } from '@/types/wizard'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Sparkles, Loader2 } from 'lucide-react'

type StepComponent = ComponentType

const STEP_LOADERS: Array<() => Promise<StepComponent>> = [
  () => import('./steps/step-core-stack').then((m) => m.StepCoreStack),
  () => import('./steps/step-ui-styles').then((m) => m.StepUIStyles),
  () => import('./steps/step-state-management').then((m) => m.StepStateManagement),
  () => import('./steps/step-toolchain').then((m) => m.StepToolchain),
  () => import('./steps/step-directory').then((m) => m.StepDirectory),
  () => import('./steps/step-naming-code').then((m) => m.StepNamingCode),
  () => import('./steps/step-design-tokens').then((m) => m.StepDesignTokens),
]

const TOTAL_STEPS = STEP_LABELS.length

export function StepForm() {
  const { currentStep, isGenerating, generatedDoc, nextStep, prevStep, startGeneration } = useWizardStore()
  const [loadedStep, setLoadedStep] = useState<{ index: number; Component: StepComponent } | null>(null)

  const isLastStep = currentStep === TOTAL_STEPS - 1
  const isFirstStep = currentStep === 0
  const hasGenerated = Boolean(generatedDoc)

  useEffect(() => {
    let cancelled = false
    STEP_LOADERS[currentStep]().then((Component) => {
      if (!cancelled) setLoadedStep({ index: currentStep, Component })
    })
    return () => {
      cancelled = true
    }
  }, [currentStep])

  const handleNext = () => {
    if (isLastStep) {
      startGeneration()
    } else {
      nextStep()
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Step content: scrolls naturally; the Design Tokens step removes the width cap to fit the right-hand demo */}
      <div className={`px-8 py-8 h-[calc(100vh-65px)] overflow-auto`} key={currentStep}>
        {loadedStep?.index === currentStep
          ? <loadedStep.Component />
          : <div className="text-sm text-muted-foreground">Loading step...</div>}
      </div>

      {/* Navigation: sticky bottom bar */}
      <div className="sticky bottom-0 border-t bg-background/95 backdrop-blur-sm px-8 py-4">
        <div className="flex items-center justify-between max-w-2xl">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={isFirstStep || isGenerating}
            className="gap-1.5"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>

          <div className="flex items-center gap-3">
            {hasGenerated && !isGenerating && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => startGeneration()}
                className="text-xs gap-1"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Regenerate
              </Button>
            )}

            <Button
              onClick={handleNext}
              disabled={isGenerating}
              className="gap-1.5 min-w-32"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating…
                </>
              ) : isLastStep ? (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate Standards
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
