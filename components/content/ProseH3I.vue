<template>
  <h3 :id="id">
    <a :href="`#${id}`" class="font-black no-underline">
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