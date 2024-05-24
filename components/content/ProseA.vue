<script setup>
defineProps({
  href: {
    type: String,
    default: ''
  }
})
</script>
<template>
  <a :href="href" target="_blank"
    class="font-semibold not-italic hover-a bg-clip-text text-transparent
      bg-gradient-to-r from-stone-950 to-amber-500 dark:from-stone-100 dark:to-stone-400/80">
    <slot />
  </a>
</template>