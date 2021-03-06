import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import firebase from "firebase/app";
import "firebase/auth";

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
      path: "/customTest",
      name: "custom",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "test" */ "./views/CustomQuiz.vue")
    },
    {
      path: "/processTest",
      name: "test",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "test" */ "./views/ProcessTest.vue")
    },
    {
      path: "/styleTest",
      name: "styleTest",
      component: () => import(/* webpackChunkName: "styleTest" */ "./views/StyleTest.vue")
    },
    {
      path: "/tests",
      name: "tests",
      component: () =>
        import(/* webpackChunkName: "tests" */ "./views/Tests.vue")
    },
    {
      path: "/methods",
      name: "methods",
      component: () =>
        import(/* webpackChunkName: "methods" */ "./views/Methods.vue")
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
    },
    {
      path: "/logout",
      name: "logout",
      beforeEnter: (to, from, next) => {
        firebase
          .auth()
          .signOut()
          .then(() => {
            next("/");
          });
      }
    }
  ]
});
