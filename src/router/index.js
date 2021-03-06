import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Baller from "../views/Baller.vue";
import Squad from "../views/Squad.vue";
import CollegeGauntlet from "../views/CollegeGauntlet";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/baller",
    name: "Baller",
    component: Baller,
  },
  {
    path: "/squad",
    name: "Squad",
    component: Squad,
  },
  {
    path: "/collegegauntlet",
    name: "CollegeGauntlet",
    component: CollegeGauntlet,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
