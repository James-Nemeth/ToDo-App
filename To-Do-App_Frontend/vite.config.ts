/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/ToDo-App",
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./config/test-setup.ts",
  },
});
