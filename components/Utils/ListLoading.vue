<template>
  <div v-if="loading" class="flex items-center space-x-4 my-16">
    <div class="space-y-2">
      <USkeleton class="h-4 w-[250px]" :ui="{ background: 'bg-gray-200' }"/>
      <USkeleton class="h-4 w-[230px]" :ui="{ background: 'bg-gray-200' }"/>
      <USkeleton class="h-4 w-[200px]" :ui="{ background: 'bg-gray-200' }"/>
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