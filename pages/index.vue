<template>
  <NuxtLayout>
    <div class="min-h-screen grid place-content-center">
      <Title>{{ appConfig.title }}</Title>
      <LazyMyBanner />
      <blockquote class="text-center text-xl leading-8 text-gray-900 dark:text-zinc-400 sm:text-2xl sm:leading-9">
        <p id="slogan_hidden" class="hidden">{{ appConfig.sloganHidden }}</p>
        <p id="slogan" class="font-black"></p>
      </blockquote>
      <img :data-src="refinedSrc"
        src="/loading/OIP-C.jpg"
        data-sizes="auto"
        class="lazyload mt-8 mx-auto h-20 w-20 border border-zinc-300 hover:border-zinc-400
        dark:border-slate-400 dark:hover:border-slate-300 rounded-lg hover:shadow-inner"/>
      <div class="py-3 divide-y divide-gray-300 dark:divide-gray-600 mt-4">
        <div></div>
        <div></div>
      </div>
      <MyNav />
      <div class="py-3 divide-y divide-gray-300 dark:divide-gray-600">
        <div></div>
        <div></div>
      </div>
      <MyStatus class="mt-5"/>
      <LazyMyClubLink />
    </div>
  </NuxtLayout>
</template>
<script setup>
const appConfig = useAppConfig()

let typeIt = ref()
onMounted(() => {
  typeIt = new TypeIt("#slogan", {
    strings: appConfig.sloganShow,
    waitUntilVisible: true,
    speed: 100
  }).go()
})

onUnmounted(()=>{
  typeIt.destroy(true)
})

const refinedSrc = computed(() => {
  if (process.env.NODE_ENV === 'production') {
    return `${appConfig.cloudimg}/${appConfig.domain}${appConfig.avatar}?force_format=webp,jpeg&org_if_sml=1`
  } else {
    return `${appConfig.avatar}`
  }
})

useHead({
  "meta": [
    { "name": "keywords", "content": "LYP.INK,Developer,Blogger,Blog,Personal Site,Nuxt.js,Vue.js,JavaScript,Tailwindcss" },
    { "name": "description", "content": "A developer, blogger" },
  ]
})
</script>