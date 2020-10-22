<template>
  <QuizSummary v-if="summaryRevealed" @close="completeQuiz" />
  <div class="quiz-panel">
    <div class="flex items-center">
      <span v-for="s in questions.length" :key="s"
        class="quiz-score-dot"
        :class="{
          'bg-indigo-800 border-indigo-700': scores.length <= s-1,
          'bg-red-600 border-red-200': scores.length > s-1 && scores[s-1].score === 0,
          'bg-yellow-500 border-yellow-200': scores.length > s-1 && scores[s-1].score === 0.5,
          'bg-green-500 border-green-200': scores.length > s-1 && scores[s-1].score === 1
        }"
      ></span>
    </div>
    <div>
      <div class="flex" v-if="scoringRevealed && lastScore">
        <p class="quiz-score bg-green-500" v-if="lastScore.score === 1">
          Nailed it!
          <small class="ml-2">({{ lastScore.matches }}/{{ lastScore.target }})</small>
        </p>
        <p class="quiz-score bg-orange-500" v-if="lastScore.score === 0.5">
          Close enough!
          <small class="ml-2">({{ lastScore.matches }}/{{ lastScore.target }})</small>
        </p>
        <p class="quiz-score bg-red-600" v-if="lastScore.score === 0">
          Oh, snap!
          <small class="ml-2">({{ lastScore.matches }}/{{ lastScore.target }})</small>
        </p>
      </div>
    </div>
    <div class="flex mr-2">
      <p class="quiz-question" v-if="!scoringRevealed">
        Select all <span class="quiz-note">{{ currentQuestion }}</span> notes!
      </p>
      <AppButton
        v-if="!scoringRevealed"
        text="Ready!"
        flavor="white"
        @click="submit"
      />
      <AppButton
        v-else
        :text="questions.length === scores.length
          ? 'Show summary' : 'Next!'"
        @click="proceed"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

import useQuiz from '@/use/quiz';
import useFretboard from '@/use/fretboard';
import QuizSummary from '@/components/QuizSummary.vue';

export default {
  name: 'Quiz',
  components: { QuizSummary },
  setup() {
    const scoringRevealed = ref(false);
    const summaryRevealed = ref(false);

    const { tuningNotes, notesVisible } = useFretboard();
    const {
      questions,
      correctAnswers,
      selectedNotes,
      scores,
      isQuizInProgress,
      startQuiz,
      getScore,
      finishQuiz,
      cleanSelection,
    } = useQuiz();

    const currentQuestion = computed(() => (
      questions.value[scores.value.length]
    ));

    const currentCorrectAnswer = computed(() => (
      correctAnswers.value[scores.value.length]
    ));

    const lastScore = computed(() => (
      scores.value.length > 0
        ? scores.value[scores.value.length - 1] : {}
    ));

    const launchQuiz = () => {
      if (!isQuizInProgress.value) startQuiz();
    };

    const submit = () => {
      getScore(currentCorrectAnswer);
      notesVisible.value = true;
      scoringRevealed.value = true;
    };

    const proceed = () => {
      scoringRevealed.value = false;
      if (questions.value.length === scores.value.length) {
        summaryRevealed.value = true;
      }
      cleanSelection();
      notesVisible.value = false;
    };

    const completeQuiz = (retry) => {
      summaryRevealed.value = false;
      finishQuiz();
      console.info('Quiz completed!');
      if (retry) {
        launchQuiz();
      }
    };

    return {
      scoringRevealed,
      summaryRevealed,
      tuningNotes,
      currentQuestion,
      lastScore,
      questions,
      correctAnswers,
      selectedNotes,
      scores,
      launchQuiz,
      getScore,
      submit,
      proceed,
      completeQuiz,
    };
  },
};
</script>

<style scoped lang="postcss">
.quiz-panel {
  @apply flex flex-row items-center justify-between mb-8 p-3 bg-indigo-800;
}

.quiz-question {
  @apply text-xl leading-10 text-white mr-3;
}

.quiz-note {
  @apply bg-indigo-400 rounded text-white text-center inline-block w-20;
}

.quiz-score {
  @apply flex items-center text-xl leading-10 text-white rounded px-4;
}

.quiz-score-dot {
  @apply w-5 h-5 rounded-full border-2 ml-2;
}
</style>
