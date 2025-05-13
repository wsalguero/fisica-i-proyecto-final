import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
  },
  server: {
    // útil localmente pero no afecta a producción
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  // 👇 IMPORTANTE para Vercel y SPAs
  base: "/",
  optimizeDeps: {
    include: ["three"],
  },
});
