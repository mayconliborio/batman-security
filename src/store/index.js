import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    screenSize: {
      width: {},
      heigth: {},
    },
  },
  getters: {},
  mutations: {
    screenResize(state) {
      state.screenSize.width = document.documentElement.clientWidth;
      state.screenSize.heigth = document.documentElement.clientHeight;
    },
  },
  actions: {
    action_screenResize({ commit }) {
      commit("screenResize");
    },
  },
  modules: {},
});
