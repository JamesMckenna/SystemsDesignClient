<template>
  <article v-if="this.$store.getters['blogsState/showBlog'](this.blogId)">
    <h3>Title: {{ blog.title }}</h3>
    <h4>Author: {{ blog.author }}</h4>
    <p><span>Date Posted:</span> {{ blog.datePosted }}</p>
    <p><span>Category:</span> {{ blog.category }}</p>
    <p><span>Description:</span> {{ blog.description }}</p>
    <p><span>Tags:</span> {{ blog.tags }}</p>
    <p>
      <button
        type=""
        form="createBlog"
        class="theme-border theme-shadow theme-button theme-button"
        @click="notYetImplmeneted"
      >
        Edit
      </button>
    </p>

    <div
      class="content"
      v-for="(item, index) in blog.content"
      v-bind:key="item[index]"
    >
      <left-section>
        <template v-slot:left-child>
          {{ item.paragraph }}
        </template>
        <template else v-slot:right-child>
          <img v-bind:src="'/images/blogimages/' + item.image" />
        </template>
      </left-section>
    </div>
  </article>
</template>

<script>
export default {
  name: "Blog",
  data() {
    return {
      blogId: null
    };
  },
  components: {
    "left-section": () =>
      import("@/components/wrapper-components/LeftSection.vue")
  },
  methods: {
    notYetImplmeneted(evt) {
      evt.preventDefault();
      alert("Not yet implemented");
    }
  },
  computed: {
    blog: function() {
      return this.$store.getters["blogsState/showBlog"](this.blogId);
    }
  },
  beforeCreate: function() {
    this.$store.dispatch("blogsState/fetchBlogs");
  },
  created: function() {
    this.blogId = this.$route.params.id;
  }
};
</script>

<style scoped>
button {
  margin: 1rem auto;
}
h3,
h4 {
  display: block;
  margin: 1rem 1rem;
  text-align: center;
}

p {
  padding-left: 1rem;
  padding-right: 1rem;
  text-align: center;
}

span {
  font-weight: bold;
}

.content >>> .left-child {
  line-height: 150%;
  margin: auto auto;
}

/*--------------------------320px----------------------*/
@media (min-width: 20rem) {
  .content >>> .left-child {
    padding-left: 1rem;
    padding-right: 1rem;
    text-indent: 3rem;
  }

  .content >>> img {
    margin: auto auto;
  }
}
/*-------------------------420px------------------------*/
@media (min-width: 26.25rem) {
  .content >>> .left-child {
    max-width: 36rem;
    padding: 1rem;
  }

  .content >>> img {
    margin: auto auto;
  }
}
/*--- Nav from desktop to mobile -640px- login links moved with js-------------------*/
@media (min-width: 40rem) {
  .content >>> section {
    display: grid;
    grid-template-columns: 2fr 1fr;
  }
}
/*---------------------728px-----------------------------*/
@media (min-width: 45.5rem) {
}
/*-------------------------960 px-----------------------*/
@media (min-width: 60rem) {
}
/*--------------------------------1328 px---------------*/
@media (min-width: 83rem) {
}
</style>
