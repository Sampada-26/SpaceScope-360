import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      "/auth": {
        target: "http://localhost:5001",
        changeOrigin: true,
        secure: false,
      },
      "/api": {
        target: "http://localhost:5001",
        changeOrigin: true,
        secure: false,
      },
      "/translate": {
        target: "https://api.mymemory.translated.net",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/translate/, "/get"),
      }
    }
  }
});