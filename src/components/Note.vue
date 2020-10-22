<template>
  <div
    class="fret-space"
    :style="{width: `${fretWidth}%`}"
    @click="handleClick"
  >
    <span
      class="note z-30"
      :class="{
        'concelead': !isVisible,
        highlighted: note===highlightedNote,
        selected: isSelected,
        correct: isSelectedCorrectly,
        incorrect: isSelectedIncorrectly
      }"
    >
      {{ isVisible ? note : '?' }}
    </span>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

import useFretboard from '@/use/fretboard';

export default {
  name: 'Note',
  props: {
    note: String,
    stringIndex: Number,
    fret: Number,
  },
  setup(props) {
    const { calculateFretWidth } = useFretboard();

    const store = useStore();
    const { commit, state } = store;
    const { quiz } = state;

    const highlightedNote = computed(() => state.highlightedNote);
    const isVisible = computed(() => state.notesVisible);
    const isQuizInProgress = computed(() => quiz.questions.length > 0);
    const currentQuestionIndex = computed(() => quiz.scores.length - 1);

    const isSelected = computed(() => (
      quiz.selectedNotes[props.stringIndex]
        && quiz.selectedNotes[props.stringIndex].indexOf(props.fret) !== -1
    ));

    const isSelectedCorrectly = computed(() => (
      isQuizInProgress.value
      && currentQuestionIndex.value >= 0
      && isVisible.value
      && isSelected.value
      && quiz.correctAnswers[currentQuestionIndex.value][
        props.stringIndex].indexOf(props.fret) !== -1
    ));

    const isSelectedIncorrectly = computed(() => (
      isQuizInProgress.value
      && currentQuestionIndex.value >= 0
      && isVisible.value
      && (
        (
          isSelected.value
          && quiz.correctAnswers[currentQuestionIndex.value][
            props.stringIndex].indexOf(props.fret) === -1
        ) || (
          !isSelected.value
          && quiz.correctAnswers[currentQuestionIndex.value][
            props.stringIndex].indexOf(props.fret) !== -1
        )
      )
    ));

    const handleClick = () => {
      if (isVisible.value) {
        // learning mode
        if (!isQuizInProgress.value) {
          commit('setHighlightedNote', props.note);
        }
      } else {
        // quiz mode
        commit(
          isSelected.value ? 'removeFromSelected' : 'addToSelected',
          { string: props.stringIndex, index: props.fret },
        );
      }
    };

    return {
      highlightedNote,
      isVisible,
      isQuizInProgress,
      currentQuestionIndex,
      fretWidth: computed(() => calculateFretWidth(props.fret)),
      isSelected,
      isSelectedCorrectly,
      isSelectedIncorrectly,
      handleClick,
    };
  },
};
</script>

<style scoped lang="postcss">
@-webkit-keyframes sonar {
  0% {
    -webkit-transform: scale(0.2);
            transform: scale(0.2);
    opacity: 0.7;
  }
  50% {
    -webkit-transform: scale(1.0);
            transform: scale(1.0);
    opacity: 0.1;
  }
  100% {
    -webkit-transform: scale(2.8);
            transform: scale(2.8);
    opacity: 0;
  }
}
@keyframes sonar {
  0% {
    -webkit-transform: scale(0.2);
            transform: scale(0.2);
    opacity: 0.7;
  }
  50% {
    -webkit-transform: scale(1.0);
            transform: scale(1.0);
    opacity: 0.1;
  }
  100% {
    -webkit-transform: scale(2.8);
            transform: scale(2.8);
    opacity: 0;
  }
}

.fret-space {
  @apply relative z-20 w-full h-full bg-transparent;

  transition: background-color 0.3s;
}

.fret-space:hover {
  @apply cursor-pointer rounded-md;

  background-color: rgba(255, 255, 255, 0.1);
}

.note {
  @apply text-white bg-black opacity-100 text-center rounded-md text-xs leading-none;
  @apply relative p-1;

  text-shadow: 1px 1px rgba(0, 0, 0, 0.4);
  left: -3px;
}

.note:before {
  @apply hidden bg-white rounded-sm absolute top-0 right-0 bottom-0 left-0;

  content: '';
  -webkit-animation: sonar 1s linear infinite both;
          animation: sonar 1s linear infinite both;
}

.highlighted {
  @apply bg-pink-500;
}

.concelead {
  @apply bg-white text-gray-900 opacity-50;
}

.selected {
  @apply bg-indigo-500 text-white opacity-100;
}

.incorrect {
  @apply bg-yellow-600;
}

.selected.correct {
  @apply bg-green-500;
}

.selected.incorrect {
  @apply bg-red-600;
}

.highlighted::before,
.incorrect::before {
  @apply block;
}
</style>
