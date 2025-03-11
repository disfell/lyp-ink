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

        let isloaded = false;
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Failed to load image: ${response.statusText}`);
          }

          const blob = await response.blob();
          const imgURL = URL.createObjectURL(blob);

          img.src = imgURL;
          isloaded = true;
        } catch (error) {
          console.error(`Error loading image: ${error.message}`);
        } finally {
          if (originalWidth) {
            img.style.width = originalWidth;
          } else {
            if (isloaded) {
              img.style.removeProperty("width");
            }
          }

          if (originalHeight) {
            img.style.height = originalHeight;
          } else {
            if (isloaded) {
              img.style.removeProperty("height");
            }
          }
          if (!isloaded) {
            handleImageError(img);
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


function handleImageError(imgElement) {
  const altText = imgElement.getAttribute("remark");
  if (altText === null || altText.trim() === "") {
    return;
  }

  const firstChar = altText.charAt(0) || "N";
  const parent = imgElement.parentNode;

  // 创建新元素并继承 class 和样式
  const placeholder = document.createElement("div");

  // 1. 复制 class 属性
  placeholder.className = imgElement.className; // 继承所有 class

  // 2. 复制内联样式（如 style="width: 100px;"）
  placeholder.style.cssText = imgElement.style.cssText;

  // 3. 设置内容及样式增强
  placeholder.textContent = firstChar;
  placeholder.setAttribute("role", "img"); // 增强可访问性
  placeholder.setAttribute("aria-label", altText);

  // 4. 模拟 <img> 的默认布局行为（inline-block）
  placeholder.style.display = imgElement.style.display; // 避免破坏原有布局
  placeholder.style.display = "inline-block";
  placeholder.style.verticalAlign = "middle"; // 对齐方式与图片一致
  placeholder.style.textAlign = "center"; // 水平居中
  placeholder.style.lineHeight = imgElement.offsetHeight + "px"; // 垂直居中

  adjustFontSizeToFit(placeholder, imgElement.offsetWidth, imgElement.offsetHeight);

  // 替换原图
  parent.replaceChild(placeholder, imgElement);
}

function adjustFontSizeToFit(element, maxWidth, maxHeight) {
  let fontSize = Math.min(maxWidth, maxHeight); // 初始字体大小
  let isFitting = false;

  // 循环缩小字体直至适配容器
  while (!isFitting && fontSize > 0) {
    element.style.fontSize = fontSize + "px";

    // 检测文字是否超出容器
    const textWidth = element.scrollWidth;
    const textHeight = element.scrollHeight;

    if (textWidth <= maxWidth && textHeight <= maxHeight) {
      isFitting = true;
    } else {
      fontSize -= 1;
    }
  }

  appendCssText(element, "font-family: system-ui;");
}

function appendCssText(element, newStyles) {
  let originalCss = element.style.cssText;
  // 若原样式非空且不以分号结尾，则补上分号
  if (originalCss && !originalCss.endsWith(";")) {
    originalCss += ";";
  }
  element.style.cssText = originalCss + newStyles;
}