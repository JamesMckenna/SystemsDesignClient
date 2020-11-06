import "babel-polyfill";
import Vue from "vue";
import config from "./appConfig/authSettings";
import { UserManager, Log } from "oidc-client";
import router from "./router";
import store from "./store";
import App from "./App.vue";



Vue.config.devtools = true;

var userManager = new UserManager(config);
Vue.prototype.$userManager = userManager;

Vue.config.productionTip = true;

Log.logger = console;
Log.level = Log.DEBUG;

const vm = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");

