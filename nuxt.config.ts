export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      imgServer: process.env.IMG_SERVER,
      imgCDN: process.env.IMG_CDN,
    },
  },

  modules: [
    "@nuxt/ui",
    "@nuxtjs/google-fonts",
    "@nuxtjs/fontaine",
    "@nuxt/content",
    "@vueuse/nuxt",
  ],

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      htmlAttrs: {
        lang: "en",
        class: "h-full",
      },
      bodyAttrs: {
        class: "antialiased bg-gray-50 dark:bg-black min-h-screen",
      },
      script: [{ src: "/js/lazyload.js" }],
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
