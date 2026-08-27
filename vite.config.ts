import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const resolvePath = (relative: string) =>
  fileURLToPath(new URL(relative, import.meta.url))

export default defineConfig({
  define: { __DEV__: JSON.stringify(true) },
  plugins: [react()],
  resolve: {
    // Rosetta must be a single instance: several @sqs packages depend on it and
    // pnpm keeps peer variations, which would otherwise give the app more than
    // one ThemeContext — Renovations components would then render unthemed.
    dedupe: [
      'react',
      'react-dom',
      '@sqs/rosetta-compositions',
      '@sqs/rosetta-elements',
      '@sqs/rosetta-glyphs',
      '@sqs/rosetta-icons',
      '@sqs/rosetta-primitives',
      '@sqs/rosetta-react',
      '@sqs/rosetta-styled',
      '@sqs/rosetta-themes',
      '@sqs/rosetta-utilities',
    ],
    alias: {
      // Source ported from sqsp/config-frontend. Aliased on its published
      // package name so the ported files keep their original imports.
      '@sqs/dashboard-framework': resolvePath(
        './src/vendor/dashboard-framework/src/index.ts',
      ),
      '@sqs/dashboard-components': resolvePath(
        './src/vendor/dashboard-components/src/index.ts',
      ),
      '@sqs/home-dashboard': resolvePath('./src/vendor/home-dashboard/src/index.ts'),
    },
  },
  // The ported source pulls in a wide set of internal packages, several of them
  // only through the widget registry's dynamic imports. Declaring them up front
  // keeps the optimizer to a single pass — otherwise it re-bundles as it
  // discovers each one and already-loaded modules 504 on a stale hash.
  optimizeDeps: {
    // Squarespace packages `require()` their compiled YAML translation bundles
    // for every locale. esbuild has no YAML loader, so dep optimization fails
    // outright and every dependency 504s. The prototype is English-only and
    // falls back to the inline source strings, so these resolve to nothing.
    esbuildOptions: {
      loader: { '.yaml': 'empty' },
    },
    include: [
      'react',
      'react-dom',
      'react-dom/client',
      'react-router-dom',
      '@sqs/config-context/account',
      '@sqs/config-context/website',
      '@sqs/config-ui-preferences-ts-client',
      '@sqs/config-sentry-integration',
      '@sqs/enums/AccessPermissions',
      '@sqs/enums/ButtonVariant',
      '@sqs/enums/StatusConstants',
      '@sqs/enums/Team',
      '@sqs/enums/WebsiteRole',
      '@sqs/i18n-react',
      '@sqs/rosetta-compositions',
      '@sqs/rosetta-elements',
      '@sqs/rosetta-glyphs',
      '@sqs/rosetta-icons',
      '@sqs/rosetta-primitives',
      '@sqs/rosetta-react',
      '@sqs/rosetta-react/button/next',
      '@sqs/rosetta-react/text/next',
      '@sqs/rosetta-styled',
      '@sqs/rosetta-themes',
      '@sqs/rosetta-utilities',
      '@sqs/tracing',
      '@sqs/universal-utils',
    ],
  },
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 3001,
    strictPort: false,
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return
        if (warning.code === 'UNRESOLVED_IMPORT' && warning.message.includes('@react-aria')) return
        warn(warning)
      }
    }
  }
})
