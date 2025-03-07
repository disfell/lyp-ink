export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("lazy-image", {
    mounted(el, binding) {
      const img = el;

      const originalWidth = img.style.width;
      const originalHeight = img.style.height;

      if (img.hasAttribute("need-load")) {
        const colorMode = useColorMode();
        const isDark = colorMode.preference === "light" ? false : true;
        img.src = isDark ? "/loading/light.svg" : "/loading/dark.svg";
      }

      if (img.hasAttribute("defaultWH")) {
        const defaultWH = img.getAttribute("defaultWH");
        const wh = defaultWH.split(",");
        const defaultWidth = wh[0];
        const defaultHeight = wh[1];
        img.style.width = defaultWidth;
        img.style.height = defaultHeight;
      }

      // 加载并缓存图片
      async function loadAndCacheImage(url) {

        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Failed to load image: ${response.statusText}`);
          }

          const blob = await response.blob();
          const imgURL = URL.createObjectURL(blob);

          img.src = imgURL;
        } catch (error) {
          console.error(`Error loading image: ${error.message}`);
          img.src = "/avatar.webp"; // 替换为默认图片路径
        } finally {
          if (originalWidth) {
            img.style.width = originalWidth;
          } else {
            img.style.removeProperty("width");
          }

          if (originalHeight) {
            img.style.height = originalHeight;
          } else {
            img.style.removeProperty("height");
          }
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