//State - App-level sata/data (todos, post, tokens, ect)
//Getters - Get pieces of state or computed values from state
//Actions - Called from components to comit mutations
//Mustations - Mutate the state (update data, ect)
//Modules - Each module can have it's own state, getters, actions and mutations (post module, auth module, ect)

import Vue from "vue";
import Vuex from "vuex";
import blogsState from "./modules/blogsState.js"
import auth from "./modules/auth.js"
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    blogsState,
    auth
  }
});
