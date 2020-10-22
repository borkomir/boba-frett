<template>
  <div class="fret-grid">
    <Fret v-for="fretNumber in (fretCount+1)"
      :key="fretNumber" :number="fretNumber-1" />
  </div>
</template>

<script>
import useFretboard from '@/use/fretboard';
import Fret from '@/components/Fret.vue';

export default {
  name: 'FretGrid',
  components: {
    Fret,
  },
  setup() {
    const { settings: { fretCount } } = useFretboard();
    return {
      fretCount,
    };
  },
};
</script>

<style scoped lang="postcss">
.fret-grid {
  @apply flex items-center justify-start absolute z-10 top-0 bottom-0 w-full;
}
</style>
