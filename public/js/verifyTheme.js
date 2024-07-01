if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.classList.remove('light')
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
  document.documentElement.classList.add('light')
}