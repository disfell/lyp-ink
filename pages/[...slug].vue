<template>
  <NuxtLayout>
		<main v-if="data" class="mx-auto max-w-4xl min-w-0">
      <Title>{{data.title}} - {{config.title}}</Title>
      <div class="md:bg-zinc-50/40 md:dark:bg-zinc-700/30 md:shadow-inner slideDown pt-8">
        
        <!-- <div class="flex justify-center">
          <LazyMyBanner />
        </div> -->

        <div class="text-center text-6xl font-bold dark:text-zinc-400 my-10">{{ data.title }}</div>
        <div class="flex items-center justify-center space-x-2 dark:text-zinc-400 my-10">
          <svg class="h-4 w-4 self-center" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <span class="text-center text-sm">{{ formatTime(data?.last ? data.last : data.date) }}</span>
        </div>

        <div class="grow px-4 md:pl-10">
          <div class="w-full h-1 border-t border-zinc-200 dark:border-zinc-600 inline-block align-middle"></div>
        </div>

        <ContentRenderer :value="data">
          <ContentRendererMarkdown :value="data"
            class="p-3 md:px-10 py-10 break-words prose 2xl:prose-lg dark:prose-invert dark:text-zinc-400 prose-pre:bg-gray-100
            prose-pre:text-inherit dark:prose-pre:bg-zinc-600/30 slideDown"/>
        </ContentRenderer>

        <div class="grow px-4 md:pl-10">
          <div class="w-full h-1 border-t border-zinc-200 dark:border-zinc-600 inline-block align-middle"></div>
        </div>

        <div class="flex justify-center mt-10">
          <MyClubLink />
        </div>
        <div class="flex justify-center mt-5">
          <MySiteMap />
        </div>
      </div>
      <MyViewer />
    </main>
  </NuxtLayout>
</template>
<script setup>
const { path } = useRoute()
const config = useAppConfig()
const { data } = await useAsyncData(path, () => queryContent().where({ _path: path }).findOne())
</script>