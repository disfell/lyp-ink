<template>
  <h3 :id="id">
    <a :href="`#${id}`" class="font-black no-underline dark:text-zinc-400">
      <slot />
    </a>
  </h3>
</template>
<script setup>
defineProps({
  id: {
    type: String,
    default: ''
  }
})
</script>