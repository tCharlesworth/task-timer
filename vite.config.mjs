import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // can only have 1 input
        // stopwatches: './src/views/stopwatch/app.js',
        mainWindow: './src/views/main/mainApp.js'
      },
      output: {
        assetFileNames: '[name].[ext]',
        chunkFileNames: '[name].js',
        entryFileNames: '[name].js',
      }
    }
  },
  plugins: [vue()],
})