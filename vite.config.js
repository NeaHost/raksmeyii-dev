import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/raksmeyii-dev", // Set the base URL for deployment
  resolve: {
    alias: {
      components: "/src/components",
      layouts: "/src/layouts",
      pages: "/src/pages",
    },
  },
});
