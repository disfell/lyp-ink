<template>
  <div v-if="loading" class="flex items-center space-x-4">
    <div class="space-y-2">
      <USkeleton class="h-4 w-[250px]" />
      <USkeleton class="h-4 w-[230px]" />
      <USkeleton class="h-4 w-[200px]" />
    </div>
  </div>
</template>
<script setup>
defineProps({
  loading: {
    default: false,
    type: Boolean,
    required: false
  }
})
</script>