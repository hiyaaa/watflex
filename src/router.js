import Vue from "vue";
import Router from "vue-router";
import goTo from "vuetify/es5/services/goto";
// import store from "@/store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  // This is for the scroll top when click on any router link
  scrollBehavior: (to, from, savedPosition) => {
    let scrollTo = 0;

    if (to.hash) {
      scrollTo = to.hash;
    } else if (savedPosition) {
      scrollTo = savedPosition.y;
    }

    return goTo(scrollTo);
  },
  // This is for the scroll top when click on any router link
  routes: [
    {
      path: "/",
      name: "LAYOUT",
      redirect: "dashboard",
      component: () => import("@/layouts/full-layout/Layout"),
      children: [
        {
          name: "HOME",
          path: "dashboard",
          component: () => import("@/views/dashboard/Dashboard")
          // component: () => import("@/views/dashboard/Dashboard_before")
        },
        {
          name: "BOARD",
          path: "/board",
          component: () => import("@/views/board/Board"),
        },
        // {
        //   name: "AP_DETAIL",
        //   path: "ap/ap/:mac",
        //   redirect: "ap/ap/:mac/performance",
        //   component: () => import("@/views/information/Info"),
        //   meta: { parent: "APList"},
        //   children: [
        //     {
        //       name: "AP_DETAIL_PERFORMANCE",
        //       path: "performance",
        //       component: () => import("@/views/information/tabs/ap/Performance")
        //     },
        //     {
        //       name: "AP_DETAIL_TRAFFIC",
        //       path: "traffic",
        //       component: () => import("@/views/information/tabs/ap/Traffic")
        //     },
        //     {
        //       name: "AP_DETAIL_TOOL",
        //       path: "tool",
        //       component: () => import("@/views/information/tabs/ap/Tool")
        //     },
        //     {
        //       name: "AP_DETAIL_CLIENT",
        //       path: "client",
        //       component: () => import("@/views/information/tabs/ap/Client")
        //     },
        //     {
        //       name: "AP_DETAIL_ALARM",
        //       path: "alarm",
        //       component: () => import("@/views/information/tabs/ap/Alarm")
        //     },
        //     {
        //       name: "AP_DETAIL_EVENT",
        //       path: "event",
        //       component: () => import("@/views/information/tabs/ap/Event")
        //     }
        //   ]
        // },
      ]
    },
    {
      path: "/authentication",
      component: () => import("@/layouts/blank-layout/Blanklayout"),
      children: [
        {
          name: "Login",
          path: "login",
          component: () => import("@/views/authentication/FullLogin")
        },
        {
          name: "FullRegister",
          path: "fullregister",
          component: () => import("@/views/authentication/FullRegister")
        },
        {
          name: "Error",
          path: "error",
          component: () => import("@/views/authentication/Error")
        }
      ]
    },
  ]
});

import NProgress from "nprogress";

router.beforeEach((to, from, next) => {
  if (!to.matched.length) return next({ name: "Error" });

  if (to.name == "Error") return next();

  // const account = store.state.account.account;
  const account = window.localStorage.getItem('account');

  if (to.name == "Login") {
    if (account) return next({ name: "Home" });
    return next();
  }

  if (!account) return next({ name: "Login" });
  next();
});
router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start(800);
  }
  next();
});

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});

export default router;
