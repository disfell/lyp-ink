<template>
  <main class="min-h-screen">
    <div class="space-y-24">
      <HomeIntro />
      <HomeFeaturedRecords />
      <HomeBlogClub />
      <HomeGames />
      <HomeProvider />
      <HomeWallpaper />
      <UDivider label="感谢浏览~😊" :ui="{ label: 'text-gray-500 dark:text-gray-400' }" />
    </div>
  </main>
</template>
<script setup>
useSeoMeta({
  title: useAppConfig().site.title,
  description: useAppConfig().site.intro,
});
</script>
