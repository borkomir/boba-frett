<template>
  <Settings />
  <Quiz v-if="quizInProgress" />
  <Fretboard />
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

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
    const { state: { quiz } } = useStore();

    return {
      quizInProgress: computed(() => quiz.questions.length > 0),
    };
  },
};
</script>

<style scoped lang="postcss">
body {
  @apply flex items-center justify-center w-full h-full;
}
</style>
