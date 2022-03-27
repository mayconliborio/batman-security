import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: () => ({
    screenSize: {
      width: {},
      heigth: {},
    },
    modalControler: {
      show: false,
      header: "",
      messages: [],
    },
    snackBar: {
      show: false,
      message: "",
      sucess: false,
    },
    vulnerabilities: [
      {
        id: 1,
        title: "Teste 1",
        vulnerabilityComment: "Comentario 1",
        criticalityLevel: 3,
        vulnerabilityType: 3,
        evidences: [],
        solutionProposal: "Solução 1",
      },
      {
        id: 2,
        title: "Teste 2",
        vulnerabilityComment: "Comentario 2",
        criticalityLevel: 3,
        vulnerabilityType: 1,
        evidences: [],
        solutionProposal: "Solução 2",
      },
      {
        id: 3,
        title: "Teste 3",
        vulnerabilityComment: "Comentario 3",
        criticalityLevel: 1,
        vulnerabilityType: 1,
        evidences: [],
        solutionProposal: "Solução 3",
      },
      {
        id: 4,
        title: "Teste 4",
        vulnerabilityComment: "Comentario 4",
        criticalityLevel: 2,
        vulnerabilityType: 3,
        evidences: [],
        solutionProposal: "Solução 4",
      },
      {
        id: 5,
        title: "Teste 5",
        vulnerabilityComment: "Comentario 5",
        criticalityLevel: 2,
        vulnerabilityType: 1,
        evidences: [],
        solutionProposal: "Solução 5",
      },
    ],
  }),
  getters: {},
  mutations: {
    screenResize(state) {
      state.screenSize.width = document.documentElement.clientWidth;
      state.screenSize.heigth = document.documentElement.clientHeight;
    },
    resetModalControler(state) {
      state.modalControler = {
        show: false,
        header: "",
        messages: [""],
      };
    },
    setModalControler(state, payload) {
      state.modalControler.header = payload.header;
      state.modalControler.messages = payload.messages;
      state.modalControler.show = payload.show;
    },
    setMessageSnackBar(state, payload) {
      state.snackBar.show = true;
      state.snackBar.message = payload.message;
      state.snackBar.sucess = payload.sucess;
    },
    resetMessageSnackbar(state) {
      state.snackBar.show = false;
      state.snackBar.message = "";
      state.snackBar.sucess = "";
    },
  },
  actions: {
    action_screenResize(context) {
      context.commit("screenResize");
    },
    action_resetModalControler(context) {
      context.commit("resetModalControler");
    },
    action_setModalControler(context, payload) {
      context.commit("setModalControler", payload);
    },
    action_changeMessageSnackBar(context, payload) {
      context.commit("setMessageSnackBar", payload);
      setTimeout(() => context.commit("resetMessageSnackbar"), 5000);
    },
  },
  modules: {},
});
