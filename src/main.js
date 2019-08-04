import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import db from "./services/db";
import "./registerServiceWorker";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  db,
  render: h => h(App)
}).$mount("#app");
