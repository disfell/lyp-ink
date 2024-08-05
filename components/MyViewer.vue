<template>
  <div></div>
</template>
<script setup>
const conf = useRuntimeConfig();
const { path } = useRoute();
onMounted(async () => {
  if (conf.public.usePageRecord == "true") {
    try {
      const resp = await fetch("/api/view", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: path }),
      });
    } catch (error) {
      console.log(error);
    }
  }
});
</script>
