<template>
  <h6 :id="id">
    <a :href="`#${id}`" class="hover-a font-black font-serif">
      <slot />
    </a>
  </h6>
</template>
<script setup>
defineProps({
  id: {
    type: String,
    default: ''
  }
})
</script>