<template>
  <div class="string">
    <Note
      v-for="(note, i) in stringNotes"
      :key="i"
      :stringIndex="stringIndex"
      :fret="i"
      :note="note" />
  </div>
</template>

<script>
import { computed } from 'vue';

import useFretboard from '@/use/fretboard';
import Note from '@/components/Note.vue';

export default {
  name: 'GuitarString',
  props: {
    stringIndex: Number,
    rootNote: String,
  },
  components: {
    Note,
  },
  setup(props) {
    const { getAllFretNotes } = useFretboard();

    return {
      stringNotes: computed(() => getAllFretNotes(props.rootNote)),
    };
  },
};
</script>

<style scoped lang="postcss">
.string {
  @apply flex relative text-left w-full font-mono;

  height: 40px;
}

.string:before {
  @apply absolute w-full z-20;

  content: '';
  top: 50%;
  color: #bbb;
  background: #eee repeating-linear-gradient(
    60deg, transparent, transparent 2px, currentColor 3px, currentColor 5px
  );
  transform: translateY(-50%);
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
}

.string:nth-of-type(7):before { height: 2px; }
.string:nth-of-type(6):before { height: 2px; }
.string:nth-of-type(5):before { height: 3px; }
.string:nth-of-type(4):before { height: 4px; }
.string:nth-of-type(3):before { height: 5px; }
.string:nth-of-type(2):before { height: 6px; }
.string:nth-of-type(1):before { height: 7px; }

.string .fret-space {
  @apply flex items-center justify-center text-center;
}

.string .fret-space:first-child {
  width: 30px;
}
</style>
