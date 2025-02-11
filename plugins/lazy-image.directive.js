export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("lazy-image", {
    mounted(el, binding) {
      const img = el;
      const cache = new Map();

      // 加载并缓存图片
      async function loadAndCacheImage(url) {
        if (cache.has(url)) {
          img.src = cache.get(url);
          return;
        }

        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Failed to load image: ${response.statusText}`);
          }

          const blob = await response.blob();
          const imgURL = URL.createObjectURL(blob);

          cache.set(url, imgURL);
          img.src = imgURL;
        } catch (error) {
          console.error(`Error loading image: ${error.message}`);
          img.src = "/path/to/default-image.jpg"; // 替换为默认图片路径
        }
      }

      // 使用 Intersection Observer 检测图片是否进入视口
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadAndCacheImage(binding.value);
            observer.unobserve(img);
          }
        });
      }, {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      });

      observer.observe(img);
    },
  });
});