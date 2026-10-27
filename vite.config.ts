import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { routeHtmlPlugin } from './seo/route-html-plugin.mjs'
import { createRequire } from 'node:module'

const { verifyHeader } = createRequire(import.meta.url)(path.resolve(__dirname, 'scripts/header-release.cjs'))
verifyHeader({
  releaseRoot: path.resolve(__dirname, 'packages/site-header/lib'),
  assetsRoot: path.resolve(__dirname, 'public/brand'),
  sourceRoot: path.resolve(__dirname, 'packages/site-header'),
})


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    routeHtmlPlugin(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
