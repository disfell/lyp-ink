<template>
  <footer class="max-w-2xl mx-auto text-gray-400 dark:text-gray-600 text-sm text-center pb-8">
    <br />
    <p>© 2025 {{ appCf.site.title }}. All rights reserved.</p>
  </footer>
</template>
<script lang="ts" setup>
const appCf = useAppConfig();
</script>
