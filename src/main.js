import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuetify from "./plugins/vuetify";
import "vuetify/dist/vuetify.min.css";
import "./assets/scss/app.scss";

const vuetify = new Vuetify({});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
  vuetify,
}).$mount("#app");
