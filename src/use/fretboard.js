import { computed, ref } from 'vue';

import { TUNINGS } from '@/utilities/constants';
import { getFretWidth, getStringNotes } from '@/utilities/notes';

const MIN_FRET_COUNT = 12;
const MAX_FRET_COUNT = 24;

const notesVisible = ref(true);
const highlightedNote = ref('');
const fretCount = ref(20);
const stringCount = ref(4);
const tuningIndex = ref(0);

export default function useFretboard() {
  const tuningNotes = computed(
    () => TUNINGS[stringCount.value][tuningIndex.value].notes,
  );

  const addFret = () => {
    if (fretCount.value === MAX_FRET_COUNT) return;

    fretCount.value += 1;
  };

  const removeFret = () => {
    if (fretCount.value === MIN_FRET_COUNT) return;

    fretCount.value -= 1;
  };

  const calculateFretWidth = (fretNumber) => (
    getFretWidth(fretNumber, fretCount.value + 1)
  );

  const getAllFretNotes = (rootNote) => (
    getStringNotes(rootNote, fretCount.value)
  );

  return {
    tunings: TUNINGS,
    tuningNotes,
    notesVisible,
    highlightedNote,
    addFret,
    removeFret,
    calculateFretWidth,
    getAllFretNotes,
    settings: {
      fretCount,
      stringCount,
      tuningIndex,
    },
  };
}
