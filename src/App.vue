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
