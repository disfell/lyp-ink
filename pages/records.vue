<template>
  <NuxtLayout>
		<main class="mx-auto md:max-w-3xl 2xl:max-w-4xl min-w-0 border-x border-zinc-200 dark:border-zinc-800 md:shadow">
			<Title>记录 - {{ appConfig.title }}</Title>
      <div class="bg-inherit md:bg-white md:dark:bg-zinc-900 slideDown pt-8">

				<div class="justify-center flex">
					<LazyMyBanner />
				</div>

				<div class="mt-8"></div>

				<div v-for="(yearGroup, index) in groupedData" :key="index" class="px-6 md:px-12">
					<div class="text-4xl md:text-5xl font-bold mt-10 mb-4 dark:text-zinc-300">{{ yearGroup.year }}</div>
					<ul class="list-none p-0 m-0">
						<li v-for="item in yearGroup.items" :key="item.id" class="flex justify-between items-center hover:border-b dark:border-zinc-700 py-2 space-y-4">
							<span class="text-left">
								<NuxtLink :to="item._path" noPrefetch class="flex-none w-fit md:text-xl dark:text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-300">{{ item.title }}</NuxtLink>
							</span>
							<span class="text-right dark:text-zinc-400">{{ formatDate(item.date) }}</span>
						</li>
					</ul>
				</div>
			</div>
			<MyViewer />
		</main>
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
const articles = await queryContent('record').only(['date', 'last', 'description', 'title', '_path', 'show']).find()

const data = ref()
// 剔除 _path 为 '/records' 的项
if (isProd()) {
	data.value = articles.filter(item => '/records' !== item._path && false != item?.show)
} else {
	data.value = articles.filter(item => '/records' !== item._path)
}
// 时间倒序排列
data.value.sort((a, b) => new Date(b.date) - new Date(a.date))
// 按照年份分组
const groupedByYear = {}

for (const item of data.value) {
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
<style scoped>
.min-w {
	min-width: 64rem;
}
</style>