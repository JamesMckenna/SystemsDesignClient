<template>
  <div>
    <h3>Blog Categories</h3>
    <ul>
      <li v-for="category in getCategories" v-bind:key="category.id">
        <!-- <router-link to="#">{{ category.category }}</router-link> -->
        <p class="router-link-exact-active router-link-active categories-p" @click="notYetImplmeneted">{{ category.category }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "BlogCategories",
  computed: {
    getCategories() {
      return this.$store.getters.getCategories;
    }
  },
  created: function() {
    this.$store.dispatch("fetchCategories");
  },
  methods: {
    notYetImplmeneted() {
      alert("Not yet implemented");
    }
  }
};
</script>

<style scoped>
h3 {
  text-align: center;
}

/* REMOVE P TAG FROM CSS ONCE CATEGORIES WIDGET IS IMPLEMENTED */
p:hover,
li:hover {
  background: -moz-linear-gradient(
    left,
    var(--navlink-gradient-hov-1) 0%,
    var(--navlink-gradient-hov-2) 50%,
    var(--navlink-gradient-hov-3) 100%
  );
  background: -webkit-linear-gradient(
    left,
    var(--navlink-gradient-hov-1) 0%,
    var(--navlink-gradient-hov-2) 50%,
    var(--navlink-gradient-hov-3) 100%
  );
  background: linear-gradient(
    to right,
    var(--navlink-gradient-hov-1) 0%,
    var(--navlink-gradient-hov-2) 50%,
    var(--navlink-gradient-hov-3) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#99000000',GradientType=1 );
}

/* REMOVE P TAG FROM CSS ONCE CATEGORIES WIDGET IS IMPLEMENTED */
p:active,
li:active {
  background: -moz-linear-gradient(
    left,
    var(--navlink-gradient-active-1) 50%,
    var(--navlink-gradient-active-2) 100%
  ); /* FF3.6-15 */
  background: -webkit-linear-gradient(
    left,
    var(--navlink-gradient-active-1) 50%,
    var(--navlink-gradient-active-2) 100%
  ); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    to right,
    var(--navlink-gradient-active-1) 50%,
    var(--navlink-gradient-active-2) 100%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#99000000', endColorstr='#00000000',GradientType=1 ); /* IE6-9 */
}
.categories-p {
  color: var(--h-tag-colour);
  text-shadow: var(--shadow-text-offset);
  text-decoration: underline;
}
.categories-p:hover {
  color: white;
  text-shadow: none;
}

/*--------------------------320px----------------------*/
@media (min-width: 20rem) {
  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  li {
    display: inline-flex;
    margin: 1rem 1rem;
  }
}
/*-------------------------420px------------------------*/
@media (min-width: 26.25rem) {
}
/*--- Nav from desktop to mobile -656px- login links moved with js-------------------*/
@media (min-width: 41rem) {
}
/*---------------------728px-----------------------------*/
@media (min-width: 45.5rem) {
  ul {
    display: block;
  }

  li {
    display: block;
    text-align: center;
    margin: 1rem 1rem;
  }
}
/*-------------------------960 px-----------------------*/
@media (min-width: 60rem) {
}
/*--------------------------------1328 px---------------*/
@media (min-width: 83rem) {
}
</style>
