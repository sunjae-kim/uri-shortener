import Vue from 'vue';
import SuiVue from 'semantic-ui-vue';
import App from './App.vue';
import store from './store';
import 'semantic-ui-css/semantic.min.css';

Vue.use(SuiVue);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}
