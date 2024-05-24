<template>
  <h4 :id="id">
    <a :href="`#${id}`" class="hover-a font-black font-serif">
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