import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import VueNiceValidate from 'vue-nice-validate';

const app = createApp(App);
app.use(VueNiceValidate);
app.mount('#app');
