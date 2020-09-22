<template>
  <div class="fretboard">
    <FretGrid />
    <GuitarString
      v-for="(openNote, i) in tuningNotes" :key="i"
      :stringIndex="i"
      :rootNote="openNote"
    />
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

import { TUNINGS } from '@/utilities/constants';
import FretGrid from '@/components/FretGrid.vue';
import GuitarString from '@/components/GuitarString.vue';

export default {
  name: 'Fretboard',
  components: {
    FretGrid,
    GuitarString,
  },
  setup() {
    const { state: { settings } } = useStore();

    function getTuningNotes() {
      return TUNINGS[settings.stringCount][settings.tuningIndex].notes;
    }

    return {
      tuningNotes: computed(getTuningNotes),
    };
  },
};
</script>

<style scoped lang="postcss">
.fretboard {
  @apply flex flex-col-reverse relative;

  background: #725051;  /* rosewood: #725051, maple: #F4D5C3, ebony: #4D4B4C */
}
</style>
