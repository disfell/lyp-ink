// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    steamToken: '5DAD723252C842E593C878C79EFE179F',
    steamId: '76561199109983986',
    supabaseAnnoKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndieXhsdGN3c3N1c2RheXdpc3BlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc3MjU0NzcsImV4cCI6MjAzMzMwMTQ3N30.k3wZYezUISBhadwguP978NCqfSMFmKhscrTYQ_nFcDE',
    supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndieXhsdGN3c3N1c2RheXdpc3BlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNzcyNTQ3NywiZXhwIjoyMDMzMzAxNDc3fQ.-eMYgsyomyralCftLprDOzV89B-pRaqNGY595opqq1Y'
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
        { src: 'https://cdn.bootcdn.net/ajax/libs/fancyapps-ui/5.0.16/fancybox/fancybox.umd.js' },
        { src: 'https://cdn.bootcdn.net/ajax/libs/typeit/8.7.1/index.umd.min.js' },
        // { src: 'https://unpkg.com/@popperjs/core@2' },
        { src: 'https://cdn.bootcdn.net/ajax/libs/lazysizes/5.3.2/lazysizes.min.js' },
        { src: 'https://cdn.bootcdn.net/ajax/libs/lazysizes/5.3.2/plugins/parent-fit/ls.parent-fit.min.js' },
        { src: process.env.NODE_ENV === 'production' ? '/js/baidu_tongji_lyp_ink.js' : ''}
      ],
      link: [
        { "rel": 'shortcut icon', "href": "/favicon.png"},
        { "rel": 'apple-touch-icon', "href": "/favicon.png"},
        { "rel": 'bookmark', "href": "/favicon.png"},
        { "rel": 'apple-touch-icon-precomposed', "href": "/favicon.png"},
        { "rel": "stylesheet", "href": "https://fonts.loli.net/css2?family=Noto+Sans:wght@200;300;400;500;600;700;800;900&display=swap"},
        { "rel": "stylesheet", "href": "https://cdn.bootcdn.net/ajax/libs/fancyapps-ui/5.0.16/fancybox/fancybox.min.css"},
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
        img: 'ProseImg',
        a: 'ProseA',
        h1: 'ProseH1',
        h2: 'ProseH2',
        h3: 'ProseH3',
        h4: 'ProseH4',
        h5: 'ProseH5',
        h6: 'ProseH6',
        code: 'ProseCode'
      }
    }
  },
  nitro: {
    prerender: {
      routes: ['/sitemap.xml','/feed'],
      crawlLinks: true
    }
  }
})