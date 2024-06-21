<template>
  <h4 :id="id">
    <a :href="`#${id}`" class="my-hover-a font-black font-serif no-underline">
      <slot />
    </a>
  </h4>
</template>
<script setup>
defineProps({
  id: {
    type: String,
    default: ''
  }
})
</script>