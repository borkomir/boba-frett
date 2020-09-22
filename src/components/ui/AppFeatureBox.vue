<template>
  <li class="mt-10 md:mt-0">
    <div class="ml-4">
      <h4 class="feature-title">
        {{ title }}
        <span class="feature-soon" v-if="comingSoon">Coming soon</span>
      </h4>
      <div class="feature-description">
        <slot></slot>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'AppFeatureBox',
  props: {
    title: String,
    comingSoon: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="postcss">
.feature-title {
  @apply text-lg leading-6 font-medium text-gray-900
}

.feature-description {
  @apply mt-2 text-base leading-6 text-gray-500;
}

.feature-soon {
  @apply px-2 ml-1 inline text-xs leading-5 font-semibold rounded-full bg-indigo-500 text-white;
}
</style>
