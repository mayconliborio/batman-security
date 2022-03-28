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
    messageModalControler: {
      show: false,
      header: "",
      title: "",
      messages: [],
    },
    snackBar: {
      show: false,
      message: "",
      sucess: false,
    },
    filters: {
      title: "",
      type: 0,
      criticalityLevel: 0,
    },
    vulnerabilitiesIndex: 0,
    vulnerabilities: [],
    activeVulnerability: {
      id: 0,
      title: "",
      comment: "",
      type: 0,
      criticalityLevel: 0,
      solutionProposal: "",
      evidences: [],
    },
  }),
  getters: {
    getVulnerabilityIndexById: (state) => (id) => {
      return state.vulnerabilities
        .map((vul) => {
          return vul.id;
        })
        .indexOf(id);
    },
    getFilteredVulnerabilities: (state) => {
      let filters = state.filters;
      let filteredVulnerabilities = state.vulnerabilities;
      function titleFilter(vul) {
        let str = vul.title.toLowerCase();
        let substr = filters.title.toLowerCase();
        return str.indexOf(substr) > -1;
      }
      function typeFilter(vul) {
        return vul.type === filters.type;
      }
      function criticalityLevelFilter(vul) {
        return vul.criticalityLevel === filters.criticalityLevel;
      }

      if (filters.title) {
        filteredVulnerabilities = filteredVulnerabilities.filter(titleFilter);
      }
      if (filters.type) {
        filteredVulnerabilities = filteredVulnerabilities.filter(typeFilter);
      }
      if (filters.criticalityLevel) {
        filteredVulnerabilities = filteredVulnerabilities.filter(
          criticalityLevelFilter
        );
      }
      return filteredVulnerabilities;
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
      state.modalControler.show = true;
    },
    resetMessageModalControler(state) {
      state.messageModalControler = {
        show: false,
        title: "",
        header: "",
        messages: [""],
      };
    },
    setMessageModalControler(state, payload) {
      state.messageModalControler.header = payload.header;
      state.messageModalControler.title = payload.title;
      state.messageModalControler.messages = payload.messages;
      state.messageModalControler.show = true;
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
    setActiveVulnerability(state, payload) {
      state.activeVulnerability = payload;
    },
    setFilters(state, payload) {
      state.filters = payload;
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
    action_resetMessageModalControler(context) {
      context.commit("resetMessageModalControler");
    },
    action_setMessageModalControler(context, payload) {
      context.commit("setMessageModalControler", payload);
      console.log(payload);
    },
    action_changeMessageSnackBar(context, payload) {
      context.commit("setMessageSnackBar", payload);
      setTimeout(() => context.commit("resetMessageSnackbar"), 5000);
    },
    action_setFilters(context, payload) {
      context.commit("setFilters", payload);
    },
    action_createVulnerability(context, payload) {
      let vulnerabilities = context.state.vulnerabilities || [];
      vulnerabilities.push(payload);
      context.commit("setVulnerabilities", vulnerabilities);
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
    action_setActiveVulnerability(context, payload) {
      let vulnerabilities = context.state.vulnerabilities;
      let find = () => {
        for (let vuln in vulnerabilities) {
          let v = vulnerabilities[vuln];
          if (v.id === payload) {
            return v;
          }
        }
        return undefined;
      };
      let vuln = find();
      if (!vuln) {
        let message = {
          message: "Erro ao acessar vulnerabilidade!",
          sucess: false,
        };
        context.dispatch("action_changeMessageSnackBar", message);
      }
      context.commit("setActiveVulnerability", vuln);
    },
  },
  modules: {},
});
