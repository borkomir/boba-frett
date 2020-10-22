<template>
  <div class="quiz-summary-backdrop">
    <div class="quiz-summary-dialog">
      <p class="quiz-summary-label">Your accuracy:</p>
      <div class="quiz-summary-accuracy">{{ accuracy }}%</div>
      <div class="flex justify-center mt-8">
        <AppButton
          class="mr-3"
          text="Another session"
          @click="complete(true)"
        />
        <AppButton
          text="Back to learning"
          flavor="white"
          @click="complete(false)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

import useQuiz from '@/use/quiz';

export default {
  name: 'QuizSummary',
  setup(props, { emit }) {
    const { scores } = useQuiz();

    const accuracy = computed(() => {
      const matches = scores.value.reduce((matchCount, s) => matchCount + s.matches, 0);
      const targets = scores.value.reduce((targetCount, s) => targetCount + s.target, 0);

      return (targets > 0 ? ((matches * 100) / targets) : 0).toFixed(2);
    });

    const complete = (retry) => {
      emit('close', retry);
    };

    return {
      accuracy,
      complete,
    };
  },
};
</script>

<style scoped lang="postcss">
.quiz-summary-backdrop {
  @apply flex items-center justify-center bg-gray-900 bg-opacity-75;
  @apply absolute top-0 right-0 bottom-0 left-0 z-40;
}

.quiz-summary-dialog {
  @apply flex flex-col bg-white text-gray-800 rounded p-10;
}

.quiz-summary-label {
  @apply text-xl tracking-tight leading-10 mb-3 text-center;
}

.quiz-summary-accuracy {
  @apply text-6xl tracking-tight leading-10 font-bold text-center block text-orange-600 mb-5;
}
</style>
