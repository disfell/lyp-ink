<template>
  <NuxtLayout>
    <div class="min-h-screen grid place-content-center slideDown">
      <Title>{{ appConfig.title }}</Title>
      <div
        class="md:px-36 md:py-12 md:shadow bg-inherit md:bg-white md:dark:bg-zinc-900 border-zinc-300 dark:border-zinc-600 md:rounded-2xl transition ease-in-out delay-150"
      >
        <LazyMyBanner />
        <blockquote
          class="text-center text-xl leading-8 text-gray-900 dark:text-zinc-400 sm:text-2xl sm:leading-9"
        >
          <p id="slogan" class="font-black"></p>
        </blockquote>

        <img
          :data-src="refinedSrc"
          src="/loading/OIP-C.jpg"
          data-sizes="auto"
          alt=""
          class="lazyload my-8 mx-auto h-24 w-24 rounded-full outline outline-2 outline-offset-4 outline-zinc-800/80 dark:outline-zinc-500/50"
        />

        <div class="py-3 divide-y divide-gray-300 dark:divide-gray-600 mt-4">
          <div></div>
          <div></div>
        </div>
        <MyNav />
        <div class="py-3 divide-y divide-gray-300 dark:divide-gray-600">
          <div></div>
          <div></div>
        </div>
        <MyStatus class="mt-5" />
      </div>
      <LazyMyClubLink class="rb" />
      <MyViewer />
    </div>
  </NuxtLayout>
</template>
<script setup>
const appConfig = useAppConfig();
let typeIt = ref();
onMounted(() => {
  typeIt = new TypeIt("#slogan", {
    strings: appConfig.sloganShow,
    waitUntilVisible: true,
    speed: 100,
  }).go();
});

onUnmounted(() => {
  typeIt.destroy(true);
});

const refinedSrc = computed(() => {
  if (process.env.NODE_ENV === "production") {
    return `${appConfig.cloudimg}/${appConfig.domain}${appConfig.avatar}?force_format=webp,jpeg&org_if_sml=1`;
  } else {
    return `${appConfig.avatar}`;
  }
});

useHead({
  meta: [
    {
      name: "keywords",
      content:
        "LYP.INK,Developer,Blogger,Blog,Personal Site,Nuxt.js,Vue.js,JavaScript,Tailwindcss",
    },
    { name: "description", content: "A developer, blogger" },
  ],
});
</script>
