<template>
  <div class="blog-list">
    <p id="error">
      <strong>{{ error }}</strong>
    </p>
    <template v-if="this.$route.params.id === undefined && create === false">
      <right-section>
        <template v-slot:left-child>
          <blog-categories></blog-categories>
          <div style="margin: auto auto">
            <button
              class="theme-button theme-border theme-shadow"
              style="display: block; margin: 1rem auto"
              @click="$router.push({ name: 'NewBlog' })"
              v-if="!create"
            >
              Create Blog
            </button>
            <button
              class="theme-button theme-border theme-shadow"
              style="display: block; margin: 1rem auto"
              @click="notYetImplmeneted"
              v-if="!create"
            >
              New Category
            </button>
          </div>
        </template>
        <template v-slot:right-child>
          <p class="error">
            Please be aware, ALL the blog information is MOCK / FAKE data used
            for development purposes
          </p>
          <blogs-list></blogs-list>
        </template>
      </right-section>
    </template>
    <template v-else>
      <keep-alive>
        <blog></blog>
      </keep-alive>
    </template>
  </div>
</template>

<script>
export default {
  name: "Blogs",
  components: {
    "right-section": () =>
      import("@/components/wrapper-components/RightSection.vue"),
    blog: () => import("@/components/blog-components/Blog.vue"),
    "blog-categories": () =>
      import("@/components/blog-components/BlogCategories.vue"),
    "blogs-list": () => import("@/components/blog-components/BlogsList.vue")
  },
  data() {
    return {
      id: undefined,
      create: false,
      error: ""
    };
  },
  methods: {
    notYetImplmeneted() {
      alert("Not yet implemented");
    }
  }
};
</script>

<style scoped>
.blog-list {
  width: 100%;
  min-height: 100vh;
  margin-top: 6rem;
}

#error, .error {
  font-size: 1rem;
  color: rgb(255, 5, 5);
  text-align: center;
  margin: 1rem auto;
}
</style>
