import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: () => ({
    screenSize: {
      width: {},
      heigth: {},
    },
    modalController: {
      show: false,
      header: "",
      messages: [],
    },
    messageModalController: {
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
    vulnerabilitiesIndex:
      JSON.parse(localStorage.getItem("vulnerabilitiesIndex")) || 1,
    vulnerabilities: JSON.parse(localStorage.getItem("vulnerabilities")) || [],
    activeVulnerability: {
      id: 0,
      title: "",
      comment: "",
      type: 0,
      criticalityLevel: 10,
      solutionProposal: "",
      evidences: [],
    },
    goBackHome: false,
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
    resetModalController(state) {
      state.modalController = {
        show: false,
        header: "",
        messages: [""],
      };
    },
    setModalController(state, payload) {
      state.modalController.header = payload.header;
      state.modalController.messages = payload.messages;
      state.modalController.show = true;
    },
    resetMessageModalController(state) {
      state.messageModalController = {
        show: false,
        title: "",
        header: "",
        messages: [""],
      };
    },
    setMessageModalController(state, payload) {
      state.messageModalController.header = payload.header;
      state.messageModalController.title = payload.title;
      state.messageModalController.messages = payload.messages;
      state.messageModalController.show = true;
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
      localStorage.setItem("vulnerabilities", JSON.stringify(payload));
    },
    incrementVulnerabilitiesIndex(state) {
      state.vulnerabilitiesIndex++;
      localStorage.setItem(
        "vulnerabilitiesIndex",
        JSON.stringify(state.vulnerabilitiesIndex)
      );
    },
    setActiveVulnerability(state, payload) {
      state.activeVulnerability = payload;
    },
    setFilters(state, payload) {
      state.filters = payload;
    },
    setGoBackHome(state, payload) {
      state.goBackHome = payload;
    },
  },
  actions: {
    action_screenResize(context) {
      context.commit("screenResize");
    },
    action_resetModalController(context) {
      context.commit("resetModalController");
    },
    action_setModalController(context, payload) {
      context.commit("setModalController", payload);
    },
    action_resetMessageModalController(context) {
      context.commit("resetMessageModalController");
    },
    action_setMessageModalController(context, payload) {
      context.commit("setMessageModalController", payload);
    },
    action_setGoBackHome(context, payload) {
      context.commit("setGoBackHome", payload);
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
        let index = context.getters.getVulnerabilityIndexById(payload.id);
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
          message: "Erro ao acessar vulnerabilidade, tente novamente!",
          sucess: false,
        };
        context.dispatch("action_changeMessageSnackBar", message);
        context.commit("setGoBackHome", true);
      }
      context.commit("setActiveVulnerability", vuln);
    },
  },
  modules: {},
});
