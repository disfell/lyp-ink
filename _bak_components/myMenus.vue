<template>
  <Html :class="currentMode"/>
  <div class="block md:hidden">
    <div v-show="currentMenus === 'show'" class="bg-white fixed right-3 bottom-14 z-50 w-56 
        origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none 
        divide-y divide-gray-100 dark:divide-gray-500 dark:bg-zinc-800">
      <div class="py-1">
        <NuxtLink to="/" class="text-gray-700 block px-4 py-2 text-sm dark:bg-zinc-800 dark:text-slate-300">
          <span class="inline-flex items-baseline">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
              class="self-center rounded-full mx-1 w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            <span>主页</span>
          </span>
        </NuxtLink>
        <NuxtLink to="/records" class="text-gray-700 block px-4 py-2 text-sm dark:bg-zinc-800 dark:text-slate-300">
          <span class="inline-flex items-baseline">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
              class="self-center rounded-full mx-1 w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            <span>记录</span>
          </span>
        </NuxtLink>
        <NuxtLink to="/about" class="text-gray-700 block px-4 py-2 text-sm dark:bg-zinc-800 dark:text-slate-300">
          <span class="inline-flex items-baseline">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
              class="self-center rounded-full mx-1 w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <span>关于</span>
          </span>
        </NuxtLink>
      </div>
      <!-- <div class="py-1">
        <a href="javascript:void(0)" v-show="currentDarkMenus === 'close'" @click="showDarkMenus"
          class="text-gray-700 block px-4 py-2 text-sm dark:bg-zinc-800 dark:text-slate-300">
          <span class="inline-flex items-baseline">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
              class="self-center rounded-full mx-1 w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
            <span>设置</span>
          </span>
        </a>
        <a href="javascript:void(0)" v-show="currentDarkMenus === 'show'" @click="setModeClass(0)"
          class="text-gray-700 block px-4 py-2 text-sm dark:bg-zinc-800 dark:text-slate-300">
          <span class="inline-flex items-baseline">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
              class="self-center rounded-full mx-1 w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
            <span>白昼模式</span>
          </span>
        </a>
        <a href="javascript:void(0)" v-show="currentDarkMenus === 'show'" @click="setModeClass(1)"
          class="text-gray-700 block px-4 py-2 text-sm dark:bg-zinc-800 dark:text-slate-300">
          <span class="inline-flex items-baseline">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
              class="self-center rounded-full mx-1 w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
            <span>黑夜模式</span>
          </span>
        </a>
        <a href="javascript:void(0)" v-show="currentDarkMenus === 'show'" @click="setModeClass(999)"
          class="text-gray-700 block px-4 py-2 text-sm dark:bg-zinc-800 dark:text-slate-300">
          <span class="inline-flex items-baseline">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
              class="self-center rounded-full mx-1 w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
            </svg>
            <span>跟随系统</span>
          </span>
        </a>
      </div> -->
    </div>
    <div class="fixed bottom-16 right-3 z-40">
      <a href="https://www.travellings.cn/go.html" target="_blank">
        <button type="button" class="bg-white rounded-md border dark:border-0 
            dark:bg-zinc-800 dark:text-slate-300 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="self-center w-6 h-6 dark:stroke-slate-400" >
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            </svg>
        </button>
      </a>
    </div>
    <div class="fixed bottom-3 right-3 z-50">
      <button type="button" @click="showMenus" class="bg-white rounded-md border dark:border-0 
          dark:bg-zinc-800 dark:text-slate-300 p-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
    </div>
  </div>
</template>
<script setup>
const currentMode = ref(readDarkModeInStorage())
const currentMenus = ref('close')
const currentDarkMenus = ref('close')
const preferredDark = usePreferredDark()

function setModeClass(mode) {
  if (mode == 0) {
    currentMode.value = 'light'
  } else if (mode == 1) {
    currentMode.value = 'dark'
  } else {
    currentMode.value = 'auto'
  }
}

function readDarkModeInStorage() {
  const darkMode = useCookie('darkMode')
  const possibleValues = ['auto', 'dark', 'light']
  if (darkMode.value && possibleValues.includes(darkMode.value)) {
    return darkMode.value
  } else {
    return 'auto'
  }
}

watchEffect(() => {
  if (currentMode.value === 'auto') {
    setModeClass(999)
    if (preferredDark.value) {
      setModeClass(1)
    } else {
      setModeClass(0)
    }
    useCookie('darkMode').value = null
  } else if (currentMode.value === 'dark') {
    setModeClass(1)
    useCookie('darkMode').value = currentMode.value
  } else if (currentMode.value === 'light') {
    setModeClass(0)
    useCookie('darkMode').value = currentMode.value
  }
})

function showMenus() {
  if (currentMenus.value == 'close') {
    currentMenus.value = 'show'
  } else {
    currentMenus.value = 'close'
    currentDarkMenus.value = 'close'
  }
}

function showDarkMenus() {
  if (currentDarkMenus.value == 'close') {
    currentDarkMenus.value = 'show'
  } else {
    currentDarkMenus.value = 'close'
  }
}
</script>