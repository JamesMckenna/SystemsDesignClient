//THINGS TO KEEP IN MIND:
//local storage for to presist on refresh and round trip to from auth end point, token go in session
//session storage for email name other identity claims - id_token goes in local
//https://stackoverflow.com/questions/48446485/retrieving-state-data-with-oidc-client
/* eslint-disable @typescript-eslint/camelcase */

const authState = {
  namespaced: true,
  state: () => {
    return {
      userManger: null,
      loggedIn: false,
      user: null,
      accessToken: null,
      refreshToken: null,
      idToken: null,
      scopes: null,
      isChecked: null,
      error: null,
      refreshTimer: null,
      showRefreshModal: false
    };
  },

  getters: {
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

    getSessionStorage: state => {
      return sessionStorage.getItem(
        "oidc.user:" +
          process.env.VUE_APP_IS4_BASE_URL +
          ":" +
          process.env.VUE_APP_MAIN_CLIENT
      );
    }
  },

  mutations: {
    START_REFRESH_TIMER: (state, timer) => {
      state.refreshTimer = timer;
    },

    STOP_REFRESH_TIMER: state => {
      clearTimeout(state.refreshTimer);
      state.refreshTimer = null;
    },

    TOGGLE_SHOW_REFESH_MODAL: state => {
      if (!state.showRefreshModal) {
        state.showRefreshModal = true;
      } else {
        state.showRefreshModal = false;
      }
    },

    SET_USERMANAGER: (state, obj) => {
      state.userManager = obj;
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
      state.id_token = null;
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.scopes = null;
    },

    SET_LOGGIN_ERROR: (state, error) => {
      state.error = error;
      console.error(state.error);
    }
  },

  actions: {
    toggleShowRefreshModal({ commit }) {
      commit("TOGGLE_SHOW_REFESH_MODAL");
    },

    startRefreshTimer({ commit }) {
      commit("STOP_REFRESH_TIMER");
      commit(
        "START_REFRESH_TIMER",
        setTimeout(() => {
          commit("TOGGLE_SHOW_REFESH_MODAL");
        }, process.env.VUE_APP_REFRESH_MODAL)
      );
    },

    stopRefreshTimer({ commit }) {
      commit("STOP_REFRESH_TIMER");
    },

    setUserManager({ commit }, obj) {
      commit("SET_USERMANAGER", obj);
    },

    login({ commit, state }) {
      state.userManager.signinRedirect().catch(err => {
        commit("SET_LOGGIN_ERROR", err);
        console.error(err); //NEED TO LOG ERRORS TO API FOR PRESISTENCE
      });
    },

    setAuthState({ commit, state }) {
      state.userManager.getUser().then(function(user) {
        commit("SET_LOGGEDIN_STATE", user);
      });
    },

    setStateError({ commit }, data) {
      commit("SET_LOGGIN_ERROR", data);
      console.error(data); //NEED TO LOG ERRORS TO API FOR PRESISTENCE
    },

    logout({ commit, state }) {
      let idToken;
      state.userManager.getUser().then(user => {
        idToken = user.id_token;
      });
      state.userManager
        .signoutRedirect({
          uri: process.env.VUE_APP_IS4_BASE_URL + "/connect/endsession",
          id_token: idToken,
          post_logout_redirect_uri: process.env.VUE_APP_BASAE_URL
        })
        .then(function() {
          commit("SET_LOGOUT_STATE", false);
        });
    }
  }
};

export default authState;
