import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/test",
      name: "test",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "test" */ "./views/Test.vue")
    },
    {
      path: "/tests",
      name: "tests",
      component: () =>
        import(/* webpackChunkName: "tests" */ "./views/Tests.vue")
    },
    {
      path: "/results",
      name: "currentResults",
      component: () =>
        import(/* webpackChunkName: "results" */ "./views/Results.vue")
    },
    {
      path: "/results/:testId",
      name: "results",
      component: () =>
        import(/* webpackChunkName: "results" */ "./views/Results.vue")
    }
  ]
});
