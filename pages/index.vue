<template>
  <main class="min-h-screen">
    <div class="space-y-24">
      <HomeIntro />
      <HomeFeaturedRecords />
      <HomeBlogClub />
      <HomeProvider />
    </div>
  </main>
</template>
<script setup>
useSeoMeta({
  title: useAppConfig().site.title,
  description: useAppConfig().site.intro,
});
</script>