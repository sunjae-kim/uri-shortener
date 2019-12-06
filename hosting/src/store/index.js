import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';
import { vuexfireMutations } from 'vuexfire';

Vue.use(Vuex);

export default new Vuex.Store({
  mutations: vuexfireMutations,
  modules,
});
