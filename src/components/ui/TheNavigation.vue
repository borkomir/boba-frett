<template>
  <nav>
    <router-link to="/">Fretboard</router-link>
    <router-link to="/about">About</router-link>
  </nav>
</template>

<style scoped lang="postcss">
nav {
  @apply bg-gray-800 p-3 flex items-baseline;
}
nav a {
  @apply px-3 py-2 mr-3 rounded-md text-white;
}
nav a.router-link-active {
  @apply text-gray-300 bg-gray-900;
}
nav a:hover {
  @apply text-white;
}
</style>
