import store from '../store';
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";


Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/callback.html",
    name: "callback",
  },
  {
    path: "/silent-refresh.html",
    name: "silent-refresh",
  },
  {
    path: "/",
    name: "Home",
    component: () =>
    import(/* webpackChunkName: "home" */ "../views/Home.vue"),
    children: [
      {
        path: "/About",
        name: "About",
      },
      {
        path: "/Contact",
        name: "Contact"
      }
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
          name: "Blog"
        },
        {
            path: "/New-Blog",
            name: "NewBlog"
        }
      ]
  },
  {
    path: "*",
    name: "Error",
    component: () =>
      import(/* webpackChunkName: "error" */ "../views/Error.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes
});

router.beforeEach((to, from, next) => {
  if(store.getters['authState/getLoggedIn'])
  {
    Vue.prototype.$userManager.signinSilent();
  }
  next();
});

export default router;
