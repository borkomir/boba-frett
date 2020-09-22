<template>
  <div class="string">
    <Note
      v-for="(note, i) in stringNotes"
      :key="i"
      :note="note"
      :stringIndex="stringIndex"
      :fret="i"
      :highlighted="note===highlightedNote"
      @selected="selectNote(i)"
      @unselected="unselectNote(i)" />
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

import { getFretWidth, getStringNotes } from '@/utilities/notes';
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
    const store = useStore();
    const { settings } = store.state;

    const highlightedNote = computed(() => store.state.highlightedNote);

    const stringNotes = computed(
      () => getStringNotes(props.rootNote, settings.fretCount),
    );

    const selectNote = (index) => (
      store.commit('addToSelected', { string: props.stringIndex, index })
    );

    const unselectNote = (index) => (
      store.commit('removeFromSelected', { string: props.stringIndex, index })
    );

    return {
      highlightedNote,
      stringNotes,
      getFretWidth,
      getStringNotes,
      selectNote,
      unselectNote,
    };
  },
};
</script>

<style scoped lang="scss">
// TODO: use postcss tailwind applies
.string {
  display: flex;
  font-family: monospace;
  text-align: left;
  height: 40px;
  width: 100%;
  position: relative;

  .fret-space {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    text-align: center;

    &:first-child {
      width: 30px;
    }
  }

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    top: 50%;
    color: #bbb;
    background: #eee repeating-linear-gradient(
      60deg, transparent, transparent 2px, currentColor 3px, currentColor 5px
    );
    transform: translateY(-50%);
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
    z-index: 20;
  }

  &:nth-of-type(7) {
    &:before {
      height: 2px;
    }
  }

  &:nth-of-type(6) {
    &:before {
      height: 2px;
    }
  }

  &:nth-of-type(5) {
    &:before {
      height: 3px;
    }
  }

  &:nth-of-type(4) {
    &:before {
      height: 4px;
    }
  }

  &:nth-of-type(3) {
    &:before {
      height: 5px;
    }
  }

  &:nth-of-type(2) {
    &:before {
      height: 6px;
    }
  }

  &:nth-of-type(1) {
    &:before {
      height: 7px;
    }
  }
}
</style>
