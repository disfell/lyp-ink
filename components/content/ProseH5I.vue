<template>
  <h5 :id="id">
    <a :href="`#${id}`" class="font-black no-underline dark:text-zinc-400">
      <slot />
    </a>
  </h5>
</template>
<script setup>
defineProps({
  id: {
    type: String,
    default: "",
  },
});
</script>
