<template>
  <NuxtLayout>
		<div class="mx-auto max-w-2xl min-w-0">
			<Title>记录 - {{ appConfig.title }}</Title>
			<div class="md:backdrop-blur-sm md:bg-zinc-50/30 md:dark:bg-zinc-700/30 md:shadow-inner py-10 article-item">
				<div class="justify-center flex">
					<LazyMyBanner />
				</div>

				<div class="mt-16"></div>

				<div v-for="(yearGroup, index) in groupedData" :key="index" class="px-6">
					<h2 class="text-2xl font-bold my-2 dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-stone-100 dark:to-stone-500">{{ yearGroup.year }}</h2>
					<ul class="list-none p-0 m-0">
						<li v-for="item in yearGroup.items" :key="item.id" class="flex justify-between items-center border-dashed border-b dark:border-gray-600/50 py-2">
							<span class="text-left">
								<NuxtLink :to="item._path" noPrefetch class="flex-none w-fit dark:text-slate-300 2xl:text-xl hover-a">{{ item.title }}</NuxtLink>
							</span>
							<span class="text-right dark:text-slate-300">{{ formatDate(item.date) }}</span>
						</li>
					</ul>
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
		</div>
	</NuxtLayout>
</template>
<script setup>
useHead({
  "meta": [
    { "name": "keywords", "content": "records,LYP.INK,Developer,Blogger,Blog,Personal Site,Nuxt.js,Vue.js,JavaScript,Tailwindcss" },
    { "name": "description", "content": "A developer, blogger" },
  ]
})
const appConfig = useAppConfig()
const articles = await queryContent('record').only(['date', 'last', 'description', 'title', '_path']).find()

// 剔除 _path 为 '/records' 的项
const data = articles.filter(item => item._path !== '/records');
// 时间倒序排列
data.sort((a, b) => new Date(b.date) - new Date(a.date))
// 按照年份分组
const groupedByYear = {};

for (const item of data) {
  const year = new Date(item.date).getFullYear();
  if (!groupedByYear[year]) {
    groupedByYear[year] = [];
  }
  groupedByYear[year].push(item);
}

// 将分组对象转换为数组，并保持倒序
const groupedData = Object.entries(groupedByYear)
  .map(([year, items]) => ({ year, items }))
  .reverse();

function formatDate(strDate) {
	const date = new Date(strDate);
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() 返回的月份是从 0 开始的 (0-11)，所以需要 +1
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}/${day}`;
}
</script>