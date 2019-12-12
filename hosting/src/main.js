import Vue from 'vue';
import SuiVue from 'semantic-ui-vue';
import VueRouter from 'vue-router';
import App from '@/App.vue';
import store from '@/store';
import router from '@/router';
import registerServiceWorker from '@/service-worker';
import 'semantic-ui-css/semantic.min.css';

Vue.use(VueRouter);
Vue.use(SuiVue);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');

registerServiceWorker();
