<template>
  <img :src="src" :alt="alt" :class="finalClass"/>
</template>
<script setup>
const props = defineProps({
  src: {
    default: "",
  },
  alt: {
    default: "",
  },
  class: {
    default: ""
  }
})

const classList = {
  '': '',
  'content.MyImgList': 'max-h-40 shadow-lg rounded-lg dark:brightness-50'
}

const finalClass = computed(() => {
  return classList[props.class]
})
</script>
