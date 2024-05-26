import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    css: {
      preprocessorOptions: {
        css: {
          additionalData: `@import "@hexlet/chatbot-v2/stylesh";`
        }
      }
    },
  },
})
