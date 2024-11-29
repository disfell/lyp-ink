<template>
  <div
    class="flex items-center rounded-full border cursor-pointer
    dark:border-white/10 dark:bg-zinc-900/80 bg-zinc-50
    ring-1 hover:ring-4 ring-gray-200 border-gray-300 dark:ring-white/10 dark:border-gray-800 transition-all duration-300 
    px-4 py-2 backdrop-blur-3xl mt-2 w-fit"
    style="--stagger:2;"
    data-animate=""
  >
    <span class="relative flex size-3">
      <span class="bg-green-600/80 absolute inline-flex size-full animate-ping rounded-full opacity-75">
      </span>
      <span class="bg-green-500/80 relative inline-flex size-3 scale-90 rounded-full">
      </span>
    </span >
    <span class="text-green-500/80 ml-2 text-sm font-medium">Steam Online</span>
  </div>
</template>