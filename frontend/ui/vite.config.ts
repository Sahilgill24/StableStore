import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import csp from 'vite-plugin-csp'
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: process.env.VITE_SERVER_HOST
  }
})
