<template>
  <NuxtLayout>
    <main
      class="mx-auto md:max-w-3xl 2xl:max-w-4xl min-w-0 border-x border-zinc-200 dark:border-zinc-800 md:shadow"
    >
      <Title>{{ data.title }} - {{ config.title }}</Title>
      <div class="bg-inherit md:bg-white md:dark:bg-zinc-900 slideDown">
        <MyArtcleTitle
          :title="data.title"
          :date="data?.last ? data.last : data.date"
        />

        <ContentRenderer :value="data">
          <ContentRendererMarkdown
            :value="data"
            class="p-3 md:px-10 py-10 break-words prose 2xl:prose-lg dark:prose-invert dark:text-zinc-400 prose-pre:bg-gray-100 prose-pre:text-inherit dark:prose-pre:bg-zinc-600/30 max-w-full"
          />
        </ContentRenderer>

        <div class="grow px-4 md:pl-10">
          <div
            class="w-full h-1 border-t border-zinc-200 dark:border-zinc-600 inline-block align-middle"
          ></div>
        </div>

        <div class="py-10"></div>
        <div class="flex justify-center mt-5">
          <MyTimeDiff />
        </div>
        <div class="flex justify-center mt-5">
          <MyClubLink />
        </div>
        <div class="flex justify-center mt-5">
          <MySiteMap />
        </div>
        <div class="py-10"></div>
      </div>
      <MyViewer />
    </main>
  </NuxtLayout>
</template>
<script setup>
const { path } = useRoute();
const config = useAppConfig();
const { data } = await useAsyncData(path, () =>
  queryContent().where({ _path: path }).findOne()
);
</script>
<style>
.max-w-xs-5 {
  max-width: 5rem;
}
</style>
