import Vue from "vue";

// import VueRouter from "vue-router";
import VueRouter from "@/vue-router";

import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    children: [
      {
        path: "a",
        component: {
          render: (h) => <h1>a</h1>,
        },
      },
      {
        path: "b",
        component: {
          render: (h) => <h1>b</h1>,
        },
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
    children: [
      {
        path: "a",
        component: {
          render: (h) => <h1>about a</h1>,
        },
      },
      {
        path: "b",
        component: {
          render: (h) => <h1>about b</h1>,
        },
      },
    ],
  },
];

const router = new VueRouter({
  // mode: "history",
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

router.matcher.addRoutes([
  {
    path: "/about",
    name: "about",
    component: AboutView,
    children: [
      {
        path: "c",
        component: {
          render: (h) => <h1>about c</h1>,
        },
      },
    ],
  },
]);

router.beforeEach((from, to, next) => {
  setTimeout(() => {
    console.log(from.path, to, 1);
    next();
  }, 1000);
});

router.beforeEach((from, to, next) => {
  setTimeout(() => {
    console.log(from.path, to, 2);
    next();
  }, 1000);
});

export default router;
