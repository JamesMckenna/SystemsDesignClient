<template>
  <div>
    <template v-if="this.$route.path === '/'">
      <div class="home">
        <HelloWorld msg="Welcome to my test / staging server" />
      </div>
    </template>

    <template v-if="this.$route.path === '/About'">
      <about></about>
    </template>

    <template v-if="this.$route.path === '/Contact'">
      <contact></contact>
    </template>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    about: () => import("@/components/main-components/About.vue"),
    contact: () => import("@/components/main-components/Contact.vue")
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
