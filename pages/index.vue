<template>
  <main class="min-h-screen">
    <div class="space-y-24">
      <HomeIntro />
      <HomeFeaturedRecords />
      <HomeGames />
      <HomeProvider />
      <HomeBlogClub />
      <HomeWallpaper />
      <UDivider :ui="{ label: 'text-gray-500 dark:text-gray-400' }" label="感谢浏览~😊" />
    </div>
  </main>
</template>
<script setup>
useSeoMeta({
  title: useAppConfig().site.title,
  description: useAppConfig().site.intro,
});
</script>
