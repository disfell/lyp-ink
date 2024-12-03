<template>
  <main class="min-h-screen">
    <AppHeader class="mb-16" title="记录" :description="description" />

    <UtilsListLoading :loading="nextLoading || prevLoading || loading" />

    <div>
      <div v-if="!(nextLoading || prevLoading || loading) && totalRecords" class="mb-8 text-xs">第 {{ currPage }} / {{ totalPage }} 页</div>

      <!-- 列表展示 -->
      <ul v-if="!(nextLoading || prevLoading || loading) && totalRecords" class="space-y-16 mb-16">
        <li v-for="(article, id) in records" :key="id">
          <AppArticleCard :article="article" />
        </li>
      </ul>

      <!-- 分页按钮 -->
      <div v-if="totalRecords" class="grid grid-cols-2 gap-8 content-center">
        <UButton :loading="prevLoading" label="上一页" color="gray" v-if="currPage > 1 || prevLoading" @click="prevPage">
          <template #trailing>
            <UIcon name="i-heroicons-arrow-left-20-solid" />
          </template>
        </UButton>

        <UButton :loading="nextLoading" label="下一页" color="gray" v-if="(currPage >= 1 && currPage < totalPage) || nextLoading" @click="nextPage">
          <template #trailing>
            <UIcon name="i-heroicons-arrow-right-20-solid" />
          </template>
        </UButton>
      </div>
    </div>
  </main>
</template>

<script setup>
const description = "关于一些心得、心情、生活琐碎，我都会记录在此，以时间降序排列 🙂";
useSeoMeta({
  title: "记录 | " + useAppConfig().site.title,
  description,
});

const currPage = useRecordsPage();
const pageSize = ref(5);
const records = ref([]);
const loading = ref(false);
const nextLoading = ref(false);
const prevLoading = ref(false);

const { data: totalRecords } = await useAsyncData("all-records-count", () => queryContent("/records").count());
const totalPage = Math.ceil(totalRecords.value / pageSize.value);

// 加载记录
const loadRecords = async () => {
  loading.value = true;
  await fetchRecords(currPage.value);
  loading.value = false;
};

// 组件挂载时加载记录
onMounted(loadRecords);

const fetchRecords = async page => {
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
    prevLoading.value = true;
    currPage.value -= 1;
    useState("recordsPage", () => currPage.value);
    await loadRecords();
    prevLoading.value = false;
    scrollToTop();
  }
};

// 下一页
const nextPage = async () => {
  if (currPage.value < totalPage) {
    nextLoading.value = true;
    currPage.value += 1;
    useState("recordsPage", () => currPage.value);
    await loadRecords();
    nextLoading.value = false;
    scrollToTop();
  }
};

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
</script>
