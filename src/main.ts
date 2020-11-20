import "babel-polyfill";
import Vue from "vue";
// @ts-ignore
import config from "./appConfig/authSettings.js";
import { UserManager, Log } from "oidc-client";
import router from "./router";
import store from "./store";
import App from "./App.vue";


Vue.config.productionTip = true;
Vue.config.devtools = true;

var userManager = new UserManager(config);//use var instead of const to get in iframe
Vue.prototype.$userManager = userManager;

Log.logger = console;
Log.level = Log.DEBUG;

const vm = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");

