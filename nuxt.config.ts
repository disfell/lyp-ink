export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxt/ui",
    "@nuxtjs/google-fonts",
    "@nuxtjs/fontaine",
    "@nuxt/content",
    "@nuxthq/studio",
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
    },
  },

  content: {
    highlight: {
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