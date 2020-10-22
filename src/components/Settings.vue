<template>
  <div class="settings" :class="{'mb-8': !isQuizInProgress}">
    <div class="settings-controls divide-x divide-gray-800">
      <div>
        <span class="settings-label">Settings:</span>
        <AppDropdown
          :value="stringCount"
          :options="stringCountOptions"
          @update="setStringCount"
          :disabled="isQuizInProgress"
        />
        <AppDropdown
          :value="tuningIndex"
          :options="tuningOptions"
          @update="setTuning"
          :disabled="isQuizInProgress"
        />
      </div>
      <div class="flex items-center justify-end px-3">
        <span class="settings-label">Frets:</span>
        <AppButton
          class="mr-2"
          text="Less"
          flavor="red"
          :disabled="isQuizInProgress"
          @click="removeFret"
        />
        <AppButton
          text="More"
          flavor="green"
          :disabled="isQuizInProgress"
          @click="addFret"
        />
      </div>
    </div>
    <AppButton
      :text="isQuizInProgress ? 'Quiz in progess...' : 'Start quiz!'"
      :disabled="isQuizInProgress"
      @click="launchQuiz"
    />
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

import useFretboard from '@/use/fretboard';

export default {
  name: 'Settings',
  setup() {
    const {
      tunings,
      addFret,
      removeFret,
      settings: { stringCount, tuningIndex, fretCount },
    } = useFretboard();

    const { commit, state: { quiz } } = useStore();

    const stringCountOptions = computed(
      () => Object.keys(tunings).map(
        (c) => [parseInt(c, 10), `${c} strings`],
      ),
    );

    const tuningOptions = computed(
      () => Object.values(tunings[stringCount.value]).map(
        (t, i) => [i, t.name],
      ),
    );

    // FIXME: move to shared composition function
    const isQuizInProgress = computed(() => quiz.questions.length > 0);

    const setStringCount = (option) => {
      if (!isQuizInProgress.value) {
        stringCount.value = option.newValue;
        tuningIndex.value = 0; // reset tuning index
      }
    };

    const setTuning = (option) => {
      if (!isQuizInProgress.value) {
        tuningIndex.value = option.newValue;
      }
    };

    const launchQuiz = () => {
      if (!isQuizInProgress.value) {
        commit('startQuiz');
      }
    };

    const methods = {
      setStringCount,
      setTuning,
      addFret,
      removeFret,
      launchQuiz,
    };

    return {
      stringCount,
      tuningIndex,
      fretCount,
      stringCountOptions,
      tuningOptions,
      isQuizInProgress,
      ...methods,
    };
  },
};
</script>

<style scoped lang="postcss">
.settings {
  @apply flex flex-row items-center justify-between p-3 bg-gray-900;
}
.settings-controls {
  @apply flex items-center; /* FIXME: for some reason non-appliable: divide-x divide-gray-800; */
}
.settings-label {
  @apply text-gray-600 pl-1 pr-3;
}
</style>
