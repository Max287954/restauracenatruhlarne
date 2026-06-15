import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

export default defineConfig({
  site: "https://restauracenatruhlarne.cz",
  output: "static",
  trailingSlash: "always",
  build: {
    assets: "assets",
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
        "@data": fileURLToPath(new URL("./src/data", import.meta.url)),
        "@styles": fileURLToPath(new URL("./src/styles", import.meta.url)),
        "@layouts": fileURLToPath(new URL("./src/layouts", import.meta.url)),
      },
    },
  },

  image: {
    domains: ["images.unsplash.com"],
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "cs",
        locales: {
          cs: "cs-CZ",
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: "cs",
    locales: ["cs"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
