<template>
  <div class="quiz-summary-backdrop" v-if="summaryRevealed"
  >
    <div class="flex flex-col bg-white text-gray-800 rounded w-50 p-10">
      <p class="text-xl tracking-tight leading-10 mb-3 text-center">
        Your accuracy:
      </p>
      <p class="text-6xl tracking-tight leading-10 text-center">
        <strong class="block text-orange-600 mb-5">{{ accuracy }}%</strong>
      </p>
      <div class="flex mt-8">
        <AppButton
          class="mr-3"
          text="Another session"
          @click="finishQuiz(true)"
        />
        <AppButton
          text="Back to learning"
          flavor="white"
          @click="finishQuiz(false)"
        />
      </div>
    </div>
  </div>
  <div
    class="flex flex-row align-center justify-between mb-8 p-3 bg-indigo-800">
    <div class="flex items-center">
      <span v-for="s in quizSession.questions.length" :key="s"
        class="w-5 h-5 rounded-full border-2 ml-2"
        :class="quizSession.scores.length > s-1 ? (
          quizSession.scores[s-1].score > 0 ? (
            quizSession.scores[s-1].score === 1 ? 'bg-green-500 border-green-200'
            : 'bg-yellow-500 border-yellow-200'
          ) : 'bg-red-600 border-red-200'
        ) : 'bg-indigo-800 border-indigo-700'"
      ></span>
    </div>
    <div>
      <div class="flex" v-if="scoringRevealed && lastScore">
        <p class="flex items-center text-xl leading-10 text-white bg-green-500 rounded px-4"
          v-if="lastScore.score === 1">
          Nailed it!
          <small class="ml-2">({{ lastScore.matches }}/{{ lastScore.target }})</small>
        </p>
        <p class="flex items-center text-xl leading-10 text-white bg-orange-500 rounded px-4"
          v-if="lastScore.score === 0.5">
          Close enough!
          <small class="ml-2">({{ lastScore.matches }}/{{ lastScore.target }})</small>
        </p>
        <p class="flex items-center text-xl leading-10 text-white bg-red-600 rounded px-4"
          v-if="lastScore.score === 0">
          Oh, snap!
          <small class="ml-2">({{ lastScore.matches }}/{{ lastScore.target }})</small>
        </p>
      </div>
    </div>
    <div class="flex mr-2">
      <p
        v-if="!scoringRevealed"
        class="text-xl leading-10 text-white mr-3">
        Select all <span class="bg-indigo-400 rounded text-white py-1 px-2 inline-block w-20">
          {{ currentQuestion }}</span> notes!
      </p>
      <AppButton
        v-if="!scoringRevealed"
        text="Ready!"
        flavor="white"
        @click="submit"
      />
      <AppButton
        v-else
        :text="quizSession.questions.length === quizSession.scores.length
          ? 'Show summary' : 'Next!'"
        @click="proceed"
      />
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref, computed } from 'vue';

import useFretboard from '@/use/fretboard';
import { getCommonElementsCount } from '@/utilities/utils';

export default {
  name: 'Quiz',
  setup() {
    const { getters, commit, state: { quiz } } = useStore();
    const scoringRevealed = ref(false);
    const summaryRevealed = ref(false);

    const { tuningNotes } = useFretboard();

    const isQuizInProgress = computed(() => quiz.questions.length > 0);

    const currentQuestion = computed(() => (
      quiz.questions[quiz.scores.length]
    ));

    const currentAnswer = computed(() => (
      quiz.correctAnswers[quiz.scores.length]
    ));

    const lastScore = computed(() => (
      quiz.scores.length > 0
        ? quiz.scores[quiz.scores.length - 1] : {}
    ));

    const accuracy = computed(() => (
      getters.getAccuracy
    ));

    const launchQuiz = () => {
      if (!isQuizInProgress.value) {
        commit('startQuiz');
      }
    };

    const getScore = () => {
      const score = {
        target: 0,
        matches: 0,
      };
      for (let s = 0; s < tuningNotes.value.length; s += 1) {
        score.target += currentAnswer.value[s].length;
        score.matches += getCommonElementsCount(
          currentAnswer.value[s], getters.getStringSelection(s),
        );
      }
      if (score.matches === score.target) {
        score.score = 1.0;
      } else if (score.matches >= (score.target / 2)) {
        score.score = 0.5;
      } else {
        score.score = 0.0;
      }
      return score;
    };

    const submit = () => {
      commit('addScore', getScore());
      commit('showNotes');
      scoringRevealed.value = true;
    };

    const proceed = () => {
      scoringRevealed.value = false;
      if (quiz.questions.length === quiz.scores.length) {
        summaryRevealed.value = true;
      }
      commit('cleanSelection');
      commit('hideNotes');
    };

    const finishQuiz = (retry) => {
      summaryRevealed.value = false;
      commit('finishQuiz');
      console.info('Quiz completed!');
      if (retry) {
        launchQuiz();
      }
    };

    return {
      quizSession: quiz,
      scoringRevealed,
      summaryRevealed,
      tuningNotes,
      isQuizInProgress,
      currentQuestion,
      currentAnswer,
      lastScore,
      accuracy,

      launchQuiz,
      getScore,
      submit,
      proceed,
      finishQuiz,
    };
  },
};
</script>

<style scoped lang="postcss">
.quiz-summary-backdrop {
  @apply flex items-center justify-center bg-gray-900 bg-opacity-75;
  @apply absolute top-0 right-0 bottom-0 left-0 z-40 ;
}
</style>
