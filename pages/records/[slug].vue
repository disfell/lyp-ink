<template>
  <main class="min-h-screen">
    <div
      class="prose dark:prose-invert prose-blockquote:not-italic prose-pre:bg-gray-900"
    >
      <button
        class="hover:scale-125 ease-in-out duration-150 delay-50 mb-8"
        @click="useRouter().back()"
      >
        &larr; back
      </button>

      <ContentDoc v-slot="{ doc }" tag="article">
        <article>
          <h1>{{ doc.title }}</h1>
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
