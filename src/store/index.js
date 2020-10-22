import { createStore } from 'vuex';
import { CHROMATIC_SCALE } from '@/utilities/constants';
import { shuffleArray } from '@/utilities/utils';

import useFretboard from '@/use/fretboard';

// FIXME: store using composition function - just a temporary abomination
const {
  tuningNotes,
  getAllFretNotes,
  // settings: { fretCount },
} = useFretboard();

const QUIZ_QUESTION_COUNT = 1;

const stateData = {
  highlightedNote: '',
  notesVisible: true,
  quiz: {
    selectedNotes: {},
    correctAnswers: [],
    questions: [],
    scores: [],
  },
};

const mutations = {
  setHighlightedNote(state, note) {
    state.highlightedNote = note;
  },
  hideNotes(state) {
    state.notesVisible = false;
  },
  showNotes(state) {
    state.notesVisible = true;
  },
  addToSelected(state, noteDetails) {
    if (state.quiz.selectedNotes[noteDetails.string] !== undefined) {
      state.quiz.selectedNotes[noteDetails.string].push(noteDetails.index);
    } else {
      state.quiz.selectedNotes[noteDetails.string] = [noteDetails.index];
    }
  },
  removeFromSelected(state, noteDetails) {
    state.quiz.selectedNotes[noteDetails.string]
      .splice(state.quiz.selectedNotes[noteDetails.string]
        .indexOf(noteDetails.index), 1);
  },
  cleanSelection(state) {
    state.quiz.selectedNotes = {};
  },
  startQuiz(state) {
    state.highlightedNote = '';
    state.quiz.questions = shuffleArray(CHROMATIC_SCALE).slice(0, QUIZ_QUESTION_COUNT);
    const tuning = tuningNotes.value;
    for (let q = 0; q < state.quiz.questions.length; q += 1) {
      const correctAnswer = {};
      for (let s = 0; s < tuning.length; s += 1) {
        correctAnswer[s] = getAllFretNotes(tuning[s])
          .reduce((acc, n, i) => (state.quiz.questions[q] === n ? acc.concat(i) : acc), []);
      }
      state.quiz.correctAnswers.push(correctAnswer);
    }
    state.notesVisible = false;
    console.info('Quiz started!');
  },
  addScore(state, scoreDetails) {
    state.quiz.scores.push(scoreDetails);
  },
  finishQuiz(state) {
    state.quiz.questions = [];
    state.quiz.scores = [];
    state.quiz.selectedNotes = {};
    state.quiz.correctAnswers = [];
    state.notesVisible = true;
    console.info('Quiz completed!');
  },
};

const getters = {
  getStringSelection: (state) => (stringIndex) => (
    // FIXME: investigate why Proxy object is returned here
    // when not creating an array copy via concat
    state.quiz.selectedNotes[stringIndex] || []
  ),
  getAccuracy: (state) => {
    const matches = state.quiz.scores.reduce((matchCount, s) => matchCount + s.matches, 0);
    const targets = state.quiz.scores.reduce((targetCount, s) => targetCount + s.target, 0);
    console.debug(matches, targets, matches / targets);
    return (targets > 0 ? ((matches * 100) / targets) : 0).toFixed(2);
  },
};

export default createStore({
  state: stateData,
  mutations,
  getters,
});
