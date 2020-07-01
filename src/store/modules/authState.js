const authState = {
  namespaced: true,
  state: {
    loggedIn: false,
    user: ""
  },
  getters: {
    getLoggedIn: state => {
      return state.loggedIn;
    },
    getUser: state => {
      return state.user;
    }
  },
  mutations: {
    SET_LOGGEDIN_STATE: (state, data) => {
      console.log("called SET_LOGGEDIN_STATE");
      console.log(state);
      console.log(data);
      state.loggedIn = data;
      console.log(state);
    },
    SET_USER_STATE: (state, data) => {
      console.log("called SET_USER_STATE");
      console.log(state);
      console.log(data);
      state.user = data;
      console.log(state);
    }
  },
  actions: {
    login({ commit }) {
      console.log("login called from state");
      const data = true;
      commit("SET_LOGGEDIN_STATE", data);
      const name = "James";
      commit("SET_USER_STATE", name);
    },
    logout({ commit }) {
      console.log("logout called from state");
      const data = false;
      commit("SET_LOGGEDIN_STATE", data);
      const name = "";
      commit("SET_USER_STATE", name);
    }
  }
};

export default authState;
