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
          :value="tuning"
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

import { CHROMATIC_SCALE, TUNINGS } from '@/utilities/constants';

export default {
  name: 'Settings',
  setup() {
    const tunings = TUNINGS; // FIXME: no direct access to TUNINGS in computed arrow functions
    const { commit, state: { settings, quiz } } = useStore();

    const computedRefs = {
      stringCount: computed(() => settings.stringCount),
      stringCountOptions: computed(
        () => Object.keys(tunings).map(
          (c) => [parseInt(c, 10), `${c} strings`],
        ),
      ),
      tuning: computed(() => settings.tuningIndex),
      tuningNotes: computed(
        () => tunings[settings.stringCount][settings.tuningIndex].notes,
      ),
      tuningOptions: computed(
        () => Object.values(tunings[settings.stringCount]).map(
          (t, i) => [i, t.name],
        ),
      ),
      isQuizInProgress: computed(() => quiz.questions.length > 0),
    };

    const setStringCount = (option) => {
      if (!computedRefs.isQuizInProgress.value) {
        commit('setStringCount', option.newValue);
      }
    };

    const setTuning = (option) => {
      if (!computedRefs.isQuizInProgress.value) {
        commit('setTuning', option.newValue);
      }
    };

    const addFret = () => {
      if (!computedRefs.isQuizInProgress.value) {
        commit('addFret');
      }
    };

    const removeFret = () => {
      if (!computedRefs.isQuizInProgress.value) {
        commit('removeFret');
      }
    };

    const launchQuiz = () => {
      if (!computedRefs.isQuizInProgress.value) {
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
      settings,
      chromaticScale: CHROMATIC_SCALE,
      ...computedRefs,
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
