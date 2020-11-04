<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal theme-border theme-shadow">
        <header class="modal-header">
          <h5 class="header-text">Your session is about to expire!</h5>
        </header>
        <section class="modal-body">
          A session last for {{ sessionLength }} minutes and you have been
          inactive for awhile.<br />
          You will be logged out soon.
        </section>
        <footer class="modal-footer">
          <button
            type="button"
            class="theme-button theme-shadow theme-border renew-button"
            @click="renew"
          >
            Don't log me out, refresh my session!
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import store from "../../store";
export default {
  name: "NotifyModal",

  data() {
    return {
      sessionLength: process.env.VUE_APP_AUTHENTICATION_DURATION * 3
    };
  },

  methods: {
    renew() {
      if (store.getters["authState/getLoggedIn"]) {
        this.$userManager.startSilentRenew();
        this.$emit("close");
        setTimeout(() => {
          this.$userManager.stopSilentRenew();
        }, 2000);
      }
    }
  }
};
</script>

<style scoped>
.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 1rem;
  display: flex;
}

.modal-header {
  height: 2rem;

  background-color: var(--bgcolor3);
  border-bottom: 1px solid #eeeeee;
  color: black;
  padding: 0;
}
.header-text {
  margin: auto;
}
.modal-footer {
  height: 3rem;
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: relative;
  top: -0.75rem;
  right: -1rem;
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  border-radius: 100%;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  color: black;
  background: white;
  padding: 0.0125rem;
}

.renew-button {
  margin: auto;
  height: 2rem;
}
</style>
