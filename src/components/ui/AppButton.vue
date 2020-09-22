<template>
  <button
    class="btn"
    :class="flavor"
    :disabled="disabled"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    text: String,
    flavor: {
      type: String,
      requried: false,
      default: 'default',
    },
    disabled: Boolean,
  },
};
</script>

<style scoped lang="postcss">
.btn, .btn.default {
  @apply bg-indigo-500 text-white rounded-md text-base px-5 py-2;
}
.btn:hover, .btn.default:hover {
  @apply bg-indigo-600;
}
.btn.red {
  @apply bg-red-600;
}
.btn.red:hover {
  @apply bg-red-700;
}
.btn.green {
  @apply bg-green-600;
}
.btn.green:hover {
  @apply bg-green-700;
}
.btn.white {
  @apply bg-white text-indigo-800;
}
.btn.white:hover {
  @apply bg-indigo-100;
}
.btn[disabled] {
  @apply bg-gray-800 text-gray-700;
}
.btn[disabled]:hover {
  @apply bg-gray-800 text-gray-700 cursor-default;
}
</style>
