import { createStore } from 'vuex';
import { CHROMATIC_SCALE, TUNINGS } from '@/utilities/constants';
import { shuffleArray } from '@/utilities/utils';
import { getStringNotes } from '@/utilities/notes';

const QUIZ_QUESTION_COUNT = 1;

const stateData = {
  highlightedNote: '',
  settings: {
    fretCount: 20,
    stringCount: 4,
    tuningIndex: 0,
  },
  notesVisible: true,
  quiz: {
    selectedNotes: {},
    correctAnswers: [],
    questions: [],
    scores: [],
  },
};

const mutations = {
  setStringCount(state, stringCount) {
    state.settings.stringCount = stringCount;
    state.settings.tuningIndex = 0;
  },
  setTuning(state, tuningIndex) {
    state.settings.tuningIndex = tuningIndex;
  },
  setHighlightedNote(state, note) {
    state.highlightedNote = note;
  },
  hideNotes(state) {
    state.notesVisible = false;
  },
  showNotes(state) {
    state.notesVisible = true;
  },
  addFret(state) {
    if (state.settings.fretCount < 24) state.settings.fretCount += 1;
  },
  removeFret(state) {
    if (state.settings.fretCount > 12) state.settings.fretCount -= 1;
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
    const tuning = TUNINGS[state.settings.stringCount][state.settings.tuningIndex].notes;
    for (let q = 0; q < state.quiz.questions.length; q += 1) {
      const correctAnswer = {};
      for (let s = 0; s < tuning.length; s += 1) {
        correctAnswer[s] = getStringNotes(
          tuning[s], state.settings.fretCount,
        ).reduce((acc, n, i) => (state.quiz.questions[q] === n ? acc.concat(i) : acc), []);
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
