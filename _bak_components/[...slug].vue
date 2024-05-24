<template>
  <div v-if="data" class="container md:mx-auto">
    <Title>{{data.title}} - {{config.title}}</Title>
    <main class="md:flex my-10">
      <div class="pl-28 pr-10 hidden md:block dark:text-slate-300 font-black">
        <div class="sticky top-2">
          <ul class="mt-28">
            <p>Created In</p>
            <p>{{ new Date(data.date).toLocaleDateString() }}</p>
          </ul>
          <ul class="mt-10 hover:underline">
            <a href="https://www.travellings.cn/go.html" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mb-1 inline w-6 h-6 dark:stroke-slate-400" >
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              </svg>
              开往
            </a>
          </ul>
          <ul class="mt-5 hover:underline">
            <NuxtLink to="/records">
              <svg class="mb-1 inline w-6 h-6 dark:stroke-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Back
            </NuxtLink>
          </ul>
        </div>
      </div>
      
      <div class="md:pl-20 p-3 dark:border-slate-400">
        <div class="justify-center flex">
          <LazyMyBanner />
        </div>
        <ContentRenderer :value="data" tag="article">
          <ContentRendererMarkdown :value="data" class="mt-6 break-words prose 2xl:text-lg dark:prose-invert prose-pre:bg-gray-100 prose-pre:text-gray-500 dark:prose-pre:bg-black dark:prose-pre:text-slate-300" />
        </ContentRenderer>
        <div>
          <p class="text-center	border-y-2 mt-20 text-slate-400 text-sm py-5 px-5 dark:border-gray-700">
            Last Updated {{ data?.last ? new Date(data.last).toLocaleDateString() : new Date(data.date).toLocaleDateString()}}
          </p>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup>
const { path } = useRoute()
const config = useAppConfig()
const { data } = await useAsyncData(path, () => queryContent().where({ _path: path }).findOne())
</script>