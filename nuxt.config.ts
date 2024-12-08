export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    steamToken: process.env.STEAM_TOKEN,
    steamId: process.env.STEAM_ID,
    supabaseKey: process.env.SUPABASE_KEY,
    public: {
      imgServer: process.env.IMG_SERVER,
      imgCDN: process.env.IMG_CDN,
    },
  },

  css: ["~/assets/css/main.css"],

  modules: [
    "@nuxt/ui",
    "@nuxtjs/google-fonts",
    "@nuxtjs/fontaine",
    "@nuxt/content",
    "@vueuse/nuxt",
    "@vueuse/motion/nuxt",
  ],

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      htmlAttrs: {
        lang: "en",
        class: "h-full",
      },
      bodyAttrs: {
        class: "antialiased bg-gray-50 dark:bg-zinc-900 min-h-screen",
      },
      script: [{ src: "/js/lazyload.js" }],
      link: [],
    },
  },

  content: {
    highlight: {
      langs: [
        "json",
        "js",
        "ts",
        "html",
        "css",
        "vue",
        "shell",
        "mdc",
        "md",
        "yaml",
        "java",
        "xml",
      ],
      theme: "github-dark",
    },
  },

  googleFonts: {
    display: "swap",
    families: {
      Inter: [400, 500, 600, 700, 800, 900],
    },
  },

  compatibilityDate: "2024-11-27",
});
