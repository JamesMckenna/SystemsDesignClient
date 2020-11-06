/* eslint-disable @typescript-eslint/camelcase */
/*(process.env.VUE_APP_TOKEN_DURATION - (process.env.VUE_APP_REFRESH_MODAL / 1000))*/
import { WebStorageStateStore, InMemoryWebStorage } from "oidc-client";

const config = () => {
  return {
    metadata: {
      issuer: process.env.VUE_APP_IS4_BASE_URL,
      authorization_endpoint: process.env.VUE_APP_IS4_BASE_URL + "/connect/authorize",
      userinfo_endpoint: process.env.VUE_APP_IS4_BASE_URL + "/connect/userinfo",
      end_session_endpoint: process.env.VUE_APP_IS4_BASE_URL + "/connect/endsession",
      jwks_uri: process.env.VUE_APP_IS4_BASE_URL + "/.well-known/openid-configuration/jwks",
      check_session_iframe: process.env.VUE_APP_IS4_BASE_URL + "/connect/checksession",
      introspection_endpoint: process.env.VUE_APP_IS4_BASE_URLL + "/connect/introspect",
      revocation_endpoint: process.env.VUE_APP_IS4_BASE_URL + "/connect/revocation",
      token_endpoint: process.env.VUE_APP_IS4_BASE_URL + "/connect/token",
      prompt: "none",
    },
    authority: process.env.VUE_APP_IS4_BASE_URL,
    client_id: "MainClient",
    redirect_uri: process.env.VUE_APP_BASE_URL + "/callback.html",
    response_type: "code",
    scope: "openid profile IdApi offline_access",
    post_logout_redirect_uri: process.env.VUE_APP_BASE_URL,

    monitorSession: false,
    checkSessionInterval: 500,
    revokeAccessTokenOnSignOut: true,
    staleStateAge: 1,
    silent_redirect_uri: process.env.VUE_APP_BASE_URL + "/silent-refresh.html",

    userStore: new WebStorageStateStore({ store: window.sessionStorage }) // Session storage - not shared between windows. Need to re-login when opening a new tab.
    //userStore: new WebStorageStateStore({ store: window.localStorage }) // Local storage - can share between tabs, but less secure than session storage
    //userStore: new WebStorageStateStore({ store: new InMemoryWebStorage() }) // Can't seem to get this to work
  }
};

export default config();
