import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuetify from "./plugins/vuetify";
import "vuetify/dist/vuetify.min.css";
import "./assets/scss/app.scss";

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#13BCA7",
        secondary: "#0F0F0F",
        accent: "#707473",
        error: "#c1345e",
        success: "#49a294",
      },
    },
  },
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
  vuetify,
}).$mount("#app");
