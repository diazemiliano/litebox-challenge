import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: false,
    loading: true,
  },
  getters: {
    getDrawer: (state) => state.drawer,
    getLoading: (state) => state.loading,
  },
  mutations: {
    mutateDrawer(state, value) {
      state.drawer = value;
    },
    mutateLoading(state, value) {
      state.loading = value;
    },
  },
  actions: {
    showDrawer({ commit }, value = false) {
      commit("mutateDrawer", value);
    },
    setLoading({ commit }, value = false) {
      commit("mutateLoading", value);
    },
  },
  modules: {},
});
