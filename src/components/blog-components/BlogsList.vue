<template>
  <div class="blogs">
    <h2>A List of Blogs</h2>
    <pagination
      :numOfItems="allBlogs.length - 1"
      v-on:paginate="paginationValues($event)"
    ></pagination>
    <div
      class="blog theme-border theme-shadow"
      v-for="blog in getRangeOfBlogs"
      v-bind:key="blog.id"
    >
      <router-link v-bind:to="'/Blog/' + blog.id">
        <div class="imagediv theme-border theme-shadow">
          <img
            v-bind:src="'/images/avatars/' + blog.avatar"
            alt="Author's image or avatar."
          />
        </div>
        <div class="bloginfo theme-border theme-shadow">
          <h3><span>ID:</span> {{ blog.id }}</h3>
          <h3><span>Title:</span> {{ blog.title }}</h3>
          <h4><span>Author:</span> {{ blog.author }}</h4>
          <p><span>Date Posted:</span> {{ blog.datePosted }}</p>
          <p><span>Category:</span> {{ blog.category }}</p>
          <p><span>Description:</span> {{ blog.description }}</p>
          <p><span>Tags:</span> {{ blog.tags }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogsList",
  components: {
    pagination: () => import("@/components/helper-components/Pagination.vue")
  },
  props: ["paginate"],
  data() {
    return {
      emitPagination: {
        currentItem: {
          type: Number,
          default: 0
        },
        getNumOfItems: {
          type: Number,
          default: 0
        }
      }
    };
  },
  methods: {
    paginationValues(event) {
      this.emitPagination.getNumOfItems = event.getNumOfItems;
      this.emitPagination.currentItem = event.currentItem;
    }
  },
  computed: {
    allBlogs() {
      return this.$store.getters.allBlogs;
    },
    getRangeOfBlogs() {
      return this.$store.getters.getRangeOfBlogs(this.emitPagination);
    }
  },
  mounted: function() {
    this.emitPagination.currentItem = 1;
    this.emitPagination.getNumOfItems = 5;
  },
  created: function() {
    this.$store.dispatch("fetchBlogs");
  }
};
</script>

<style scoped>
.blogs {
  width: 100%;
  min-height: 100vh;
}

h2 {
  text-align: center;
}

.blog h3,
h4 {
  text-decoration: none;
  color: black;
  padding-left: 1rem;
}

p span {
  font-weight: bold;
}

.blog a {
  width: 100%;
  height: 100%;
}

.blog a,
.blog p {
  text-decoration: none;
  color: black;
}

.blog p {
  padding-left: 1rem;
  font-weight: 100;
  text-shadow: none;
}

img {
  display: block;
  margin: auto auto;
}

.bloginfo {
  background-color: var(--bgcolor1);
}

.imagediv {
  height: 100%;
  background-color: aqua;
}
/*--------------------------320px----------------------*/
@media (min-width: 20rem) {
  .blog {
    width: 95%;
    margin: 1rem auto;
    background-color: var(--bgcolor2);
  }

  img {
    width: 7rem;
    height: 8rem;
  }

  .bloginfo {
    width: 100%;
  }

  .imagediv {
    width: 100%;
  }
}
/*-------------------------420px------------------------*/
@media (min-width: 26.25rem) {
}
/*--- Nav from desktop to mobile -640px- login links moved with js-------------------*/
@media (min-width: 40rem) {
  .blog {
    margin-bottom: 6rem;
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }

  .blog h3,
  h4 {
    margin: 0.5rem 1rem;
  }

  .bloginfo {
    display: inline-block;
    position: relative;
    top: 5rem;
    right: 3rem;
    z-index: 301;
    width: 74%;
  }

  .imagediv {
    display: inline-block;
    position: relative;
    z-index: 300;
    width: 24%;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }
}
/*---------------------728px-----------------------------*/
@media (min-width: 45.5rem) {
  .blog {
    width: 85%;
  }

  .bloginfo {
    right: 2rem;
  }

  .imagediv {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
}
/*-------------------------960 px-----------------------*/
@media (min-width: 60rem) {
  .blog {
    min-height: 15rem;
    width: 75%;
  }

  .bloginfo {
    right: 2rem;
  }
}
/*--------------------------------1328 px---------------*/
@media (min-width: 83rem) {
}
</style>
