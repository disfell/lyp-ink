<template>
  <div>
    <div class="flex items-end space-x-4">
      <AppAvatar />
    </div>
    
    <h1
      class="text-xl font-bold tracking-tight text-gray-800 dark:text-gray-100"
    >
      Hello!
    </h1>
    <p class="text-gray-900 dark:text-gray-400">
      {{ appCf.site.intro }}
    </p>
  </div>
</template>

<script setup>
const appCf = useAppConfig()
</script>
