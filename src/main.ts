import "babel-polyfill";
import Vue from "vue";
import { UserManager, Log, O } from "oidc-client";
import config from "./appConfig/authSettings";
import App from "./App.vue";
import router from "./router";
import store from "./store";


Vue.config.devtools = true;

const userManager = new UserManager(config);
Vue.prototype.$userManager = userManager;

Vue.config.productionTip = true;

Log.logger = console;
Log.level = Log.DEBUG;

const vm = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");

