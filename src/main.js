import { createApp } from 'vue';

import AppButton from '@/components/ui/AppButton.vue';
import AppDropdown from '@/components/ui/AppDropdown.vue';
import App from './App.vue';

import router from './router';
import store from './store';

import '@/assets/styles/tailwind.css';

const app = createApp(App);
app.config.productionTip = false;

// global components
app.component('AppDropdown', AppDropdown);
app.component('AppButton', AppButton);

app.use(store).use(router).mount('#app');
