<template>
  <div class="grid justify-items-center dark:brightness-50">
    <a :src="refinedSrc" data-fancybox="gallery" :data-caption="alt">
      <img :data-src="refinedSrc" src="/loading/OIP-C.jpg" data-sizes="auto" class="cursor-zoom-in lazyload" :title="alt"
        :alt="alt" />
    </a>
  </div>
</template>
<script setup>
const appConfig = useAppConfig()
const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  }
})

const refinedSrc = computed(() => {
  if (process.env.NODE_ENV === 'production') {
    // 除了 webp，其余图片均转为 WebP
    let tmp = props.src.toLowerCase()
    if (tmp.indexOf(".webp") > 0 || tmp.indexOf(".gif") > 0) {
      return `${appConfig.cloudimg}/${appConfig.domain}${props.src}?org_if_sml=1`
    } else {
      return `${appConfig.cloudimg}/${appConfig.domain}${props.src}?force_format=webp,jpeg&org_if_sml=1`
    }
  } else {
    return props.src
  }
})
</script>