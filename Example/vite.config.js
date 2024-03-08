import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import debugPlugin from './debugPlugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [		
	// debugPlugin(['views','validate']),
  vue()
]
})
