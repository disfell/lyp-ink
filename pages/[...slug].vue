<template>
  <NuxtLayout>
    <main v-if="data" class="mx-auto max-w-3xl min-w-0">
      <Title>{{data.title}} - {{config.title}}</Title>
      <div class="md:backdrop-blur-sm md:bg-zinc-50/30 md:dark:bg-zinc-700/30 md:shadow-inner py-10">
        
        <div class="flex justify-center">
          <LazyMyBanner />
        </div>

        <div class="flex mt-10">
          <div class="grow px-4 md:pl-10">
            <div class="w-full h-1 border-t border-dashed border-slate-300 dark:border-slate-600 inline-block align-middle"></div>
          </div>
          <div class="flex-none w-fit text-slate-400 text-sm dark:border-gray-700">
            编辑于{{ formatTime(data?.last ? data?.last : data.date) }}
          </div>
          <div class="grow px-4 md:pr-10">
            <div class="w-full h-1 border-t border-dashed border-slate-300 dark:border-slate-600 inline-block align-middle"></div>
          </div>
        </div>

        <ContentRenderer :value="data">
          <ContentRendererMarkdown :value="data"
            class="p-3 md:px-10 py-10 break-words prose 2xl:prose-lg dark:prose-invert prose-pre:bg-gray-100
            prose-pre:text-inherit dark:prose-pre:bg-zinc-600/30"/>
        </ContentRenderer>

        <div class="flex justify-center mt-10">
          <MyClubLink2 />
        </div>
      </div>

      <div class="fixed right-3 bottom-3">
        <div class="bg-slate-50 dark:bg-gray-400 grid place-content-center rounded-md">
          <NuxtLink to="/records" noPrefetch>
            <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </main>
  </NuxtLayout>
</template>
<script setup>
const { path } = useRoute()
const config = useAppConfig()
const { data } = await useAsyncData(path, () => queryContent().where({ _path: path }).findOne())
</script>