import { defineConfig } from 'vite';
const path = require("path");
import vue from '@vitejs/plugin-vue';
// import { createVuePlugin as vue } from "vite-plugin-vue2";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});