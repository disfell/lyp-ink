<template>
  <NuxtLayout>
		<div class="container mx-auto py-5">
			<Title>记录 - {{ appConfig.title }}</Title>
			<div class="justify-center flex">
				<LazyMyBanner />
			</div>

			<div class="mt-16"></div>
			
			<main class="flex justify-center px-10 md:px-0 ml-8">
				<div class="flex flex-col w-full md:w-6/12 lg:w-4/12">
					<div v-for="yearGroup in groupedData" :key="yearGroup.year" class="mb-3 article-item">
						<span class="font-medium text-xl 2xl:text-4xl text-slate-500
							dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-stone-100 dark:to-stone-500">{{ yearGroup.year }}</span>
						<ul class="list-none list-inside text-slate-900">
							<li v-for="item of yearGroup.items" :key="item.title" class="flex article-item">
								<NuxtLink :to="item._path" noPrefetch class="flex-none w-fit dark:text-slate-300 2xl:text-xl hover-a">{{ item.title }}</NuxtLink>
								<div class="grow px-4">
									<div class="w-full h-1 border-t border-dashed border-slate-300 dark:border-slate-600 inline-block align-middle"></div>
								</div>
								<div class="flex-none w-20">
									<div class="pb-1 text-xs 2xl:text-base text-slate-500 dark:text-slate-400 inline-block align-middle">{{ formatDate(item.date) }}日</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</main>
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