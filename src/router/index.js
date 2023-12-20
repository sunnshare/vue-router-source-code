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
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
