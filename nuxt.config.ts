// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    steamToken: '5DAD723252C842E593C878C79EFE179F',
    steamId: '76561199109983986',
    supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndieXhsdGN3c3N1c2RheXdpc3BlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNzcyNTQ3NywiZXhwIjoyMDMzMzAxNDc3fQ.-eMYgsyomyralCftLprDOzV89B-pRaqNGY595opqq1Y',
    public: {
      useRealtime: process.env.USE_SUPA_REALTIME,
      useImgCDN: process.env.USE_IMG_CDM,
      usePageRecord: process.env.USE_PAGE_RECORD
    }
  },
  app: {
    rootId: "lyp-ink",
    head: {
      "htmlAttrs": {"lang": "zh-CN"},
      "meta": [
        { "charset": "utf-8" },
        { "name": "viewport", "content": "width=device-width, initial-scale=1" },
        { "http-equiv": "content-type", "content": "text/html; charset=utf-8" },
        { "http-equiv": "Content-Security-Policy", "content": "upgrade-insecure-requests" },
        { "name": "baidu-site-verification", "content": "codeva-Dx6kYiCxUD" },
        { "name": "msvalidate.01", "content": "EF8C5B0B645D4CF400002BD3C4ADA832" }
      ],
      script: [
        { src: '/js/verifyTheme.js'},
        { src: '/js/fancybox/index.js' },
        { src: '/js/typeit/index.js' },
        { src: process.env.NODE_ENV === 'production' ? '/js/baidu_tongji_lyp_ink.js' : ''}
      ],
      link: [
        { "rel": 'shortcut icon', "href": "/favicon.png"},
        { "rel": 'apple-touch-icon', "href": "/favicon.png"},
        { "rel": 'bookmark', "href": "/favicon.png"},
        { "rel": 'apple-touch-icon-precomposed', "href": "/favicon.png"},
        { "rel": "stylesheet", "href": "/js/fancybox/index.css"},
      ]
    }
  },
  css: ['~/assets/css/main.css','~/assets/css/my-animate.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
    }
  },
  modules: [
    '@vueuse/nuxt',
    '@nuxt/content'
  ],
  content: {
    defaultLocale: "zh-cn",
    documentDriven: {
      navigation: false,
      page: true,
      surround: false,
      injectPage: false
    },
    navigation: false,
    // highlight: {
      // theme: {
        // https://github.com/shikijs/shiki/blob/main/docs/themes.md
        // default: 'github-light',
        // dark: 'nord'
      // }
    // },
    markdown: {
      mdc: true,
      tags: {
        a: 'ProseAI',
        h1: 'ProseH1I',
        h2: 'ProseH2I',
        h3: 'ProseH3I',
        h4: 'ProseH4I',
        h5: 'ProseH5I',
        h6: 'ProseH6I',
        img: 'ProseImgI',
        code: 'ProseCodeInlineI',
        strong: 'ProseStrongI'
      }
    }
  },
  nitro: {
    prerender: {
      routes: ['/sitemap.xml','/feed'],
      crawlLinks: true
    }
  },
  vite: {
    server: {
      hmr: {
            clientPort: 3000,
            port: 3000
      }
    }  
  }
})