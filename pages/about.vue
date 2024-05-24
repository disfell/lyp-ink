<template>
  <NuxtLayout>
    <main class="md:flex md:justify-center">
      <Title>{{data.title}} - {{config.title}}</Title>
      <div class="flex flex-col md:backdrop-blur-sm md:bg-zinc-50/30 md:dark:bg-zinc-700/30 md:shadow-inner py-10">
        
        <div class="justify-center flex">
          <LazyMyBanner />
        </div>

        <div class="flex mt-10">
          <div class="grow px-4 md:pl-10">
            <div class="w-full h-1 border-t border-dashed border-slate-300 dark:border-slate-600 inline-block align-middle"></div>
          </div>
          <div class="flex-none w-fit text-slate-400 text-sm dark:border-gray-700">
            编辑于{{ formatTime(data?.last) }}
          </div>
          <div class="grow px-4 md:pr-10">
            <div class="w-full h-1 border-t border-dashed border-slate-300 dark:border-slate-600 inline-block align-middle"></div>
          </div>
        </div>

        <ContentRenderer :value="data">
          <ContentRendererMarkdown :value="data"
            class="p-3 md:px-14 md:py-10 break-words prose 2xl:prose-lg dark:prose-invert prose-pre:bg-gray-100
            dark:prose-pre:bg-black"/>
          </ContentRenderer>
        
        <!-- <div class="my-10"></div> -->
        <!-- <Waline :serverURL="havegooday" path="/about" :locale="locale" class="waline md:px-20"/> -->
        <!-- <p class="text-center text-sm dark:text-slate-400">评论已关闭</p> -->

        <div class="justify-center flex mt-10">
          <MyClubLink2 />
        </div>
      </div>

      <div class="fixed right-3 bottom-3">
        <div class="bg-slate-50 dark:bg-gray-400 grid place-content-center rounded-md">
          <NuxtLink to="/">
            <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </main>
  </NuxtLayout>
</template>
<script setup>
const { path } = useRoute()
const config = useAppConfig()
const { data } = await useAsyncData(path, () => queryContent().where({ _path: path }).findOne())
// https://waline.js.org/cookbook/import/project.html
// import { Waline } from '@waline/client/component'
// import '@waline/client/dist/waline.css'
// const havegooday = 'https://www.havegooday.top/'
// const locale = {
//   nick: '昵称',
//   nickError: '昵称不能少于3个字符',
//   mail: '邮箱',
//   mailError: '请填写正确的邮件地址',
//   link: '网址',
//   optional: '可选',
//   placeholder: '欢迎评论',
//   sofa: '来发评论吧~',
//   submit: '提交',
//   like: '喜欢',
//   cancelLike: '取消喜欢',
//   reply: '回复',
//   cancelReply: '取消回复',
//   comment: '评论',
//   refresh: '刷新',
//   more: '加载更多...',
//   preview: '预览',
//   emoji: '表情',
//   uploadImage: '上传图片',
//   seconds: '秒前',
//   minutes: '分钟前',
//   hours: '小时前',
//   days: '天前',
//   now: '刚刚',
//   uploading: '正在上传',
//   login: '登录',
//   logout: '退出',
//   admin: '博主',
//   sticky: '置顶',
//   word: '字',
//   wordHint: '评论字数应在 $0 到 $1 字之间！\n当前字数：$2',
//   anonymous: '匿名',
//   level0: '潜水',
//   level1: '冒泡',
//   level2: '吐槽',
//   level3: '活跃',
//   level4: '话痨',
//   level5: '传说',
//   gif: '表情包',
//   gifSearchPlaceholder: '搜索表情包',
//   profile: '个人资料',
//   approved: '通过',
//   waiting: '待审核',
//   spam: '垃圾',
//   unsticky: '取消置顶',
//   oldest: '按倒序',
//   latest: '按正序',
//   hottest: '按热度',
//   reactionTitle: '你认为这篇文章怎么样？',
// };
</script>
<style>
.max-w-xs-5 {
	max-width: 5rem;
}
</style>