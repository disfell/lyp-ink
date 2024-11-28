<template>
  <main class="min-h-screen">
    <AppHeader class="mb-12" title="Projects" :description="description" />
  </main>
</template>

<script setup>
const description = "TODO.";
useSeoMeta({
  title: "Projects | " + useAppConfig().site.title,
  description,
});

const { data: projects } = await useAsyncData("projects-all", () =>
  queryContent("/projects").find()
);
</script>
