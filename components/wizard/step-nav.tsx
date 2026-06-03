'use client'

import { useWizardStore } from '@/lib/wizard-store'
import { STEP_LABELS } from '@/types/wizard'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

export function StepNav() {
  const { currentStep, goToStep } = useWizardStore()
  const total = STEP_LABELS.length
  const progress = ((currentStep + 1) / total) * 100

  return (
    <nav className="flex h-full flex-col border-r bg-muted/10 px-4 py-6">
      <div className="mb-6">
        <h1 className="text-base font-bold leading-tight">AlignDev</h1>
        <p className="mt-0.5 text-xs text-muted-foreground">Build with AI. Ship with standards.</p>
      </div>

      <div className="mb-6">
        <Progress value={progress} className="h-1.5" />
        <p className="mt-1.5 text-xs text-muted-foreground">
          {currentStep + 1} / {total}
        </p>
      </div>

      <ol className="flex flex-col gap-1">
        {STEP_LABELS.map((label, idx) => {
          const isCompleted = idx < currentStep
          const isActive = idx === currentStep

          return (
            <li key={idx}>
              <button
                type="button"
                onClick={() => goToStep(idx)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors cursor-pointer',
                  isActive && 'bg-primary/10 text-primary font-medium',
                  isCompleted && 'text-foreground hover:bg-muted',
                  !isActive && !isCompleted && 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                <span
                  className={cn(
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium transition-colors',
                    isActive && 'bg-primary text-primary-foreground',
                    isCompleted && 'bg-primary/20 text-primary',
                    !isActive && !isCompleted && 'bg-muted text-muted-foreground',
                  )}
                >
                  {isCompleted ? <Check className="h-3.5 w-3.5" /> : idx + 1}
                </span>
                <span className="leading-tight">{label}</span>
              </button>
            </li>
          )
        })}
      </ol>

      <div className="mt-auto pt-6 border-t">
        <p className="text-[10px] text-muted-foreground leading-relaxed">
          Once every category is selected, click &ldquo;Generate Standards&rdquo; to get the full document and a SKILL.md.
        </p>
      </div>
    </nav>
  )
}
