import path from 'path'
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/**/*.ts', '!src/generated/prisma/**'],
  outDir: 'build',
  external: ['@/generated/prisma'],
  esbuildOptions(options) {
    options.alias = {
      '@': path.resolve(__dirname, 'src'),
    }
  }
})