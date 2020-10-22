<template>
  <div class="py-12 bg-white">
    <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-16">
      <div class="page-intro">
        <h2>
          <small>About</small>
          Boba Frett
        </h2>
        <h3>Train notes distribution on the fret of your bass</h3>
        <p>Jam and improvise easily, get better at composing songs.</p>
      </div>

      <div class="mt-10">
        <ul class="md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
          <AppFeatureBox
            title="4+ strings basses support">
            Learn notes on a fretboard that matches the intrument you own.
          </AppFeatureBox>
          <AppFeatureBox
            title="Custom tunings support with presets">
            Heavy music fan? No problem, set a custom drop tuning to learn.
          </AppFeatureBox>
          <AppFeatureBox
            title="Highlighting notes">
            Highlighting all occurences of notes makes is easier
            to memorize the patterns.
          </AppFeatureBox>
          <AppFeatureBox
            title="Quiz mode: finding all note positions">
            Interactive and fun way to quickly and efficiently memorize patterns.
          </AppFeatureBox>
          <AppFeatureBox
            title="Mobile-friendly layout"
            :comingSoon="true" />
          <AppFeatureBox
            title="Scales visualization"
            :comingSoon="true" />
          <AppFeatureBox
            title="Chords visualization"
            :comingSoon="true" />
          <AppFeatureBox
            title="More quiz modes, ear training"
            :comingSoon="true" />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import AppFeatureBox from '@/components/ui/AppFeatureBox.vue';

export default {
  components: { AppFeatureBox },
};
</script>

<style lang="postcss" scoped>
.page-intro {
  @apply text-center;
}
.page-intro h2 {
  @apply mt-2 text-5xl leading-9 font-extrabold tracking-tight text-gray-900;
}
.page-intro h2 > small {
  @apply block pb-2 text-base leading-6 text-indigo-600 font-semibold tracking-wide uppercase;
}
.page-intro h3 {
  @apply mt-2 text-3xl leading-10 font-extrabold tracking-tight text-indigo-900;
}
.page-intro p {
  @apply mt-4 max-w-2xl text-xl leading-7 text-gray-500 mx-auto;
}
</style>
