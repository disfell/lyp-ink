<template>
  <h2 :id="id">
    <a :href="`#${id}`" class="font-black no-underline">
      <slot />
    </a>
  </h2>
</template>
<script setup>
defineProps({
  id: {
    type: String,
    default: ''
  }
})
</script>