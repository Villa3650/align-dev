import type { ThemeStyle } from '@/types/wizard'

export interface DesignToken {
  cssVar: string
  label: string
  value: string
  type: 'color' | 'size' | 'shadow' | 'text'
}

export interface ThemePreset {
  id: ThemeStyle
  no: number
  name: string
  description: string
  bestFor: string
  source: string
  palette: string[]
  tokens: DesignToken[]
}

function t(cssVar: string, label: string, value: string, type: DesignToken['type'] = 'color'): DesignToken {
  return { cssVar, label, value, type }
}

function makeTokens(
  bg: string, surface: string, primary: string, primaryFg: string, accent: string,
  text: string, textMuted: string, border: string,
  radius: string, shadow: string, fontWeight: string, fontFamily: string,
): DesignToken[] {
  return [
    t('--color-bg', 'Page background', bg),
    t('--color-surface', 'Card background', surface),
    t('--color-primary', 'Primary color', primary),
    t('--color-primary-fg', 'Primary foreground', primaryFg),
    t('--color-accent', 'Accent color', accent),
    t('--color-text', 'Body text color', text),
    t('--color-text-muted', 'Secondary text', textMuted),
    t('--color-border', 'Border color', border),
    t('--radius-base', 'Radius', radius, 'size'),
    t('--shadow-sm', 'Small shadow', shadow, 'shadow'),
    t('--font-weight-heading', 'Heading weight', fontWeight, 'text'),
    t('--font-family', 'Font family', fontFamily, 'text'),
  ]
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'minimalism', no: 1,
    name: 'Minimalism & Swiss Style',
    description: 'Restrained whitespace, precise grids, no ornamentation',
    bestFor: 'Enterprise apps, dashboards, documentation',
    source: '#1 · ui-ux-pro-max',
    palette: ['#000000', '#ffffff', '#f5f1e8', '#808080', '#3b82f6'],
    tokens: makeTokens('#ffffff','#f5f5f5','#171717','#ffffff','#3b82f6','#0a0a0a','#737373','#e5e5e5','0px','none','700','Inter, sans-serif'),
  },
  {
    id: 'neumorphism', no: 2,
    name: 'Neumorphism',
    description: 'Soft raised surfaces, inner and outer shadows, tactile design',
    bestFor: 'Health/wellness apps, meditation platforms',
    source: '#2 · ui-ux-pro-max',
    palette: ['#e0e5ec', '#c8e0f4', '#f5e0e8', '#e8e8e8', '#4f46e5'],
    tokens: makeTokens('#e0e5ec','#e0e5ec','#4f46e5','#ffffff','#7c3aed','#2d3748','#718096','#cdd5e0','14px','-5px -5px 10px #ffffff, 5px 5px 10px #a3b1c6','600','Inter, sans-serif'),
  },
  {
    id: 'glassmorphism', no: 3,
    name: 'Glassmorphism',
    description: 'Frosted transparency, blurred refraction, colorful backdrops',
    bestFor: 'Modern SaaS, financial dashboards',
    source: '#3 · ui-ux-pro-max',
    palette: ['#0f172a', '#6366f1', '#a78bfa', '#06b6d4', '#ffffff'],
    tokens: makeTokens('#0f172a','rgba(255,255,255,0.1)','#6366f1','#ffffff','#a78bfa','#f1f5f9','#94a3b8','rgba(255,255,255,0.2)','16px','0 4px 30px rgba(0,0,0,0.3)','700','Inter, sans-serif'),
  },
  {
    id: 'brutalism', no: 4,
    name: 'Brutalism',
    description: 'Raw and rugged, solid colors plus black borders, zero polish',
    bestFor: 'Design portfolios, artistic projects',
    source: '#4 · ui-ux-pro-max',
    palette: ['#ffffff', '#ff0000', '#0000ff', '#ffff00', '#000000'],
    tokens: makeTokens('#ffffff','#ffffff','#ff0000','#000000','#0000ff','#000000','#333333','#000000','0px','none','900','Impact, sans-serif'),
  },
  {
    id: '3d-hyperrealism', no: 5,
    name: '3D & Hyperrealism',
    description: 'Depth perspective, realistic lighting, immersive feel',
    bestFor: 'Gaming, product showcase, immersive',
    source: '#5 · ui-ux-pro-max',
    palette: ['#001f3f', '#ffd700', '#228b22', '#800020', '#c0c0c0'],
    tokens: makeTokens('#001f3f','#002a55','#ffd700','#001f3f','#228b22','#ffffff','#94a3b8','#1e3a5f','8px','0 20px 40px rgba(0,0,0,0.6)','700','Inter, sans-serif'),
  },
  {
    id: 'vibrant-block', no: 6,
    name: 'Vibrant & Block-based',
    description: 'Neon color blocks, high saturation, strong visual impact',
    bestFor: 'Startups, creative agencies, gaming',
    source: '#6 · ui-ux-pro-max',
    palette: ['#0a0a0a', '#39ff14', '#bf00ff', '#ff1493', '#00ffff'],
    tokens: makeTokens('#0a0a0a','#141414','#39ff14','#000000','#bf00ff','#ffffff','#b3b3b3','#ff1493','4px','0 0 20px rgba(57,255,20,0.3)','800','Space Grotesk, sans-serif'),
  },
  {
    id: 'dark-oled', no: 7,
    name: 'Dark Mode OLED',
    description: 'Pure black background, neon accents, power-saving high contrast',
    bestFor: 'Night-mode apps, coding platforms',
    source: '#7 · ui-ux-pro-max',
    palette: ['#000000', '#121212', '#00ff88', '#ff0080', '#0a0e27'],
    tokens: makeTokens('#000000','#0a0a0a','#00ff88','#000000','#ff0080','#ffffff','#a1a1aa','#1a1a1a','6px','0 0 10px rgba(0,255,136,0.2)','700','Inter, sans-serif'),
  },
  {
    id: 'accessible-ethical', no: 8,
    name: 'Accessible & Ethical',
    description: 'WCAG AAA, high contrast, accessibility first',
    bestFor: 'Government, healthcare, education',
    source: '#8 · ui-ux-pro-max',
    palette: ['#ffffff', '#0057b8', '#005c00', '#f8f9fa', '#404040'],
    tokens: makeTokens('#ffffff','#f8f9fa','#0057b8','#ffffff','#005c00','#000000','#404040','#767676','4px','0 2px 4px rgba(0,0,0,0.15)','400','Atkinson Hyperlegible, sans-serif'),
  },
  {
    id: 'claymorphism', no: 9,
    name: 'Claymorphism',
    description: 'Inflated clay feel, inner and outer shadows, soft pastels',
    bestFor: 'Educational apps, children\'s apps, SaaS',
    source: '#9 · ui-ux-pro-max',
    palette: ['#fef3c7', '#fdbcb4', '#add8e6', '#98ff98', '#e6e6fa'],
    tokens: makeTokens('#fef3c7','#ffffff','#7c3aed','#ffffff','#f59e0b','#1c1917','#78716c','#e5e7eb','24px','4px 4px 10px rgba(0,0,0,0.1), -2px -2px 8px rgba(255,255,255,0.8)','700','Nunito, sans-serif'),
  },
  {
    id: 'aurora', no: 10,
    name: 'Aurora UI',
    description: 'Gradient glow, complementary colors, nebula atmosphere',
    bestFor: 'Modern SaaS, creative agencies',
    source: '#10 · ui-ux-pro-max',
    palette: ['#0f0a1e', '#a855f7', '#06b6d4', '#ec4899', '#1a0f3c'],
    tokens: makeTokens('#0f0a1e','#1a0f3c','#a855f7','#ffffff','#06b6d4','#f1f5f9','#94a3b8','#3730a3','12px','0 4px 20px rgba(168,85,247,0.3)','700','Inter, sans-serif'),
  },
  {
    id: 'retro', no: 11,
    name: 'Retro-Futurism',
    description: 'Terminal yellow-green, pixel feel, 80s futurism',
    bestFor: 'Gaming, entertainment, music platforms',
    source: '#11 · ui-ux-pro-max',
    palette: ['#0a0500', '#ff8c00', '#00ff41', '#1a0a00', '#5c0089'],
    tokens: makeTokens('#0a0500','#140a00','#ff8c00','#000000','#00ff41','#ffd700','#b8860b','#3d2200','0px','0 0 6px rgba(255,140,0,0.5)','700','VT323, monospace'),
  },
  {
    id: 'flat', no: 12,
    name: 'Flat Design',
    description: 'Flat colors without shadows, icon-like, Material spirit',
    bestFor: 'Web apps, mobile apps, startup MVPs',
    source: '#12 · ui-ux-pro-max',
    palette: ['#f8fafc', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
    tokens: makeTokens('#f8fafc','#ffffff','#3b82f6','#ffffff','#10b981','#0f172a','#64748b','#e2e8f0','4px','none','600','Roboto, sans-serif'),
  },
  {
    id: 'skeuomorphism', no: 13,
    name: 'Skeuomorphism',
    description: 'Skeuomorphic texture, gradients, realistic physical feel',
    bestFor: 'Legacy apps, gaming, premium products',
    source: '#13 · ui-ux-pro-max',
    palette: ['#2c1810', '#c8a96e', '#8fbc8f', '#4a3728', '#f5deb3'],
    tokens: makeTokens('#2c1810','#4a3728','#c8a96e','#1a0f08','#8fbc8f','#f5deb3','#c4a882','#6b4c3b','6px','0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)','500','Georgia, serif'),
  },
  {
    id: 'liquid-glass', no: 14,
    name: 'Liquid Glass',
    description: 'Vision Pro frosted glass, heavy blur, light refraction',
    bestFor: 'Premium SaaS, high-end e-commerce',
    source: '#14 · ui-ux-pro-max',
    palette: ['#f2f2f7', '#007aff', '#5856d6', '#ffffff', '#34c759'],
    tokens: makeTokens('#f2f2f7','rgba(255,255,255,0.72)','#007aff','#ffffff','#5856d6','#1c1c1e','#6c6c70','rgba(0,0,0,0.1)','18px','0 2px 12px rgba(0,0,0,0.08)','600','SF Pro Display, system-ui'),
  },
  {
    id: 'motion-driven', no: 15,
    name: 'Motion-Driven',
    description: 'Motion-led, high contrast, visually responsive feel',
    bestFor: 'Portfolio sites, storytelling platforms',
    source: '#15 · ui-ux-pro-max',
    palette: ['#0a0014', '#ff006e', '#00f5a0', '#120020', '#7c3aed'],
    tokens: makeTokens('#0a0014','#120020','#ff006e','#ffffff','#00f5a0','#ffffff','#8892b0','#2a0050','8px','0 0 30px rgba(255,0,110,0.4)','700','Inter, sans-serif'),
  },
  {
    id: 'micro-interactions', no: 16,
    name: 'Micro-interactions',
    description: 'Refined feedback, precise state colors, rich tactile feel',
    bestFor: 'Mobile apps, touchscreen UIs',
    source: '#16 · ui-ux-pro-max',
    palette: ['#fafafa', '#3b82f6', '#22c55e', '#f59e0b', '#ef4444'],
    tokens: makeTokens('#fafafa','#ffffff','#3b82f6','#ffffff','#22c55e','#111827','#6b7280','#e5e7eb','8px','0 1px 3px rgba(0,0,0,0.06)','500','Inter, sans-serif'),
  },
  {
    id: 'inclusive-design', no: 17,
    name: 'Inclusive Design',
    description: '7:1 contrast, large type, keyboard friendly',
    bestFor: 'Public services, education, healthcare',
    source: '#17 · ui-ux-pro-max',
    palette: ['#ffffff', '#1a56db', '#057a55', '#f0f4f8', '#111928'],
    tokens: makeTokens('#ffffff','#f0f4f8','#1a56db','#ffffff','#057a55','#111928','#374151','#4b5563','6px','0 2px 8px rgba(0,0,0,0.12)','400','Atkinson Hyperlegible, sans-serif'),
  },
  {
    id: 'zero-interface', no: 18,
    name: 'Zero Interface',
    description: 'Implicit UI, voice/gesture first, AI-driven',
    bestFor: 'Voice assistants, AI platforms',
    source: '#18 · ui-ux-pro-max',
    palette: ['#fafafa', '#404040', '#808080', '#f0f0f0', '#1a1a1a'],
    tokens: makeTokens('#fafafa','#f0f0f0','#404040','#ffffff','#808080','#1a1a1a','#737373','#d4d4d4','12px','0 1px 4px rgba(0,0,0,0.06)','300','Inter, sans-serif'),
  },
  {
    id: 'soft-ui', no: 19,
    name: 'Soft UI Evolution',
    description: 'Improved-contrast pastels, modern enterprise style',
    bestFor: 'Modern enterprise apps, SaaS',
    source: '#19 · ui-ux-pro-max',
    palette: ['#f0f4ff', '#6366f1', '#ec4899', '#c7d2fe', '#1e1b4b'],
    tokens: makeTokens('#f0f4ff','#ffffff','#6366f1','#ffffff','#ec4899','#1e1b4b','#6b7280','#c7d2fe','12px','0 4px 12px rgba(99,102,241,0.1)','500','Plus Jakarta Sans, sans-serif'),
  },
  {
    id: 'neubrutalism', no: 20,
    name: 'Neubrutalism',
    description: 'Heavy black borders, offset shadows, saturated palette',
    bestFor: 'Gen Z brands, startups, Figma-style',
    source: '#20 · ui-ux-pro-max',
    palette: ['#ffeb3b', '#ff5252', '#2196f3', '#000000', '#ffffff'],
    tokens: makeTokens('#ffffff','#ffffff','#ffeb3b','#000000','#ff5252','#000000','#444444','#000000','0px','4px 4px 0px #000000','900','Space Grotesk, sans-serif'),
  },
  {
    id: 'bento', no: 21,
    name: 'Bento Box Grid',
    description: 'Card grid, large radius, warm neutral base',
    bestFor: 'Dashboards, product pages, portfolios',
    source: '#21 · ui-ux-pro-max',
    palette: ['#f5f5f7', '#ffffff', '#1e293b', '#f59e0b', '#e2e8f0'],
    tokens: makeTokens('#f5f5f7','#ffffff','#1e293b','#ffffff','#f59e0b','#0f172a','#64748b','#e2e8f0','20px','0 4px 6px rgba(0,0,0,0.05)','700','Inter, sans-serif'),
  },
  {
    id: 'y2k', no: 22,
    name: 'Y2K Aesthetic',
    description: 'Millennial chrome silver, hot pink plus teal, glossy feel',
    bestFor: 'Fashion brands, music, Gen Z',
    source: '#22 · ui-ux-pro-max',
    palette: ['#1a0028', '#ff69b4', '#00ffff', '#c0c0c0', '#9400d3'],
    tokens: makeTokens('#1a0028','#2d0045','#ff69b4','#000000','#00ffff','#c0c0c0','#9400d3','#ff69b4','6px','0 0 15px rgba(255,105,180,0.5)','700','Space Grotesk, sans-serif'),
  },
  {
    id: 'cyberpunk', no: 23,
    name: 'Cyberpunk UI',
    description: 'Neon fragmentation, scanlines, digital punk aesthetic',
    bestFor: 'Gaming, tech products, crypto apps',
    source: '#23 · ui-ux-pro-max',
    palette: ['#0d0d0d', '#00ff00', '#ff00ff', '#00ffff', '#2d0b6e'],
    tokens: makeTokens('#0d0d0d','#1a0a2e','#00ff00','#000000','#ff00ff','#e0e0e0','#a0a0a0','#00ffff','2px','0 0 8px rgba(0,255,255,0.4)','700','Share Tech Mono, monospace'),
  },
  {
    id: 'organic-biophilic', no: 24,
    name: 'Organic Biophilic',
    description: 'Forest green, earth brown, sky blue, natural rhythm',
    bestFor: 'Wellness apps, sustainability brands',
    source: '#24 · ui-ux-pro-max',
    palette: ['#f5f5dc', '#228b22', '#87ceeb', '#8b4513', '#90ee90'],
    tokens: makeTokens('#f5f5dc','#fafaf0','#228b22','#ffffff','#87ceeb','#2d1b00','#6b5344','#8b7355','24px','0 4px 16px rgba(34,139,34,0.15)','400','Lato, sans-serif'),
  },
  {
    id: 'ai-native', no: 25,
    name: 'AI-Native UI',
    description: 'Tech blue-purple, intelligent feel, future Copilot style',
    bestFor: 'AI products, chatbots, copilots',
    source: '#25 · ui-ux-pro-max',
    palette: ['#0f0f23', '#6c63ff', '#00d4ff', '#1a1a3e', '#2d2d6b'],
    tokens: makeTokens('#0f0f23','#1a1a3e','#6c63ff','#ffffff','#00d4ff','#e2e8f0','#94a3b8','#2d2d6b','10px','0 4px 16px rgba(108,99,255,0.2)','500','Inter, sans-serif'),
  },
  {
    id: 'memphis', no: 26,
    name: 'Memphis Design',
    description: 'Geometric patterns, playful palette, 80s postmodern',
    bestFor: 'Creative agencies, music, youth brands',
    source: '#26 · ui-ux-pro-max',
    palette: ['#fffef0', '#ff71ce', '#ffce5c', '#86ccca', '#6a7bb4'],
    tokens: makeTokens('#fffef0','#ffffff','#ff71ce','#000000','#ffce5c','#1a1a1a','#555555','#2d2d2d','4px','3px 3px 0 #2d2d2d','800','Space Grotesk, sans-serif'),
  },
  {
    id: 'vaporwave', no: 27,
    name: 'Vaporwave',
    description: 'Vaporwave pink-purple-cyan, grid background, dreamy feel',
    bestFor: 'Music platforms, gaming, portfolios',
    source: '#27 · ui-ux-pro-max',
    palette: ['#0d0221', '#ff71ce', '#01cdfe', '#05ffa1', '#b967ff'],
    tokens: makeTokens('#0d0221','#1a0837','#ff71ce','#000000','#01cdfe','#b967ff','#05ffa1','#ff71ce','4px','0 0 20px rgba(255,113,206,0.4)','700','Space Grotesk, monospace'),
  },
  {
    id: 'dimensional-layering', no: 28,
    name: 'Dimensional Layering',
    description: 'Layered cards, depth separation, spatial feel',
    bestFor: 'Dashboards, card layouts, modals',
    source: '#28 · ui-ux-pro-max',
    palette: ['#f1f5f9', '#ffffff', '#3b82f6', '#8b5cf6', '#e2e8f0'],
    tokens: makeTokens('#f1f5f9','#ffffff','#3b82f6','#ffffff','#8b5cf6','#0f172a','#64748b','#e2e8f0','16px','0 20px 40px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.04)','600','Inter, sans-serif'),
  },
  {
    id: 'exaggerated-minimalism', no: 29,
    name: 'Exaggerated Minimalism',
    description: 'Extreme simplicity, generous whitespace, premium luxury feel',
    bestFor: 'Fashion, architecture, portfolios',
    source: '#29 · ui-ux-pro-max',
    palette: ['#ffffff', '#000000', '#c8a96e', '#f8f8f8', '#999999'],
    tokens: makeTokens('#ffffff','#f8f8f8','#000000','#ffffff','#c8a96e','#000000','#999999','#000000','0px','none','300','Cormorant Garamond, serif'),
  },
  {
    id: 'kinetic-typography', no: 30,
    name: 'Kinetic Typography',
    description: 'Typography as the visual, kinetic feel, oversized hero type',
    bestFor: 'Hero sections, marketing sites',
    source: '#30 · ui-ux-pro-max',
    palette: ['#000000', '#ffffff', '#ff3d00', '#111111', '#888888'],
    tokens: makeTokens('#000000','#111111','#ffffff','#000000','#ff3d00','#ffffff','#888888','#333333','0px','none','900','Inter, sans-serif'),
  },
  {
    id: 'parallax-storytelling', no: 31,
    name: 'Parallax Storytelling',
    description: 'Layered scroll storytelling, cinematic feel, brand immersion',
    bestFor: 'Brand storytelling, product launches',
    source: '#31 · ui-ux-pro-max',
    palette: ['#0a0a0f', '#f59e0b', '#8b5cf6', '#12121c', '#1e1e2e'],
    tokens: makeTokens('#0a0a0f','#12121c','#f59e0b','#000000','#8b5cf6','#f8fafc','#94a3b8','#1e1e2e','8px','0 30px 60px rgba(0,0,0,0.5)','700','Plus Jakarta Sans, sans-serif'),
  },
  {
    id: 'swiss-modernism-2', no: 32,
    name: 'Swiss Modernism 2.0',
    description: '12-column grid, type-first, enterprise authority',
    bestFor: 'Corporate sites, architecture, editorial',
    source: '#32 · ui-ux-pro-max',
    palette: ['#ffffff', '#000000', '#ff0000', '#f5f5f5', '#666666'],
    tokens: makeTokens('#ffffff','#f5f5f5','#000000','#ffffff','#ff0000','#000000','#666666','#e0e0e0','0px','none','700','Helvetica Neue, sans-serif'),
  },
  {
    id: 'hud-scifi', no: 33,
    name: 'HUD / Sci-Fi FUI',
    description: 'Holographic blue-cyan, scanlines, sci-fi dashboard',
    bestFor: 'Sci-fi games, space tech, cybersecurity',
    source: '#33 · ui-ux-pro-max',
    palette: ['#000a14', '#00ffff', '#0080ff', '#001428', '#007799'],
    tokens: makeTokens('#000a14','#001428','#00ffff','#000a14','#0080ff','#00ffff','#007799','#00ffff','2px','0 0 5px rgba(0,255,255,0.5)','400','Share Tech Mono, monospace'),
  },
  {
    id: 'pixel-art', no: 34,
    name: 'Pixel Art',
    description: 'Pixel blocks, retro console feel, 8-bit aesthetic',
    bestFor: 'Indie games, retro tools, creative',
    source: '#34 · ui-ux-pro-max',
    palette: ['#1a1a2e', '#e94560', '#0f3460', '#eaeaea', '#888888'],
    tokens: makeTokens('#1a1a2e','#16213e','#e94560','#ffffff','#0f3460','#eaeaea','#888888','#e94560','0px','4px 4px 0px rgba(0,0,0,0.8)','700','Press Start 2P, monospace'),
  },
  {
    id: 'bento-grids', no: 35,
    name: 'Bento Grids',
    description: 'Irregular grids, personalized cards, modern dashboard',
    bestFor: 'Product features, dashboards, personal',
    source: '#35 · ui-ux-pro-max',
    palette: ['#fafafa', '#ffffff', '#171717', '#3b82f6', '#e5e5e5'],
    tokens: makeTokens('#fafafa','#ffffff','#171717','#ffffff','#3b82f6','#0f0f0f','#737373','#e5e5e5','16px','0 1px 4px rgba(0,0,0,0.04)','600','Inter, sans-serif'),
  },
  {
    id: 'spatial-ui', no: 36,
    name: 'Spatial UI (VisionOS)',
    description: 'Apple Vision Pro, layered glass windows, spatial computing',
    bestFor: 'Spatial computing apps, VR/AR',
    source: '#36 · ui-ux-pro-max',
    palette: ['#f2f2f7', '#007aff', '#5856d6', '#34c759', '#ffffff'],
    tokens: makeTokens('#f2f2f7','rgba(255,255,255,0.2)','#007aff','#ffffff','#5856d6','#1c1c1e','#6c6c70','rgba(0,0,0,0.08)','24px','0 8px 40px rgba(0,0,0,0.12)','500','SF Pro Display, system-ui'),
  },
  {
    id: 'e-ink', no: 37,
    name: 'E-Ink / Paper',
    description: 'E-ink screen, paper texture, focused reading experience',
    bestFor: 'Reading apps, digital newspapers',
    source: '#37 · ui-ux-pro-max',
    palette: ['#f5f5f0', '#ebebd3', '#1a1a1a', '#c8c8b8', '#5a5a5a'],
    tokens: makeTokens('#f5f5f0','#ebebd3','#1a1a1a','#f5f5f0','#404040','#1a1a1a','#5a5a5a','#c8c8b8','2px','none','400','Georgia, serif'),
  },
  {
    id: 'gen-z-chaos', no: 38,
    name: 'Gen Z Chaos / Maximalism',
    description: 'Chaotic aesthetic, anti-design, intentionally dense visuals',
    bestFor: 'Gen Z lifestyle, music artists',
    source: '#38 · ui-ux-pro-max',
    palette: ['#f0f0f0', '#ff0090', '#00ff00', '#0000ff', '#ffffff'],
    tokens: makeTokens('#f0f0f0','#ffffff','#ff0090','#ffffff','#00ff00','#000000','#555555','#ff0090','999px','6px 6px 0 #00ff00, 3px 3px 0 #0000ff','900','Space Grotesk, sans-serif'),
  },
  {
    id: 'biomimetic', no: 39,
    name: 'Biomimetic / Organic 2.0',
    description: 'Biomimetic design, emerald plus sky blue, biotech feel',
    bestFor: 'Sustainability tech, biotech, health',
    source: '#39 · ui-ux-pro-max',
    palette: ['#f0faf5', '#059669', '#0ea5e9', '#a7f3d0', '#064e3b'],
    tokens: makeTokens('#f0faf5','#ffffff','#059669','#ffffff','#0ea5e9','#064e3b','#6b7280','#a7f3d0','20px','0 4px 20px rgba(5,150,105,0.12)','400','DM Sans, sans-serif'),
  },
  {
    id: 'anti-polish', no: 40,
    name: 'Anti-Polish / Raw Aesthetic',
    description: 'Deliberately unpolished, handmade feel, honest roughness',
    bestFor: 'Creative portfolios, artist sites',
    source: '#40 · ui-ux-pro-max',
    palette: ['#fdf8f0', '#f5ede0', '#1a1a1a', '#c44b3e', '#666666'],
    tokens: makeTokens('#fdf8f0','#f5ede0','#1a1a1a','#fdf8f0','#c44b3e','#1a1a1a','#666666','#1a1a1a','3px','2px 3px 0px rgba(0,0,0,0.9)','400','Courier New, monospace'),
  },
  {
    id: 'tactile-digital', no: 41,
    name: 'Tactile Digital',
    description: 'Morphing UI, elastic physics, modern playfulness',
    bestFor: 'Modern mobile apps, playful brands',
    source: '#41 · ui-ux-pro-max',
    palette: ['#fef9f0', '#f97316', '#a855f7', '#fed7aa', '#1c0f00'],
    tokens: makeTokens('#fef9f0','#fff8ed','#f97316','#ffffff','#a855f7','#1c0f00','#78716c','#fed7aa','20px','0 8px 0 rgba(0,0,0,0.15)','600','Nunito, sans-serif'),
  },
  {
    id: 'nature-distilled', no: 42,
    name: 'Nature Distilled',
    description: 'Sage green, terracotta orange, distilled natural essence',
    bestFor: 'Wellness brands, sustainable products',
    source: '#42 · ui-ux-pro-max',
    palette: ['#f7f3ee', '#5d7a4f', '#c2956c', '#d4c5b0', '#2c2318'],
    tokens: makeTokens('#f7f3ee','#ffffff','#5d7a4f','#ffffff','#c2956c','#2c2318','#8b7d6b','#d4c5b0','16px','0 2px 12px rgba(0,0,0,0.06)','400','Lato, sans-serif'),
  },
  {
    id: 'interactive-cursor', no: 43,
    name: 'Interactive Cursor Design',
    description: 'Cursor as interaction, black and white, creative composition',
    bestFor: 'Creative portfolios, interactive',
    source: '#43 · ui-ux-pro-max',
    palette: ['#0d0d0d', '#ffffff', '#ff3cac', '#1a1a1a', '#888888'],
    tokens: makeTokens('#0d0d0d','#1a1a1a','#ffffff','#000000','#ff3cac','#ffffff','#888888','#333333','0px','none','700','Inter, sans-serif'),
  },
  {
    id: 'voice-first', no: 44,
    name: 'Voice-First Multimodal',
    description: 'Voice-driven, ambient interaction, audio-visual fusion',
    bestFor: 'Voice assistants, accessibility apps',
    source: '#44 · ui-ux-pro-max',
    palette: ['#0f172a', '#38bdf8', '#818cf8', '#1e293b', '#334155'],
    tokens: makeTokens('#0f172a','#1e293b','#38bdf8','#0f172a','#818cf8','#f1f5f9','#64748b','#334155','999px','0 0 0 4px rgba(56,189,248,0.15)','400','Inter, sans-serif'),
  },
  {
    id: '3d-product', no: 45,
    name: '3D Product Preview',
    description: 'Immersive product display, white focus, strong shadows',
    bestFor: 'E-commerce, furniture, fashion',
    source: '#45 · ui-ux-pro-max',
    palette: ['#f8f9fa', '#ffffff', '#212529', '#6c757d', '#dee2e6'],
    tokens: makeTokens('#f8f9fa','#ffffff','#212529','#ffffff','#6c757d','#212529','#6c757d','#dee2e6','12px','0 20px 60px rgba(0,0,0,0.15)','600','Inter, sans-serif'),
  },
  {
    id: 'gradient-mesh', no: 46,
    name: 'Gradient Mesh / Aurora Evolved',
    description: 'Mesh gradient background, cyan-pink contrast, flowing glow',
    bestFor: 'Hero sections, backgrounds, creative',
    source: '#46 · ui-ux-pro-max',
    palette: ['#0a0015', '#00ffff', '#ff00ff', '#00ff66', '#0066ff'],
    tokens: makeTokens('#0a0015','#120025','#00ffff','#000000','#ff00ff','#ffffff','#a0a0c0','rgba(255,255,255,0.1)','20px','0 0 40px rgba(0,255,255,0.3)','700','Plus Jakarta Sans, sans-serif'),
  },
  {
    id: 'editorial-grid', no: 47,
    name: 'Editorial Grid / Magazine',
    description: 'Asymmetric layout, typographic storytelling, magazine layout',
    bestFor: 'News sites, blogs, magazines',
    source: '#47 · ui-ux-pro-max',
    palette: ['#ffffff', '#1a1a1a', '#c41e3a', '#f8f8f8', '#666666'],
    tokens: makeTokens('#ffffff','#f8f8f8','#1a1a1a','#ffffff','#c41e3a','#1a1a1a','#666666','#1a1a1a','0px','none','700','Merriweather, Georgia, serif'),
  },
  {
    id: 'chromatic-aberration', no: 48,
    name: 'Chromatic Aberration / RGB Split',
    description: 'RGB channel shift, glitch beauty, digital distortion',
    bestFor: 'Music platforms, gaming, tech',
    source: '#48 · ui-ux-pro-max',
    palette: ['#0a0a0a', '#ff0000', '#00ffff', '#111111', '#888888'],
    tokens: makeTokens('#0a0a0a','#111111','#ff0000','#ffffff','#00ffff','#ffffff','#888888','#ff0000','0px','-2px 0 0 rgba(255,0,0,0.8), 2px 0 0 rgba(0,255,255,0.8)','900','Space Grotesk, sans-serif'),
  },
  {
    id: 'vintage-analog', no: 49,
    name: 'Vintage Analog / Retro Film',
    description: 'Film grain, warm vintage tones, vinyl texture',
    bestFor: 'Photography, music/vinyl brands',
    source: '#49 · ui-ux-pro-max',
    palette: ['#f4ede4', '#8b4513', '#daa520', '#ede5da', '#2c1810'],
    tokens: makeTokens('#f4ede4','#ede5da','#8b4513','#f4ede4','#daa520','#2c1810','#7a5c4a','#c8a882','4px','0 4px 12px rgba(44,24,16,0.2)','400','Playfair Display, Georgia, serif'),
  },
]

export function getThemePreset(id: ThemeStyle): ThemePreset {
  return THEME_PRESETS.find(p => p.id === id) ?? THEME_PRESETS[0]
}

// ── Functional colors ────────────────────────────────────────────────────────
// Follow basic user color expectations: green=success, red=error, yellow=warning, blue=info/link
// Adjust exact values by theme brightness and style while preserving a consistent semantic framework

interface FnColors {
  success: string   // Success: green family
  error: string     // Error: red family
  warning: string   // Warning: yellow/orange family
  info: string      // Info: blue family
  link: string      // Link: blue family
}

// Quick presets
const LIGHT: FnColors  = { success: '#16a34a', error: '#dc2626', warning: '#d97706', info: '#2563eb', link: '#2563eb' }
const DARK: FnColors   = { success: '#4ade80', error: '#f87171', warning: '#fbbf24', info: '#60a5fa', link: '#93c5fd' }
const NEON: FnColors   = { success: '#00ff41', error: '#ff0040', warning: '#ffcc00', info: '#00ccff', link: '#00ccff' }
const APPLE: FnColors  = { success: '#34c759', error: '#ff3b30', warning: '#ff9500', info: '#007aff', link: '#007aff' }
const WARM: FnColors   = { success: '#2d7a22', error: '#c44b3e', warning: '#e67e22', info: '#2980b9', link: '#2980b9' }
const BRUTAL: FnColors = { success: '#00aa00', error: '#ff0000', warning: '#ffff00', info: '#0000ff', link: '#0000ff' }

const FC: Record<ThemeStyle, FnColors> = {
  'minimalism':             LIGHT,
  'neumorphism':            LIGHT,
  'glassmorphism':          DARK,
  'brutalism':              BRUTAL,
  '3d-hyperrealism':        { ...DARK, warning: '#ffd700' },
  'vibrant-block':          { success: '#39ff14', error: '#ff1493', warning: '#ffff00', info: '#00ffff', link: '#bf00ff' },
  'dark-oled':              DARK,
  'accessible-ethical':     LIGHT,
  'claymorphism':           LIGHT,
  'aurora':                 DARK,
  'retro':                  { success: '#00ff41', error: '#ff4500', warning: '#ffd700', info: '#00bfff', link: '#ffd700' },
  'flat':                   LIGHT,
  'skeuomorphism':          { ...WARM, link: '#c8a96e' },
  'liquid-glass':           APPLE,
  'motion-driven':          DARK,
  'micro-interactions':     LIGHT,
  'inclusive-design':       LIGHT,
  'zero-interface':         LIGHT,
  'soft-ui':                LIGHT,
  'neubrutalism':           { ...BRUTAL, error: '#ff5252' },
  'bento':                  LIGHT,
  'y2k':                    { success: '#05ffa1', error: '#ff69b4', warning: '#ffce5c', info: '#00ffff', link: '#9400d3' },
  'cyberpunk':              NEON,
  'organic-biophilic':      { success: '#228b22', error: '#c0392b', warning: '#e67e22', info: '#87ceeb', link: '#228b22' },
  'ai-native':              DARK,
  'memphis':                { success: '#2d7a22', error: '#c44b3e', warning: '#ffce5c', info: '#6a7bb4', link: '#86ccca' },
  'vaporwave':              { success: '#05ffa1', error: '#ff71ce', warning: '#ffce5c', info: '#01cdfe', link: '#b967ff' },
  'dimensional-layering':   LIGHT,
  'exaggerated-minimalism': LIGHT,
  'kinetic-typography':     { ...DARK, error: '#ff3d00', link: '#ff3d00' },
  'parallax-storytelling':  DARK,
  'swiss-modernism-2':      { ...LIGHT, error: '#ff0000' },
  'hud-scifi':              NEON,
  'pixel-art':              { success: '#22c55e', error: '#ff0040', warning: '#ffcc00', info: '#4488ff', link: '#4488ff' },
  'bento-grids':            LIGHT,
  'spatial-ui':             APPLE,
  'e-ink':                  { success: '#2d5a27', error: '#8b0000', warning: '#7a5c00', info: '#1a3a5c', link: '#1a3a5c' },
  'gen-z-chaos':            { success: '#00ff00', error: '#ff0090', warning: '#ffff00', info: '#0000ff', link: '#ff0090' },
  'biomimetic':             { success: '#059669', error: '#dc2626', warning: '#d97706', info: '#0ea5e9', link: '#0ea5e9' },
  'anti-polish':            WARM,
  'tactile-digital':        { ...LIGHT, warning: '#f97316', info: '#a855f7', link: '#7c3aed' },
  'nature-distilled':       { success: '#3d6b30', error: '#b91c1c', warning: '#9a5c0d', info: '#1d4ed8', link: '#1d4ed8' },
  'interactive-cursor':     { ...DARK, link: '#ff3cac' },
  'voice-first':            { ...DARK, info: '#38bdf8', link: '#818cf8' },
  '3d-product':             LIGHT,
  'gradient-mesh':          { success: '#00ff66', error: '#ff00ff', warning: '#ffff00', info: '#00ffff', link: '#00ffff' },
  'editorial-grid':         { ...LIGHT, link: '#c41e3a' },
  'chromatic-aberration':   { success: '#00ff41', error: '#ff0000', warning: '#ffff00', info: '#00ffff', link: '#00ffff' },
  'vintage-analog':         WARM,
}

// ── Neutral colors ───────────────────────────────────────────────────────────
// Neutral Colors：Text Layer · Background Layer · Borders/dividers layer
// Must satisfy WCAG 2.0: body >=4.5:1 (AA), large text >=3:1 (AA Large)

export type NeutralGroup = 'text' | 'bg' | 'border'

export interface NeutralTokenDef {
  cssVar: string
  label: string
  hint: string
  group: NeutralGroup
  wcagTarget?: '4.5:1' | '3:1' | 'decorative'
}

export const NEUTRAL_TOKEN_DEFS: NeutralTokenDef[] = [
  { cssVar: '--color-text-primary',        label: 'Primary text', hint: 'Body, headings',       group: 'text',   wcagTarget: '4.5:1' },
  { cssVar: '--color-text-secondary',      label: 'Secondary text', hint: 'Description, helper information',   group: 'text',   wcagTarget: '4.5:1' },
  { cssVar: '--color-text-tertiary',       label: 'Tertiary text', hint: 'Placeholders, helper text',   group: 'text',   wcagTarget: '3:1' },
  { cssVar: '--color-text-disabled',       label: 'Disabled text', hint: 'Disabled state (may be below AA)', group: 'text', wcagTarget: 'decorative' },
  { cssVar: '--color-text-inverse',        label: 'Inverse text', hint: 'Text on dark backgrounds', group: 'text',   wcagTarget: '4.5:1' },
  { cssVar: '--color-neutral-bg',          label: 'Page background', hint: 'Base page background',     group: 'bg' },
  { cssVar: '--color-neutral-bg-subtle',   label: 'Subtle fill',   hint: 'Hover states, tag backgrounds', group: 'bg' },
  { cssVar: '--color-neutral-bg-muted',    label: 'Muted fill',   hint: 'Code blocks, quote backgrounds', group: 'bg' },
  { cssVar: '--color-neutral-elevated',    label: 'Elevated background', hint: 'Cards, dropdown menus',   group: 'bg' },
  { cssVar: '--color-neutral-divider',     label: 'Divider',   hint: 'Lightweight section divider',     group: 'border', wcagTarget: 'decorative' },
  { cssVar: '--color-neutral-border',      label: 'Default border', hint: 'Inputs, card borders', group: 'border', wcagTarget: '3:1' },
  { cssVar: '--color-neutral-border-strong', label: 'Strong border', hint: 'Emphasized dividers, tables',  group: 'border', wcagTarget: '3:1' },
]

interface NC {
  textPrimary: string; textSecondary: string; textTertiary: string
  textDisabled: string; textInverse: string
  bg: string; bgSubtle: string; bgMuted: string; elevated: string
  divider: string; border: string; borderStrong: string
}

// Preset neutral color groups
const NL: NC = {  // Standard Light
  textPrimary: '#111111', textSecondary: '#525252', textTertiary: '#737373',
  textDisabled: '#a3a3a3', textInverse: '#f5f5f5',
  bg: '#ffffff', bgSubtle: '#f5f5f5', bgMuted: '#e5e5e5', elevated: '#ffffff',
  divider: '#f0f0f0', border: '#e5e5e5', borderStrong: '#d4d4d4',
}
const ND: NC = {  // Standard Dark
  textPrimary: '#f5f5f5', textSecondary: '#d4d4d4', textTertiary: '#a3a3a3',
  textDisabled: '#525252', textInverse: '#111111',
  bg: '#0a0a0a', bgSubtle: '#171717', bgMuted: '#262626', elevated: '#1a1a1a',
  divider: '#1f1f1f', border: '#262626', borderStrong: '#404040',
}
const NWL: NC = { // Warm Light
  textPrimary: '#1c0f00', textSecondary: '#5c3d2e', textTertiary: '#8b7355',
  textDisabled: '#c4a882', textInverse: '#fdf8f0',
  bg: '#fdf8f0', bgSubtle: '#f5ede0', bgMuted: '#ede0cc', elevated: '#ffffff',
  divider: '#e8d5b8', border: '#d4b896', borderStrong: '#b8956a',
}
const NWD: NC = { // Warm Dark
  textPrimary: '#f5deb3', textSecondary: '#c4a882', textTertiary: '#8b7355',
  textDisabled: '#4a3728', textInverse: '#1a0a00',
  bg: '#2c1810', bgSubtle: '#3a2418', bgMuted: '#4a3728', elevated: '#2a1608',
  divider: '#3d2614', border: '#5c3d2e', borderStrong: '#7a5c4a',
}
const NGR: NC = { // Gray (Neumorphism)
  textPrimary: '#2d3748', textSecondary: '#4a5568', textTertiary: '#718096',
  textDisabled: '#a0aec0', textInverse: '#f7fafc',
  bg: '#e0e5ec', bgSubtle: '#d8e0eb', bgMuted: '#ccd5e0', elevated: '#e8edf5',
  divider: '#cbd5e0', border: '#b8c6d9', borderStrong: '#a0b0c8',
}
const NAP: NC = { // Apple / Glass
  textPrimary: '#1c1c1e', textSecondary: '#6c6c70', textTertiary: '#8e8e93',
  textDisabled: '#c7c7cc', textInverse: '#f5f5f7',
  bg: '#f2f2f7', bgSubtle: '#e5e5ea', bgMuted: '#d1d1d6', elevated: '#ffffff',
  divider: '#e0e0e5', border: '#c6c6c8', borderStrong: '#aeaeb2',
}
const NBR: NC = { // Brutalist
  textPrimary: '#000000', textSecondary: '#333333', textTertiary: '#666666',
  textDisabled: '#aaaaaa', textInverse: '#ffffff',
  bg: '#ffffff', bgSubtle: '#f0f0f0', bgMuted: '#e0e0e0', elevated: '#ffffff',
  divider: '#000000', border: '#000000', borderStrong: '#000000',
}
const NNN: NC = { // Neon Dark
  textPrimary: '#e0e0e0', textSecondary: '#a0a0a0', textTertiary: '#606060',
  textDisabled: '#303030', textInverse: '#0d0d0d',
  bg: '#0d0d0d', bgSubtle: '#131313', bgMuted: '#1a1a1a', elevated: '#111111',
  divider: '#1e1e1e', border: '#2a2a2a', borderStrong: '#3a3a3a',
}
const NVP: NC = { // Vaporwave / Y2K
  textPrimary: '#c0c0c0', textSecondary: '#9090b0', textTertiary: '#606080',
  textDisabled: '#303050', textInverse: '#0d0221',
  bg: '#0d0221', bgSubtle: '#150330', bgMuted: '#200540', elevated: '#180430',
  divider: '#2a0050', border: '#3a0070', borderStrong: '#ff71ce',
}
const NGA: NC = { // Dark + gradient
  textPrimary: '#f0f0f8', textSecondary: '#a0a0c0', textTertiary: '#606080',
  textDisabled: '#303050', textInverse: '#0a0015',
  bg: '#0a0015', bgSubtle: '#120020', bgMuted: '#1a0030', elevated: '#160025',
  divider: '#20003a', border: '#30005a', borderStrong: '#5000a0',
}
const NCY: NC = { // Cyberpunk
  textPrimary: '#e0ffe0', textSecondary: '#80c080', textTertiary: '#408040',
  textDisabled: '#204020', textInverse: '#0d0d0d',
  bg: '#0d0d0d', bgSubtle: '#111611', bgMuted: '#161e16', elevated: '#0f140f',
  divider: '#002200', border: '#003300', borderStrong: '#004400',
}
const NME: NC = { // Memphis (cream warm)
  textPrimary: '#1a1a1a', textSecondary: '#444444', textTertiary: '#777777',
  textDisabled: '#aaaaaa', textInverse: '#fffef0',
  bg: '#fffef0', bgSubtle: '#f5f4e0', bgMuted: '#eae9d0', elevated: '#ffffff',
  divider: '#e0dfc0', border: '#d4d3a0', borderStrong: '#2d2d2d',
}
const NPI: NC = { // Pixel Art
  textPrimary: '#eaeaea', textSecondary: '#b0b0b0', textTertiary: '#707070',
  textDisabled: '#404040', textInverse: '#1a1a2e',
  bg: '#1a1a2e', bgSubtle: '#1e1e35', bgMuted: '#24243e', elevated: '#1c1c32',
  divider: '#2a2a45', border: '#343460', borderStrong: '#e94560',
}

const NEUTRALS: Record<ThemeStyle, NC> = {
  'minimalism': NL,          'neumorphism': NGR,       'glassmorphism': ND,
  'brutalism': NBR,          '3d-hyperrealism': ND,    'vibrant-block': NNN,
  'dark-oled': ND,           'accessible-ethical': NL, 'claymorphism': NL,
  'aurora': ND,              'retro': ND,              'flat': NL,
  'skeuomorphism': NWD,      'liquid-glass': NAP,      'motion-driven': ND,
  'micro-interactions': NL,  'inclusive-design': NL,   'zero-interface': NL,
  'soft-ui': NL,             'neubrutalism': NBR,      'bento': NL,
  'y2k': NVP,                'cyberpunk': NCY,         'organic-biophilic': NWL,
  'ai-native': ND,           'memphis': NME,           'vaporwave': NVP,
  'dimensional-layering': NL,'exaggerated-minimalism': NL, 'kinetic-typography': ND,
  'parallax-storytelling': ND, 'swiss-modernism-2': NL, 'hud-scifi': ND,
  'pixel-art': NPI,          'bento-grids': NL,        'spatial-ui': NAP,
  'e-ink': {
    textPrimary: '#1a1a1a', textSecondary: '#404040', textTertiary: '#666666',
    textDisabled: '#999999', textInverse: '#f5f5f0',
    bg: '#f5f5f0', bgSubtle: '#ebebd3', bgMuted: '#ddddc0', elevated: '#f0f0eb',
    divider: '#d4d4b8', border: '#c8c8b0', borderStrong: '#a0a080',
  },
  'gen-z-chaos': NBR,        'biomimetic': NL,
  'anti-polish': NWL,        'tactile-digital': NL,
  'nature-distilled': NWL,   'interactive-cursor': ND,
  'voice-first': ND,         '3d-product': NL,
  'gradient-mesh': NGA,      'editorial-grid': NL,
  'chromatic-aberration': NNN, 'vintage-analog': NWL,
}

export function getNeutralDefaults(id: ThemeStyle): Record<string, string> {
  const nc = NEUTRALS[id] ?? NL
  return {
    '--color-text-primary':          nc.textPrimary,
    '--color-text-secondary':        nc.textSecondary,
    '--color-text-tertiary':         nc.textTertiary,
    '--color-text-disabled':         nc.textDisabled,
    '--color-text-inverse':          nc.textInverse,
    '--color-neutral-bg':            nc.bg,
    '--color-neutral-bg-subtle':     nc.bgSubtle,
    '--color-neutral-bg-muted':      nc.bgMuted,
    '--color-neutral-elevated':      nc.elevated,
    '--color-neutral-divider':       nc.divider,
    '--color-neutral-border':        nc.border,
    '--color-neutral-border-strong': nc.borderStrong,
  }
}

export const FUNCTIONAL_TOKEN_DEFS = [
  { cssVar: '--color-success', label: 'Success', hint: 'Successful actions, completed states' },
  { cssVar: '--color-error',   label: 'Error', hint: 'Failed actions, error messages' },
  { cssVar: '--color-warning', label: 'Warning', hint: 'Needs attention, potential risk' },
  { cssVar: '--color-info',    label: 'Info', hint: 'General prompts, neutral information' },
  { cssVar: '--color-link',    label: 'Link', hint: 'Clickable link text' },
]

export function getFunctionalDefaults(id: ThemeStyle): Record<string, string> {
  const fc = FC[id] ?? LIGHT
  return {
    '--color-success': fc.success,
    '--color-error':   fc.error,
    '--color-warning': fc.warning,
    '--color-info':    fc.info,
    '--color-link':    fc.link,
  }
}

export function getDefaultTokens(id: ThemeStyle): Record<string, string> {
  const preset = getThemePreset(id)
  const base = Object.fromEntries(preset.tokens.map(t => [t.cssVar, t.value]))
  return { ...base, ...getNeutralDefaults(id), ...getFunctionalDefaults(id) }
}

export function isColorValue(value: string): boolean {
  return /^#[0-9a-fA-F]{3,8}$/.test(value)
}
