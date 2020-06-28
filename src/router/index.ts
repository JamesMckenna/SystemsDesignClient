import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: () =>
    import(/* webpackChunkName: "home" */ "../views/home/Home.vue"),
  },
  {
    path: "/About",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/home/About.vue")
  },
  {
    path: "/Contact",
    name: "Contact",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/home/Contact.vue")
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
  // {
  //   path: "/Blog/:id",
  //   name: "Blog",
  //   component: () =>
  //     import(/* webpackChunkName: "blogs" */ "../views/Blogs.vue")
  // },
  // {
  //   path: "/New-Blog",
  //   name: "NewBlog",
  //   component: () =>
  //     import(/* webpackChunkName: "CreateBlog" */ "@/components/blog-components/CreateBlog.vue")
  // },
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
