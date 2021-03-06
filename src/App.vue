/* eslint-disable prettier/prettier */
<template>
  <div id="app">
    <site-nav />
    <component v-bind:is="'site-header'" v-if="header"></component>
    <notify-modal v-show="$store.state.authState.showRefreshModal" />
    <main id="injected-content">
      <router-view v-on:renderHeader="renderHeader($event)" />
    </main>
    <site-footer />
  </div>
</template>

<script>
import SiteHeader from "@/components/main-components/SiteHeader.vue";
import SiteNav from "@/components/main-components/SiteNav.vue";
import SiteFooter from "@/components/main-components/SiteFooter.vue";
import NotifyModal from "@/components/helper-components/NotifyModal";
import "./styles/reset.module.css";
import store from "./store";

export default {
  name: "App",

  components: {
    "site-header": SiteHeader,
    "site-nav": SiteNav,
    "site-footer": SiteFooter,
    "notify-modal": NotifyModal
  },

  data() {
    return {
      //Render header component
      header: false,
    };
  },

  methods: {
    //If the view to be rendered in <router-view> emits header=true, show header.
    //It is the view's responsibility to say if the rendered page needs a header or not.
    renderHeader: function(val) { val ? (this.header = val) : (this.header = false); }
  },

  beforeCreate: function() {
    if (this.$userManager != undefined) {
        this.$userManager.events.addUserLoaded(function() {
          //prevent event from calling store.dispatch("authState/hideRefreshModal") more than once
          if (store.getters["authState/getShowRefreshModal"]) {
            store.dispatch("authState/hideRefreshModal");
          }
        });

        this.$userManager.events.addAccessTokenExpiring(() => {
          //prevent event from calling store.dispatch("authState/showRefreshModal") more than once
          if (!store.getters["authState/getShowRefreshModal"]){
            store.dispatch("authState/showRefreshModal");
          }
        });

        this.$userManager.events.addAccessTokenExpired(function() {
          store.dispatch("authState/logout");
        });

        this.$userManager.events.addSilentRenewError(function() { console.log("addSilentRenewError event"); });

        this.$userManager.events.addUserSignedOut(function() {
           store.dispatch("authState/clearUserState");
            if (sessionStorage.getItem("oidc.user:" + process.env.VUE_APP_IS4_BASE_URL + ":" + process.env.VUE_APP_MAIN_CLIENT) != undefined) 
            {
              sessionStorage.removeItem("oidc.user:" + process.env.VUE_APP_IS4_BASE_URL + ":" + process.env.VUE_APP_MAIN_CLIENT);
            }
        });
    }

    if (sessionStorage.getItem("oidc.user:" + process.env.VUE_APP_IS4_BASE_URL + ":" + process.env.VUE_APP_MAIN_CLIENT) != undefined) 
    {
      store.dispatch("authState/setAuthState");
    }    
  },

  destroyed: function() {
    this.$userManager.events.removeUserLoaded();
    this.$userManager.events.removeAccessTokenExpiring();
    this.$userManager.events.removeAccessTokenExpired();
    this.$userManager.events.removeSilentRenewError();
    this.$userManager.events.removeUserSignedOut();
  }
};
</script>

<style lang="scss">
/*1px = 0.0625rem, 2px = 0.125rem, 3px = 0.1875rem, 4px = 0.25rem, 5px = 0.3125rem, 8px = 0.5rem, 10px = 0.625rem, 12px = 0.75rem, 14px = 0.875rem, 16px = 1rem (base), 18px = 1.125rem, 20px = 1.25rem, 24px = 1.5rem, 30px = 1.875rem, 32px = 2rem*/
:root {

  --bgcolor1: chartreuse;
  --bgcolor2: white;
  --bgcolor3: yellow;

  --h-tag-colour: #696986;
  --shadow-text-offset: 0.0625rem 0.0625rem 0.0625rem #fff;
  --ndd-bg-colour: #dcdcdc;
  --boxshadow: 0.125rem 0.125rem 0.125rem 0.0625rem #696986;
  --boxshadow-right: -0.125rem  0.125rem 0.125rem 0.0625rem #696986;
  --borderradius: 0.1875rem;
  --borderstyle: inset;
  --borderwidth: 0.1rem;
  --bordercolor: transparent;

  --a-hover-colour: #fff;
  --navlink-gradient-hov-1: rgba(125, 185, 232, 0.01);
  --navlink-gradient-hov-2: rgba(105, 105, 134, 0.1);
  --navlink-gradient-hov-3: rgba(105, 105, 134, 1);
  --navlink-gradient-active-1: rgba(0, 0, 0, 0.3);
  --navlink-gradient-active-2: rgba(0, 0, 0, 0);

  font-family: Hind_Vadndara;
  --width: 100%; /* GOOD SO FAR */
}

.theme-shadow {
  box-shadow: var(--boxshadow);
}
.theme-shadow-right {
  box-shadow: var(--boxshadow-right);
}

.theme-border {
  border-radius: var(--borderradius);
  border-style: var(--borderstyle);
  border-width: var(--borderwidth);
  border-color: var(--bordercolor);
}

.theme-button {
  margin: 0.25rem;
  background: var(--bgcolor2);
  color: var(--h-tag-colour);
  cursor: pointer;
}

.theme-button:hover,
svg:hover {
  fill: white;
}

.theme-button:hover {
  color: white;
  background: linear-gradient(
    to right,
    var(--navlink-gradient-hov-1) 0%,
    var(--navlink-gradient-hov-2) 50%,
    var(--navlink-gradient-hov-3) 100%
  );
}

@font-face {
  font-family: "Hind_Vadndara";
  src: url("./assets/fonts/Hind_Vadodara/HindVadodara-Light.ttf");
  src: url("./assets/fonts/Hind_Vadodara/HindVadodara-Bold.ttf");
  src: url("./assets/fonts/Hind_Vadodara/HindVadodara-Medium.ttf");
  src: url("./assets/fonts/Hind_Vadodara/HindVadodara-Regular.ttf");
  font-family: "Roboto";
  src: url("./assets/fonts/Roboto/Roboto-Italic.ttf");
}

h1,
h2,
h3,
h4,
h5,
h6 {
  color: var(--h-tag-colour);
  text-shadow: var(--shadow-text-offset);
  text-decoration: underline;
  font-weight: bold;
  text-align: center;
}
h1 {
  font-size: 2.5rem;
}
h2 {
  font-size: 1.875rem;
}
h3 {
  font-size: 1.5rem;
}
h4 {
  font-size: 1.25rem;
}

a {
  color: var(--h-tag-colour);
  text-shadow: var(--shadow-text-offset);
}
a:hover {
  color: white;
  text-shadow: none;
}

li {
  display: block;
}

html {
  position: absolute;
  z-index: 0;
  width: var(--width);
  min-height: 100vh;
  margin: auto auto;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.01) 0%,
    rgba(127, 127, 127, 0.5) 40%,
    rgba(127, 127, 127, 0.01) 50%,
    rgba(127, 127, 127, 0.5) 60%,
    rgba(255, 255, 255, 0.01) 100%
  );
}

body {
  box-sizing: border-box;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  width: var(--width);
  box-shadow: 0 0 200px rgba(0, 0, 0, 0.5) inset; //vinyette
}
p {
  line-height: 150%;
}

#app {
  margin: auto auto;
  position: relative;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/*--------------------------320px----------------------*/
@media (min-width: 20rem) {
  #app {
    min-width: 20rem;
  }
}
/*-------------------------420px------------------------*/
@media (min-width: 26.25rem) {
}
/*--- Nav from desktop to mobile -640px- login links moved with js-------------------*/
@media (min-width: 40rem) {
  #app {
    min-width: 40rem;
  }
}
/*---------------------728px-----------------------------*/
@media (min-width: 45.5rem) {
  #app {
    min-width: 45.5rem;
  }
}
/*-------------------------960 px-----------------------*/
@media (min-width: 60rem) {
}
/*--------------------------------1328 px---------------*/
@media (min-width: 83rem) {
  #app {
    width: 83rem;
  }
}
</style>
