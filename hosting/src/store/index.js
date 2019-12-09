import Vue from 'vue';
import Vuex from 'vuex';
import { vuexfireMutations } from 'vuexfire';
import modules from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
  mutations: vuexfireMutations,
  modules,
});
