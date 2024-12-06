/*
 * ZSFT 超小~型CSS冗余器 Version 3 (LICENSE: MIT, by 秋, zeoseven.com)
 * CDN 载入出错时直接由源服务器提供文件
 */

((z, s, f, t) => {
  setTimeout(() => {
    let $ = document.head; let a = (b, c) => {
      if (s === 0) {
        let d = document.createElement('link'); d.rel = 'stylesheet'; d.href = "https://static" + b + "zeoseven.com/zsft/209/main/result.css";
        d.onerror = function () { $.removeChild(d); a(c); s++; }; $.appendChild(d);
      };
    }; a(z[0], z[1]); $.appendChild(document.createElement('style')).innerHTML = `${f}{font-family:${t}}`;
  }, 0);
})(['.', '-host.'], 0,
  // 传入 font-family ，可修改为 serif, monospace 等 CSS 语法。
  "'Sarasa Mono K', system-ui, sans-serif",
  // 传入字体应用的目标元素，可修改为类名或 id ，如 .box, #box, .box:hover 等 CSS 语法。
  "body"
);