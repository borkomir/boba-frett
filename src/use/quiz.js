import { ref, computed } from 'vue';

import useFretboard from '@/use/fretboard';
import { CHROMATIC_SCALE } from '@/utilities/constants';
import { shuffleArray, getCommonElementsCount } from '@/utilities/utils';

const QUIZ_QUESTION_COUNT = 2;

const questions = ref([]);
const correctAnswers = ref([]);
const selectedNotes = ref({});
const scores = ref([]);

const {
  highlightedNote,
  notesVisible,
  tuningNotes,
  getAllFretNotes,
} = useFretboard();

export default function useQuiz() {
  const isQuizInProgress = computed(() => questions.value.length > 0);

  const addToSelected = (noteDetails) => {
    if (selectedNotes.value[noteDetails.string] !== undefined) {
      selectedNotes.value[noteDetails.string].push(noteDetails.index);
    } else {
      selectedNotes.value[noteDetails.string] = [noteDetails.index];
    }
  };

  const removeFromSelected = (noteDetails) => {
    selectedNotes.value[noteDetails.string].splice(
      selectedNotes.value[noteDetails.string].indexOf(noteDetails.index), 1,
    );
  };

  const startQuiz = () => {
    highlightedNote.value = '';
    questions.value = shuffleArray(CHROMATIC_SCALE).slice(0, QUIZ_QUESTION_COUNT);
    const tuning = tuningNotes.value;
    for (let q = 0; q < questions.value.length; q += 1) {
      const note = questions.value[q];
      const correctAnswer = {};
      for (let s = 0; s < tuning.length; s += 1) {
        correctAnswer[s] = getAllFretNotes(tuning[s])
          .reduce((acc, n, i) => (note === n ? acc.concat(i) : acc), []);
      }
      correctAnswers.value.push(correctAnswer);
    }
    notesVisible.value = false;
    console.info('Quiz started!');
  };

  const getScore = (correctAnswer) => {
    const score = {
      target: 0,
      matches: 0,
    };
    for (let s = 0; s < tuningNotes.value.length; s += 1) {
      score.target += correctAnswer.value[s].length;
      if (selectedNotes.value[s]) {
        score.matches += getCommonElementsCount(
          correctAnswer.value[s], selectedNotes.value[s],
        );
      }
    }
    if (score.matches === score.target) {
      score.score = 1.0;
    } else if (score.matches >= (score.target / 2)) {
      score.score = 0.5;
    } else {
      score.score = 0.0;
    }

    scores.value.push(score);
  };

  const finishQuiz = () => {
    questions.value = [];
    scores.value = [];
    selectedNotes.value = {};
    correctAnswers.value = [];
    notesVisible.value = true;
    console.info('Quiz completed!');
  };

  const cleanSelection = () => {
    selectedNotes.value = {};
  };

  return {
    questions,
    correctAnswers,
    selectedNotes,
    scores,
    isQuizInProgress,
    addToSelected,
    removeFromSelected,
    cleanSelection,
    startQuiz,
    getScore,
    finishQuiz,
  };
}
