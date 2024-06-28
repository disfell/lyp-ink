<template>
  <div class="flex items-center justify-center">
    <NuxtLink to="/records">
      <span class="px-4 py-2 text-zinc-800 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-200 hover:font-bold
        inline-flex items-baseline jelly-effect-hover">
        <svg class="w-6 h-6 self-center mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
        记录
      </span>
    </NuxtLink>

    <span class="text-zinc-800 dark:text-zinc-400">|</span>

    <NuxtLink to="/about" noPrefetch>
      <span class="px-4 py-2 text-zinc-800 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-200 hover:font-bold
        inline-flex items-baseline jelly-effect-hover">
        <svg class="w-6 h-6 self-center mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
        关于
      </span>
    </NuxtLink>
  </div>
</template>