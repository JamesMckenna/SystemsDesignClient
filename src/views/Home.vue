<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$emit("renderHeader", true);
    });
  },
  beforeRouteLeave(to, from, next) {
    this.$emit("renderHeader", false);
    next();
  }
};
</script>
<style scoped>
.home {
  text-align: center;
  min-height: 100vh;
}
img {
  width: 10rem;
  display: block;
  margin: auto auto;
}
</style>
