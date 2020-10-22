<template>
  <Settings />
  <Quiz v-if="isQuizInProgress" />
  <Fretboard />
</template>

<script>
import useQuiz from '@/use/quiz';

import Settings from '@/components/Settings.vue';
import Fretboard from '@/components/Fretboard.vue';
import Quiz from '@/components/Quiz.vue';

export default {
  components: {
    Settings,
    Fretboard,
    Quiz,
  },
  setup() {
    const { isQuizInProgress } = useQuiz();

    return {
      isQuizInProgress,
    };
  },
};
</script>

<style scoped lang="postcss">
body {
  @apply flex items-center justify-center w-full h-full;
}
</style>
