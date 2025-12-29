import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    ViteImageOptimizer({
      png: {
        quality: 80,
        progressive: true,
        compressionLevel: 9,
      },
      jpeg: {
        quality: 80,
        progressive: true,
      },
      jpg: {
        quality: 80,
        progressive: true,
      },
      webp: {
        quality: 80,
        lossless: false,
      },
      // Include more optimizations for production
      ...(mode === "production" && {
        avif: {
          quality: 50,
          lossless: false,
        },
        // Enable more aggressive optimizations in production
        png: {
          quality: 70,
          progressive: true,
          compressionLevel: 9,
        },
        jpeg: {
          quality: 70,
          progressive: true,
        },
        jpg: {
          quality: 70,
          progressive: true,
        },
        webp: {
          quality: 70,
          lossless: false,
        },
      }),
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    assetsInlineLimit: 4096, // 4kb
    rollupOptions: {
      output: {
        manualChunks: {
          // Group vendor libraries together to avoid context issues
          vendor: ["react", "react-dom", "@tanstack/react-query"],
          // Group UI components together
          ui: [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-tooltip",
          ],
        },
      },
    },
  },
}));
