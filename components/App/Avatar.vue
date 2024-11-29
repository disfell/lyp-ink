<template>
  <div
    class="flex items-center rounded-full cursor-pointer
    backdrop-blur-3xl size-16"
    style="--stagger:2;"
    data-animate=""
  >
    <span class="relative flex size-full">
      <span
        class="bg-green-600 absolute inline-flex size-full online-ping rounded-full z-0"
      >
      </span>
      <img
        src="/avatar.webp"
        alt="LYP"
        class="ring-2 border ring-gray-200 border-gray-300 dark:ring-white/10 dark:border-gray-800 transition-all duration-300 
            bg-gray-200 dark:bg-gray-900 rounded-full size-full cursor-pointer z-50"
        placeholder
        format="webp"
      />
    </span>
  </div>
</template>
<style>
@keyframes online-ping {
  75%, 100% {
    transform: scale(1.3);
    opacity: 0;
  }
}
.online-ping {
  animation: online-ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>
