---
title: 网站优化记录
published: 2019/05/12
last: 2023/10/11
---

记录下构建网站的想法、方案以及找到的一些资料。

# 静态文件加速

**JS&CSS**

目前用到这两个CDN加速

- [CDN-staticfile](https://staticfile.org/?ln=zh)
- [CDN-bootcdn](https://www.bootcdn.cn/)

***

**字体**

参考 [前端 CDNJS 库及 Google Fonts、Ajax 和 Gravatar 国内加速服务](https://u.sb/css-cdn/)

```html
<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
<!-- 替换为 -->
<link href='https://fonts.loli.net/css?family=Open+Sans' rel='stylesheet'>
```

# 图片懒加载

之前有用过这个段代码实现，但是效果差强人意，貌似浏览器有自己的策略。

```html
<img decoding="async" src="URL" loading="eager|lazy">
```

后来采用的是 [lazysizes](https://github.com/aFarkas/lazysizes) 这个库，实用。

# 图片格式选择

发现一点，同样的截图、大图，PNG 格式的传输大小要比 JPEG 格式大得多，为提高图片的传输效率，~~我的大图尽量选择 JPEG 格式~~。

> Where PNGs are most frequently used is with small images, like web icons, where the lossless compression ensures crisp, clear imagery; PNGs are also used when a transparent background is needed to surround a central image (e.g., when using sprites).
> 参考：[JPEG_vs_PNG](https://www.diffen.com/difference/JPEG_vs_PNG)

后来知道了这个 WebP 格式，我发现知乎、哔哩哔哩等网站都有在用，该格式支持更好的压缩效果，可节省更多的服务器流量。

# 图床

~~服务器带宽不足时，尝试寻找较为靠谱的图床作为第三方存储，很多图床可免费使用。~~

取消图床的使用，图片还是自己管理比较好。

# CDN

Content Delivery Network， CDN加速可以改善静态文件的响应速度，网站防护方面可以提高网站攻击的成本。

传统的网站访问过程为:

- 用户在浏览器中输入要访问的域名;  
- 浏览器向域名解析服务器发出解析请求，获得此域名对应的 IP 地址;  
- 浏览器利用所得到的 IP 地址，向该 IP 对应的服务器发出访问请求;  
- 服务器对此响应，将数据回传至用户浏览器端显示出来。  

与传统访问方式不同，CDN 网络则是在用户和服务器之间增加 Cache 层，将用户的访问请求引导到 Cache 节点而不是服务器源站点，且该节点是所有节点里，距离请求地址比较近的一个节点，以此来降低网络传输的消耗。要实现这一目的，主要是通过接管 DNS 实现。

# Cloudimage

> [Cloudimage](https://www.cloudimage.io/en/home) works on a pull basis, meaning that upon first load of an image via a Cloudimage URL, the image is downloaded by the Cloudimage resizing infrastructure, optimised and cached in the CDN.

它的具体用处如下图

![](/imgs/2019/web-optimize/1.webp)

使用方式：
- 图片源地址 URL=https://xx.cn/xx.png
- 改代理地址 URL=https://token.cloudimg.io/https://xx.cn/xx.png

原理还是 CDN 那套，实测速度也还行吧，主要是以下两点有必要：
- 提供 WebP 格式压缩与响应
- 提供图片缓存，减小源服务器流量

![](/imgs/2019/web-optimize/2.webp)

每个注册用户免费享有25G/Mon的流量和25G的缓存空间，对于个人网站的图片流量而言应该够的。

# Cloudflare

知名的云服务平台，对于小网站来说挺良心的。主要是支持流量攻击的防护，还免费。

![](/imgs/2019/web-optimize/3.webp)

***

# 瀑布流图片布局

想弄一个瀑布流的图库，类似 [pixabay](https://pixabay.com/)，代码如下，采用 css 的 column 即可。

```html
<div class="my-images">
  <img src="1.png" alt=""/>
  <img src="2.png" alt=""/>
  <img src="3.png" alt=""/>
  <img src="4.png" alt=""/>
</div>
<style>
.my-images{
  /* 列的间隙宽度 */
  column-gap: 1px;
  /* 列的宽度 */
  column-width: auto;
  /* 涉及文字,避免文字内容断裂 */
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  break-inside: avoid;
}

/* 列数量 */
@media screen and (min-width: 640px) { 
  .my-images{
    column-count: 1;
  }
}

@media screen and (min-width: 768px) { 
  .my-images{
    column-count: 2;
  }
}

@media screen and (min-width: 1280px) { 
  .my-images {
    column-count: 3;
  }
}
</style>