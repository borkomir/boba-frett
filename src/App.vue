<template>
  <Navigation />
  <router-view/>
</template>

<script>
import Navigation from '@/components/ui/TheNavigation.vue';

export default {
  name: 'App',
  components: { Navigation },
};
</script>

<style lang="scss">
#app {
  font-family: 'Inter';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
