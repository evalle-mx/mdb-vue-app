import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // IMPORTANT for AWS S3 static hosting:
  // Using a relative base ('./') means the built asset URLs (JS/CSS) are
  // relative rather than absolute ('/assets/...'). This lets the site work
  // regardless of whether it's hosted at the bucket root or in a sub-folder,
  // and avoids 404s when S3 serves the bucket directly (no server rewrites).
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Keep the build simple/predictable for a static hosting target
    sourcemap: false
  }
})
