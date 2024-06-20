<template>
  <h1 :id="id">
    <a :href="`#${id}`" class="my-hover-a font-black font-serif">
      <slot />
    </a>
  </h1>
</template>
<script setup>
defineProps({
  id: {
    type: String,
    default: ''
  }
})
</script>