import Vuex from "vuex";
import Vue from "vue";
// @ts-ignore
import blogsState from "./modules/blogsState.js";
// @ts-ignore
import authState from "./modules/authState";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    blogsState: blogsState,
    authState: authState
  }
});
