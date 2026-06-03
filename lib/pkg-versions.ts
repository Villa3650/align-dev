export type VersionMap = Record<string, string>

/** Fallback versions used when the API call fails or times out. */
export const FALLBACK_VERSIONS: VersionMap = {
  // Frameworks
  next: '16',
  react: '19',
  vue: '3',
  nuxt: '4',
  svelte: '5',
  '@sveltejs/kit': '2',

  // Build tools
  vite: '6',
  rollup: '4',
  webpack: '5',

  // Language / types
  typescript: '6',
  '@types/node': '22',

  // CSS
  tailwindcss: '4',
  'styled-components': '6',
  scss: '0.2',

  // Component libs
  antd: '6',
  '@mui/material': '9',
  '@chakra-ui/react': '3',
  'element-plus': '2',
  'ant-design-vue': '4',
  'naive-ui': '2',
  daisyui: '5',

  // State
  zustand: '5',
  '@reduxjs/toolkit': '2',
  jotai: '2',
  pinia: '2',

  // Data fetching
  '@tanstack/react-query': '5',
  '@tanstack/vue-query': '5',
  swr: '2',

  // Toolchain
  eslint: '9',
  prettier: '3',
  '@biomejs/biome': '1',

  // i18n
  'next-intl': '4',
  i18next: '26',
  'vue-i18n': '11',
  '@nuxtjs/i18n': '10',
}

/**
 * Fetch latest npm versions from the /api/versions route.
 * Falls back to FALLBACK_VERSIONS on any error.
 */
export async function fetchVersions(): Promise<VersionMap> {
  try {
    const res = await fetch('/api/versions', { cache: 'no-store' })
    if (!res.ok) return FALLBACK_VERSIONS
    const data = await res.json() as VersionMap
    // Merge: API result takes precedence, fallbacks fill gaps
    return { ...FALLBACK_VERSIONS, ...data }
  } catch {
    return FALLBACK_VERSIONS
  }
}
