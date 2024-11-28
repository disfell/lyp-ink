<template>
  <div>
    <h2 class="uppercase text-xs font-semibold text-gray-400 mb-6">
      最近发布
    </h2>
    <ul class="space-y-16">
      <li v-for="(article, id) in records" :key="id">
        <AppArticleCard :article="article" />
      </li>
    </ul>
    <div class="flex items-center justify-center mt-6 text-sm">
      <UButton
        label="查看全部 &rarr;"
        to="/records"
        variant="link"
        color="gray"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { data: records } = await useAsyncData("records-home", () =>
  queryContent("/records")
    .sort({ published: -1 })
    .limit(3)
    .only(["title", "description", "published", "slug", "_path"])
    .find()
);
</script>
