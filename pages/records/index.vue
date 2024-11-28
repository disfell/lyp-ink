<template>
  <main class="min-h-screen">
    <AppHeader class="mb-16" title="记录" :description="description" />

    <div v-if="totalRecords" class="mb-8 text-xs">第 {{ currPage }} 页，共 {{ totalPage }} 页</div>

    <!-- 列表展示 -->
    <ul class="space-y-16  mb-16">
      <li v-for="(article, id) in records" :key="id">
        <AppArticleCard :article="article" />
      </li>
    </ul>

    <!-- 分页按钮 -->
    <div>
      <UButton label="上一页" color="gray" v-if="currPage > 1" @click="prevPage" class="mr-4">
        <template #trailing>
          <UIcon name="i-heroicons-arrow-left-20-solid" class="w-5 h-5" />
        </template>
      </UButton>

      <UButton label="下一页" color="gray" v-if="currPage >= 1 && currPage < totalPage" @click="nextPage">
        <template #trailing>
          <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5" />
        </template>
      </UButton>
    </div>
  </main>
</template>

<script setup ts>
const description = "关于一些心得、心情、生活琐碎，我都会记录在此，以时间降序排列 🙂";
useSeoMeta({
  title: "记录 | " + useAppConfig().site.title,
  description,
});

const currPage = useRecordsPage();
const pageSize = ref(5);
const records = ref([]);
const { data: totalRecords  } = await useAsyncData("all-records-count", () => queryContent("/records").count())
const totalPage = Math.ceil(totalRecords.value / pageSize.value);

// 加载记录
const loadRecords = async () => {
  await fetchRecords(currPage.value);
};

// 组件挂载时加载记录
onMounted(loadRecords);

const fetchRecords = async (page) => {
  const data = await queryContent("/records")
      .sort({ published: -1 })
      .skip((page - 1) * pageSize.value)
      .limit(pageSize.value)
      .only(["title", "description", "published", "slug", "_path"])
      .find();
  records.value = data;
};

// 上一页
const prevPage = async () => {
  if (currPage.value > 1) {
    currPage.value -= 1;
    useState('recordsPage', () => currPage.value );
    await loadRecords();
    scrollToTop()
  }
};

// 下一页
const nextPage = async () => {
  if (currPage.value < totalPage) {
    currPage.value += 1;
    useState('recordsPage', () => currPage.value );
    await loadRecords();
    scrollToTop()
  }
};

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
</script>
