<template>
  <div
    class="fret"
    :style="{width: `${fretWidth}%`}"
  >
    <span>{{ number }}</span>
    <div class="markers"></div>
  </div>
</template>

<script>
import { computed } from 'vue';
import useFretboard from '@/use/fretboard';

export default {
  name: 'Fret',
  props: {
    number: Number,
  },
  setup(props) {
    const { calculateFretWidth } = useFretboard();

    return {
      fretWidth: computed(() => calculateFretWidth(props.number)),
    };
  },
};
</script>

<style scoped lang="postcss">
.fret {
  @apply flex items-center justify-center h-full relative z-30;
}

.fret > span {
  @apply w-5 h-5 bg-gray-300 text-gray-500 rounded-full;
  @apply text-xs text-center absolute cursor-default;

  left: 50%;
  bottom: -30px;
  margin-left: -15px;
}

.fret:first-child {
  @apply bg-white;

  width: 30px;
}

.fret:first-child:before {
  @apply absolute h-full right-0 bg-gray-300;

  content: '';
  width: 6px;
}

.fret:first-child > span {
  @apply hidden;
}

.fret:not(:first-child):before {
  @apply absolute right-0 h-full rounded-lg;

  content: '';
  width: 4px;
  box-shadow: inset 2px 2px 2px rgba(255, 255, 255, .5),
              inset -2px -2px 2px rgba(0, 0, 0, .75);
}

.fret .markers {
  @apply flex flex-col relative items-center justify-around h-full;

  left: -3px;
}

.fret .markers:before,
.fret .markers:after {
  @apply hidden w-5 h-5 rounded-full;

  content: '';
  background: #CABC9F; /* light: #CABC9F, dark: #181819 */
}

.fret:nth-child(4) .markers:before,
.fret:nth-child(6) .markers:before,
.fret:nth-child(8) .markers:before,
.fret:nth-child(10) .markers:before,
.fret:nth-child(16) .markers:before,
.fret:nth-child(18) .markers:before,
.fret:nth-child(20) .markers:before,
.fret:nth-child(22) .markers:before,
.fret:nth-child(13) .markers:before,
.fret:nth-child(13) .markers:after,
.fret:nth-child(25) .markers:before,
.fret:nth-child(25) .markers:after {
  @apply block;
}

</style>
