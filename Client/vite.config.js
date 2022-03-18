import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ContextMenu from '@imengyu/vue3-context-menu'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { vfmPlugin } from 'vue-final-modal'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),ContextMenu,FontAwesomeIcon,vfmPlugin],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
