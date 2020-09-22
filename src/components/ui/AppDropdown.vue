<template>
    <div class="relative inline-block text-left mr-2">
        <div class="w-40">
          <span class="rounded-md shadow-sm">
            <button type="button" class="inline-flex justify-center w-full rounded-md
              border border-gray-700 px-4 py-2 bg-gray-800 text-sm leading-5
              transition ease-in-out duration-150"
              :class="this.disabled ? 'text-gray-700 focus:border-gray-700 cursor-default'
                : 'text-gray-400  hover:text-gray-200 focus:outline-none \
                focus:border-indigo-300 focus:shadow-outline-indigo active:bg-gray-500 '"
              id="options-menu" aria-haspopup="true" aria-expanded="true"
              @click="showOptions">
              {{ selectedValueLabel }}
              <!-- Heroicon name: chevron-down -->
              <svg class="-mr-1 ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1
                1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd" />
              </svg>
            </button>
          </span>
        </div>

        <!--
            Dropdown panel, show/hide based on dropdown state.

            Entering: "transition ease-out duration-100"
            From: "transform opacity-0 scale-95"
            To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
            From: "transform opacity-100 scale-100"
            To: "transform opacity-0 scale-95"
        -->
        <div class="absolute mt-2 w-48 rounded-md shadow-lg z-40"
          :class="[{hidden: !open},
                   rightAligned ? 'origin-top-right right-0' : 'origin-top-left left-0']">
            <div class="rounded-md bg-white shadow-xs" :class="{'text-right': rightAligned}">
                <div class="py-1" role="menu" aria-orientation="vertical"
                    aria-labelledby="options-menu">
                    <span href="#" class="block px-4 py-2 text-sm leading-5 text-gray-700
                    hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100
                    focus:text-gray-900 cursor-pointer" role="menuitem"
                    v-for="o in options" :key="o[0]"
                    @click="update(o[0])">{{ o[1] }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'AppDropdown',
  props: {
    value: [String, Number],
    options: Array,
    rightAligned: {
      type: Boolean,
      default: false,
    },
    disabled: Boolean,
  },
  setup(props, { emit }) {
    const open = ref(false);

    const selectedValueLabel = computed(() => (
      props.value !== undefined ? props.options.find((e) => e[0] === props.value)[1] : null
    ));

    const showOptions = () => {
      if (!props.disabled) open.value = !open.value;
    };

    const update = (newValue) => {
      emit('update', { newValue });
      open.value = false;
    };

    return {
      open,
      selectedValueLabel,
      showOptions,
      update,
    };
  },
};
</script>
