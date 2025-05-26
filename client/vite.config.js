import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    plugins: [react()],
    server: {
      proxy: isDev ? {
        "/api": {
          target: "http://localhost:5000",
          changeOrigin: true,
        },
        "/socket.io": {
          target: "http://localhost:5000",
          changeOrigin: true,
          ws: true,
        },
      }
      : undefined
    },
  };
});
