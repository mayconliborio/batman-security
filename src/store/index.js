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
    vulnerabilitiesIndex: 0,
    vulnerabilities: [
      {
        id: 1,
        title: "Title",
        criticalityLevel: 3,
        type: 3,
        evidences: [],
        comment: "Comentario",
        solutionProposal: "Lorem Ipsum",
      },
    ],
  }),
  getters: {
    getVulnerabilityById: (state) => (id) => {
      return state.vulnerabilities.find(
        (vulnerability) => vulnerability.id === parseInt(id)
      );
    },
    getVulnerabilityIndexById: (state) => (id) => {
      return state.vulnerabilities
        .map((vul) => {
          return vul.id;
        })
        .indexOf(id);
    },
  },
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
    setVulnerabilities(state, payload) {
      state.vulnerabilities = payload;
    },
    incrementVulnerabilitiesIndex(state) {
      state.vulnerabilitiesIndex++;
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
    action_createVulnerability(context, payload) {
      let vulnerabilities = context.state.vulnerabilities;
      vulnerabilities.push(payload);
      context.commit("setVulnerabilities");
      context.commit("incrementVulnerabilitiesIndex");
    },
    action_updateVulnerability(context, payload) {
      if (context.state.vulnerabilities.length > 0) {
        let index = context.getters.getVulnerabilityIndexById(payload);
        let vulnerabilities = context.state.vulnerabilities;

        vulnerabilities.splice(index, 1, payload);
        context.commit("setVulnerabilities", vulnerabilities);
      }
    },
    action_deleteVulnerability(context, payload) {
      let vulnerabilities = context.state.vulnerabilities;
      let index = vulnerabilities
        .map((vul) => {
          return vul.id;
        })
        .indexOf(payload);

      vulnerabilities.splice(index, 1);
      context.commit("setVulnerabilities", vulnerabilities);
    },
  },
  modules: {},
});
