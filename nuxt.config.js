// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-07-29",
  runtimeConfig: {
    steamToken: process.env.STEAM_TOKEN,
    steamId: process.env.STEAM_ID,
    supabaseKey: process.env.SUPABASE_KEY,
    public: {
      thirdPartImgServ: process.env.THIRDPART_IMG_SERV,
      imgCDN: process.env.IMG_CDN,
      useRealtime: process.env.USE_SUPA_REALTIME,
      usePageRecord: process.env.USE_PAGE_RECORD,
      useSteamStatus: process.env.USE_STEAM_STATUS
    },
  },
  app: {
    rootId: "lyp-ink",
    head: {
      htmlAttrs: { lang: "zh-CN" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { "http-equiv": "content-type", content: "text/html; charset=utf-8" },
        {
          "http-equiv": "Content-Security-Policy",
          content: "upgrade-insecure-requests",
        },
        { name: "baidu-site-verification", content: "codeva-Dx6kYiCxUD" },
        { name: "msvalidate.01", content: "EF8C5B0B645D4CF400002BD3C4ADA832" },
      ],
      script: [
        { src: "/js/verifyTheme.js" },
        {
          src:
            process.env.NODE_ENV === "production"
              ? "/js/baidu_tongji_lyp_ink.js"
              : "",
        }
      ],
      link: [
        { rel: "shortcut icon", href: "/favicon.png" },
        { rel: "apple-touch-icon", href: "/favicon.png" },
        { rel: "bookmark", href: "/favicon.png" },
        { rel: "apple-touch-icon-precomposed", href: "/favicon.png" }
      ],
    },
  },
  css: ["~/assets/css/main.css", "~/assets/css/my-animate.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
    },
  },
  modules: ["@vueuse/nuxt", "@nuxt/content"],
  content: {
    defaultLocale: "zh-cn",
    documentDriven: {
      navigation: false,
      page: true,
      surround: false,
      injectPage: false,
    },
    navigation: false,
    markdown: {
      mdc: true,
      // https://content.nuxt.com/components/prose
      tags: {
        a: "ProseAI",
        h1: "ProseH1I",
        h2: "ProseH2I",
        h3: "ProseH3I",
        h4: "ProseH4I",
        h5: "ProseH5I",
        h6: "ProseH6I",
        img: "ProseImgI",
        code: "ProseCodeInlineI",
        strong: "ProseStrongI",
        blockquote: "ProseBlockquoteI",
      },
    },
  },
  nitro: {
    prerender: {
      routes: ["/sitemap.xml", "/feed"],
      crawlLinks: true,
      autoSubfolderIndex: false
    },
  },
  webpack: {
    analyze: {
      template: "treemap",
      projectRoot: "/<rootDir>",
      filename: "/<rootDir>/.nuxt/analyze/{name}.html",
    },
  },
});
