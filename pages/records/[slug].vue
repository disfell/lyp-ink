<template>
  <main class="min-h-screen">
    <div
      class="prose dark:prose-invert prose-blockquote:not-italic prose-pre:bg-gray-900">
      <button
        class="hover:scale-125 ease-in-out duration-150 delay-50 mb-8 hover:text-primary"
        @click="useRouter().back()">
        &larr; Back
      </button>

      <ContentDoc v-slot="{ doc }" tag="article">
        <article>
          <UDivider
            :label="doc.published"
            :ui="{ label: 'text-gray-500 dark:text-gray-400' }" />
          <div class="mb-8"></div>
          <ContentRenderer :value="doc" />
        </article>
      </ContentDoc>
    </div>
  </main>
</template>
<script setup>
const route = useRoute();
const { slug } = route.params;
const appCf = useAppConfig();
useSeoMeta({
  // ogImage: `https://fayazahmed.com/records/${slug}.png`,
  // twitterCard: "summary_large_image",
  articleAuthor: "LYP",
});
</script>
<style>
.prose h2 a,
.prose h3 a {
  @apply no-underline;
}
</style>
