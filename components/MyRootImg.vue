<template>
  <img :alt="alt" :data-src="src" src="/loading/Search.gif" data-sizes="auto" :class="finalClass"/>
</template>
<script setup>
const isDark = useDark()
const props = defineProps({
  src: {
    default: "",
  },
  alt: {
    default: "lyp.ink",
  },
  class: {
    default: ""
  }
})

const classList = {
  '': 'inline-flex items-baseline h-8 w-8 jelly-effect-hover lazyload',
  'content.MyImgList': 'max-h-56 lg:max-h-64 rounded-md dark:brightness-50 lazyload',
  'content.MyImg': 'rounded-md dark:brightness-50 lazyload'
}

const finalClass = computed(() => {
  return classList[props.class]
})
</script>
