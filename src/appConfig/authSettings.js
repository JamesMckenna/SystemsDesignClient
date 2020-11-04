/* eslint-disable @typescript-eslint/camelcase */
import { WebStorageStateStore } from "oidc-client";
const config = {
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
    prompt: true,
    display: true
  },
  authority: process.env.VUE_APP_IS4_BASE_URL,
  client_id: "MainClient",
  redirect_uri: process.env.VUE_APP_BASE_URL + "/callback.html",
  response_type: "code",
  scope: "openid profile IdApi offline_access",
  post_logout_redirect_uri: process.env.VUE_APP_BASE_URL,

  monitorSession: false,
  accessTokenExpiringNotificationTime: 120,
  checkSessionInterval: 2000,
  revokeAccessTokenOnSignOut: true,
  incluedIdTokenInSilientRenew: true,
  staleStateAge: 300,
  silent_redirect_uri: process.env.VUE_APP_BASE_URL + "/silent-refresh.html",

  userStore: new WebStorageStateStore({ store: window.sessionStorage })
};

export default config;
