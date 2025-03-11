export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      imgServer: process.env.IMG_SERVER,
      apiServer: process.env.API_SERVER,
      imgCDN: process.env.IMG_CDN,
    },
  },

  css: ["~/assets/css/main.css"],

  modules: ["@nuxt/ui", "@nuxtjs/google-fonts", "@nuxtjs/fontaine", "@nuxt/content", "@vueuse/nuxt", "@vueuse/motion/nuxt", "@nuxt/eslint"],

  plugins: ["~/plugins/lazy-image.directive"],

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      htmlAttrs: {
        lang: "zh-Hans-CN",
        class: "h-full",
      },
      bodyAttrs: {
        class: "antialiased bg-gray-50 dark:bg-zinc-900 min-h-screen",
      },
      link: [
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "192x192", href: "/favicon-192x192.png" },
        { rel: "icon", type: "image/png", sizes: "512x512", href: "/favicon-512x512.png" },
        { rel: "apple-touch-icon", type: "image/png", href: "/apple-touch-icon.png" },
        { rel: "preconnect", href: "https://static.zeoseven.com", crossorigin: "anonymous" },
        { rel: "stylesheet", href: "https://static.zeoseven.com/zsft/88/main/result.css" },
      ],
    },
  },

  content: {
    highlight: {
      langs: ["json", "js", "ts", "html", "css", "vue", "shell", "mdc", "md", "yaml", "java", "xml"],
      // OR
      theme: {
        // Default theme (same as single string)
        default: "github-light",
        // Theme used if `html.dark`
        dark: "github-dark",
        // Theme used if `html.sepia`
        sepia: "monokai",
      },
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
