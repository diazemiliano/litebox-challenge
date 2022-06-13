import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: false,
  },
  getters: {
    getDrawer: (state) => state.drawer,
  },
  mutations: {
    mutateDrawer(state, value) {
      state.drawer = value;
    },
  },
  actions: {
    showDrawer({ commit }, value = false) {
      commit("mutateDrawer", value);
    },
  },
  modules: {},
});
