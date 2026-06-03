'use client'

import { StepNav } from './step-nav'
import { StepForm } from './step-form'
import { PreviewPanel } from '@/components/preview/preview-panel'

export function WizardShell() {
  return (
    <div className="flex min-h-screen">
      {/* Left nav: sticky, doesn't scroll with the page */}
      <aside className="sticky top-0 h-screen w-[220px] shrink-0 overflow-y-auto">
        <StepNav />
      </aside>

      {/* Main content: flows naturally and owns the page's only scrollbar */}
      <div className="flex flex-1 min-w-0">
        <main className="flex-1 min-w-0">
          <StepForm />
        </main>

        {/* Right preview: sticky, scrolls within its own column */}
        <aside id="preview-aside" className="sticky top-0 h-screen w-[360px] shrink-0 overflow-y-auto border-l bg-muted/20">
          <PreviewPanel />
        </aside>
      </div>
    </div>
  )
}
