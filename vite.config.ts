import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': '/src',
      '~bootstrap': 'bootstrap',
      "assets": '/src/assets',
      "components": '/src/components',
      "views": '/src/views',
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
                @import "/src/assets/sass/_variables.scss";
            `
      }
    }
  },

})
