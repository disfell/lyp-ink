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
					<div v-for="key of flist" :key="key" class="mb-3">
						<span class="font-medium text-xl 2xl:text-4xl text-slate-500
							dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-stone-100 dark:to-stone-500">{{ key }}</span>
						<ul class="list-none list-inside text-slate-900">
							<li v-for="item of groupedBy[key]" :key="item.title" class="flex">
								<NuxtLink :to="item._path" noPrefetch class="flex-none w-fit dark:text-slate-300 2xl:text-xl hover-a">{{ item.title }}</NuxtLink>
								<div class="grow px-4">
									<div class="w-full h-1 border-t border-dashed border-slate-300 dark:border-slate-600 inline-block align-middle"></div>
								</div>
								<div class="flex-none w-20">
									<div class="pb-1 text-xs 2xl:text-base text-slate-500 dark:text-slate-400 inline-block align-middle">{{ item.month }}月{{ item.day }}日</div>
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
const { data, pending, error, refresh } = await useAsyncData(
  'records_list',
  () => $fetch('/api/_content/query')
)

const groupedBy = {}

for (const item of data.value.sort(compare)) {
	if (item._path == '/records' || !item._path.startsWith('/record')) {
		continue
	}
	let year = new Date(item.date).getFullYear()
	let month = new Date(item.date).getMonth() + 1
	let monthStr = month / 10 < 1 ? '0' + month : '' + month
	let day = new Date(item.date).getDate()
	let dayStr = day / 10 < 1 ? '0' + day : '' + day
	item['month'] = monthStr
	item['day'] = dayStr
	if (groupedBy[year]) {
		groupedBy[year].push(item);
	} else {
		groupedBy[year] = [item];
	}
}
const flist = Object.keys(groupedBy).sort((a, b) => b - a)

function compare(a, b) {
  const bandA = new Date(a.date).getTime()
  const bandB = new Date(b.date).getTime()

  let comparison = 0;
  if (bandA > bandB) {
    comparison = -1;
  } else if (bandA < bandB) {
    comparison = 1;
  }
  return comparison;
}
</script>