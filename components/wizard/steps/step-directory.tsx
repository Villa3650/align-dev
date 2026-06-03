"use client";

import { useWizardStore } from "@/lib/wizard-store";
import { OptionCard } from "@/components/shared/option-card";
import { SectionHeader } from "@/components/shared/section-header";

const DIR_PATTERNS = [
	{
		value: "monorepo" as const,
		label: "Monorepo",
		description: "Turborepo / Nx, multiple apps + shared packages",
	},
	{
		value: "feature-based" as const,
		label: "Feature-based",
		description: "Self-contained features, ideal for medium-to-large apps",
	},
	{
		value: "layer-based" as const,
		label: "Layer-based",
		description: "Split by components / hooks / utils layers",
	},
];

const DIR_DEPTHS = [
	{ value: 2 as const, label: "2 levels", description: "Flat and simple" },
	{ value: 3 as const, label: "3 levels", description: "Recommended" },
	{ value: 4 as const, label: "4 levels", description: "Very large projects" },
];

// ── Directory tree templates ─────────────────────────────────────────────────

function spaFeatureTree(lang: string) {
	const x = lang === "typescript" ? "ts" : "js";
	const xt = lang === "typescript" ? "tsx" : "jsx";
	return `src/
├── assets/
│   ├── images/
│   └── fonts/
├── components/
│   ├── ui/                  # Atomic components
│   └── common/              # Shared business components
├── features/                # Self-contained feature modules
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api.${x}
│   │   └── index.${x}
│   └── users/
│       ├── components/
│       └── index.${x}
├── hooks/                   # Global hooks
├── lib/                     # Utility helpers
├── stores/                  # Global state
├── App.${xt}
└── main.${xt}`;
}

function spaLayerTree(lang: string) {
	const x = lang === "typescript" ? "ts" : "js";
	const xt = lang === "typescript" ? "tsx" : "jsx";
	return `src/
├── assets/
├── components/              # All components
│   ├── ui/
│   ├── forms/
│   └── layouts/
├── hooks/
│   ├── use-auth.${x}
│   └── use-users.${x}
├── pages/
│   ├── Home.${xt}
│   └── Users.${xt}
├── services/                # API request layer
│   └── api.${x}
├── store/
│   └── index.${x}
├── utils/
├── App.${xt}
└── main.${xt}`;
}

function ssrFeatureTree(lang: string) {
	const x = lang === "typescript" ? "ts" : "js";
	return `app/                         # Next.js App Router
├── (auth)/
│   ├── login/page.tsx
│   └── layout.tsx
├── (dashboard)/
│   ├── users/page.tsx
│   └── layout.tsx
├── api/                     # Route handlers
│   └── users/route.${x}
└── layout.tsx

features/                    # Feature modules
├── auth/
│   ├── components/
│   ├── actions.${x}          # Server Actions
│   └── index.${x}
└── users/
    ├── components/
    └── index.${x}

components/
├── ui/
└── common/

lib/
└── utils.${x}`;
}

function ssrLayerTree(lang: string) {
	const x = lang === "typescript" ? "ts" : "js";
	return `app/                         # Next.js App Router
├── users/page.tsx
├── api/
│   └── users/route.${x}
└── layout.tsx

components/
├── ui/
├── forms/
└── layouts/

hooks/
lib/
├── api.${x}
└── utils.${x}

actions/                     # Server Actions
└── user-actions.${x}`;
}

function monorepoTree() {
	return `apps/
├── web/                     # Main Next.js app
│   ├── app/
│   ├── package.json
│   └── tsconfig.json
├── admin/                   # Admin dashboard
│   ├── app/
│   └── package.json
└── mobile/                  # React Native (optional)

packages/
├── ui/                      # Shared component library
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
├── config/                  # Shared configs
│   ├── eslint/
│   └── typescript/
├── utils/                   # Shared utilities
└── types/                   # Shared TypeScript types

turbo.json
package.json
pnpm-workspace.yaml`;
}

export function StepDirectory() {
	const { dirPattern, dirDepth, language, setField } =
		useWizardStore();

	const isMonorepo = dirPattern === "monorepo";

	function getTree(): string {
		if (dirPattern === "monorepo") return monorepoTree();
		return dirPattern === "feature-based"
			? ssrFeatureTree(language)
			: ssrLayerTree(language);
	}

	return (
		<div className="space-y-8">
			<SectionHeader
				title="Directory Structure"
				subtitle="Pick the application type, organization pattern, and nesting depth"
			/>

			{/* Organization pattern (disabled when Monorepo) */}
			<div>
				<p className="mb-3 text-sm font-medium">Organization Pattern</p>
				<div className="grid grid-cols-1 gap-3">
					{DIR_PATTERNS.map((p) => (
						<OptionCard
							key={p.value}
							selected={dirPattern === p.value}
							onClick={() => setField("dirPattern", p.value)}
							label={p.label}
							description={p.description}
						/>
					))}
				</div>
			</div>

			{/* Nesting depth (fixed for Monorepo) */}
			{!isMonorepo && (
				<div>
					<p className="mb-3 text-sm font-medium">Maximum Nesting Depth</p>
					<div className="grid grid-cols-3 gap-3">
						{DIR_DEPTHS.map((d) => (
							<OptionCard
								key={d.value}
								selected={dirDepth === d.value}
								onClick={() => setField("dirDepth", d.value)}
								label={d.label}
								description={d.description}
							/>
						))}
					</div>
				</div>
			)}

			{/* Directory tree preview */}
			<div>
				<p className="mb-2 text-sm font-medium text-muted-foreground">
					Directory Preview
				</p>
				<pre className="rounded-lg border bg-muted/50 p-4 text-xs font-mono text-muted-foreground leading-relaxed overflow-auto">
					{getTree()}
				</pre>
			</div>
		</div>
	);
}
