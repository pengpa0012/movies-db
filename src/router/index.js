import { createRouter, createWebHashHistory } from "vue-router";
import SearchMovie from "../views/SearchMovie.vue";

const routes = [
  {
    path: "/",
    name: "Search Movie",
    component: SearchMovie,
    meta: {
      title: "Search Movie",
    },
  },
  {
    path: "/SuggestedMovie",
    name: "SuggestedMovie",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SuggestedMovie.vue"),
    /* children: [
      {
        path: "SuggestedMovie/movie/:id",
        name: "movieInfo",
        component: movieInfo,
      },
    ], */
    meta: {
      title: "Suggested Movie",
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
