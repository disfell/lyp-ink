<template>
  <NuxtLayout>
    <main v-if="data" class="mx-auto max-w-3xl min-w-0">
      <Title>{{data.title}} - {{config.title}}</Title>
      <div class="md:backdrop-blur-sm md:bg-zinc-50/30 md:dark:bg-zinc-700/30 md:shadow-inner py-10 slideDown">
        
        <div class="flex justify-center">
          <LazyMyBanner />
        </div>

        <div class="flex mt-10">
          <div class="grow px-4 md:pl-10">
            <div class="w-full h-1 border-t border-dashed border-slate-300 dark:border-slate-600 inline-block align-middle"></div>
          </div>
          <div class="flex-none w-fit text-slate-400 text-sm dark:border-gray-700">
            创建于{{ formatTime(data.date) }}
          </div>
          <div class="grow px-4 md:pr-10">
            <div class="w-full h-1 border-t border-dashed border-slate-300 dark:border-slate-600 inline-block align-middle"></div>
          </div>
        </div>

        <ContentRenderer :value="data">
          <ContentRendererMarkdown :value="data"
            class="p-3 md:px-10 py-10 break-words prose 2xl:prose-lg dark:prose-invert prose-pre:bg-gray-100
            prose-pre:text-inherit dark:prose-pre:bg-zinc-600/30 slideDown"/>
        </ContentRenderer>

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