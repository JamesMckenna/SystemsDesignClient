import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: () =>
    import(/* webpackChunkName: "home" */ "../views/Home.vue"),
    children: [
      {    path: "/About",
      name: "About",
      component: () =>
        import(/* webpackChunkName: "home" */ "../views/Home.vue")},
      {    path: "/Contact",
      name: "Contact",
      component: () =>
        import(/* webpackChunkName: "home" */ "../views/Home.vue")}
    ]
  },
  {
    path: "/Blogs",
    name: "Blogs",
    component: () =>
      import(/* webpackChunkName: "blogs" */ "../views/Blogs.vue"),
      children: [
        {    
          path: "/Blog/:id",
          name: "Blog",
          component: () =>
            import(/* webpackChunkName: "blogs" */ "../views/Blogs.vue")},
        {
            path: "/New-Blog",
            name: "NewBlog",
            component: () =>
              import(/* webpackChunkName: "blogs" */ "../views/Blogs.vue")
        }
      ]
  },
  {
    path: "*",
    name: "Error",
    component: () =>
      import(/* webpackChunkName: "blogs" */ "../views/Error.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
