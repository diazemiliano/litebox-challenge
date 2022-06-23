import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import FavouritesView from "@/views/FavouritesView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/favourites",
    name: "favourites",
    component: FavouritesView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
