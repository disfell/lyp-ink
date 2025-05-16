<template>
  <main class="min-h-screen">
    <div class="prose dark:prose-invert prose-blockquote:not-italic prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900 break-words">
      <button class="hover:scale-125 ease-in-out duration-150 delay-50 mb-8 hover:text-primary" @click="useRouter().back()">&larr; Back</button>
      <article>
        <USeparator :label="doc.published" :ui="{ label: 'text-gray-500 dark:text-gray-400' }" class="mx-auto" />
        <div class="mb-8"></div>
        <ContentRenderer :value="doc" class="w-full">
          <ContentRendererMarkdown :value="doc" />
        </ContentRenderer>
      </article>
    </div>
  </main>
</template>
<script setup>
const route = useRoute();
const appCf = useAppConfig();
const { data: doc } = await useAsyncData(route.path, () => queryContent(route.path).findOne());
useSeoMeta({
  title: doc.value.title + " | " + useAppConfig().site.title,
  articleAuthor: appCf.site.title,
});
</script>
<style>
.prose h2 a,
.prose h3 a {
  @apply no-underline;
}

.prose {
  max-width: 100%;
}
</style>
