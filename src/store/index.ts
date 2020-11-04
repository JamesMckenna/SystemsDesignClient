import Vuex from "vuex";
import Vue from "vue";

import blogsState from "./modules/blogsState.js";
import authState from "./modules/authState";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    blogsState: blogsState,
    authState: authState
  }
});
