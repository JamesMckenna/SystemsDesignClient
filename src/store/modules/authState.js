/* eslint-disable @typescript-eslint/camelcase */
import Vue from "vue";
const authState = {
  namespaced: true,
  state: () => {
    return {
      loggedIn: false,
      user: undefined,
      accessToken: undefined,
      refreshToken: undefined,
      idToken: undefined,
      scopes: undefined,
      error: undefined,
      showRefreshModal: false
    };
  },

  getters: {
    getRefreshToken: state => {
      return state.refreshToken;
    },

    getAccessToken: state => {
      return state.accessToken;
    },

    getShowRefreshModal: state => {
      return state.showRefreshModal;
    },

    getLoggedIn: state => {
      return state.loggedIn;
    },

    getUser: state => {
      return state.user;
    },

    getSessionStorage: () => {
      return sessionStorage.getItem( "oidc.user:" + process.env.VUE_APP_IS4_BASE_URL + ":" + process.env.VUE_APP_MAIN_CLIENT );
    }
  },

  mutations: {
    HIDE_REFRESH_MODAL: state => {
      state.showRefreshModal = false;
    },

    SHOW_REFRESH_MODAL: state => {
      state.showRefreshModal = true;
    },

    SET_LOGGEDIN_STATE: (state, data) => {
      state.loggedIn = true;
      state.idToken = data.id_token;
      state.user = data.profile;
      state.accessToken = data.access_token;
      state.refreshToken = data.refresh_token;
      state.scopes = data.scopes;
    },

    SET_LOGOUT_STATE: state => {
      state.loggedIn = false;
      state.idToken = undefined;
      state.user = undefined;
      state.accessToken = undefined;
      state.refreshToken = undefined;
      state.scopes = undefined;
    },

    SET_ERROR: (state, err) => {
      state.error = err;
      console.error(err);
    }
  },

  actions: {
    hideRefreshModal({ commit }) {
      commit("HIDE_REFRESH_MODAL");
    },

    showRefreshModal({ commit }) {
      commit("SHOW_REFRESH_MODAL");
    },

    login({ commit }) {
      Vue.prototype.$userManager.signinRedirect()
      .catch(err => {
        commit("SET_ERROR", err); 
      });
    },

    setAuthState({ commit }) {
      commit("SET_LOGOUT_STATE");
      Vue.prototype.$userManager.getUser()
      .then(function(user) {
        commit("SET_LOGGEDIN_STATE", user); 
      })
      .catch(err => {
        commit("SET_ERROR", err); 
      });
    },

    setStateError({ commit }, data) {
      commit("SET_ERROR", data);
    },

    logout({ commit }) {
      Vue.prototype.$userManager.signoutRedirect()
      .then(function() {
        commit("SET_LOGOUT_STATE", false);
      })
      .catch(err => {
        commit("SET_ERROR", err); 
      });
    }
  }
};

export default authState;
