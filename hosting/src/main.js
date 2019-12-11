import Vue from 'vue';
import SuiVue from 'semantic-ui-vue';
import App from '@/App.vue';
import store from '@/store';
import registerServiceWorker from '@/service-worker';
import 'semantic-ui-css/semantic.min.css';

Vue.use(SuiVue);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');

registerServiceWorker();
