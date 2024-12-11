<template>
  <div class="text-sm p-4 bg-gray-100 dark:bg-gray-900 text-center">
    This component was inspired by
    <NuxtLink :to="link" class="underline font-medium" external target="_blank">
      {{ label }}
    </NuxtLink>
    .
  </div>
</template>

<script setup>
defineProps({
  label: String,
  link: String,
});
</script>
