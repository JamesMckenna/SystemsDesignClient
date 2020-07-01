import Vue from "vue";
import Vuex from "vuex";
import blogsState from "./modules/blogsState.js"
import authState from "./modules/authState.js"
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    blogsState: blogsState,
    authState: authState
  }
});
