import { createWebHistory, createRouter } from "vue-router";

import Home from "@/views/Home.vue";
import UserProfile from "@/views/UserProfile.vue";
import MovieDetails from "@/views/MovieDetails.vue";
import TVDetails from "@/views/TVDetails.vue";
import CreateList from "@/views/CreateList.vue";
import ListDetail from "@/views/ListDetail.vue";
import TestCompVue from "@/views/TestComp.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/profile",
    name: "Profile",
    component: UserProfile,
  },
  {
    path: "/movie/:id",
    name: "MovieDetails",
    component: MovieDetails,
  },
  {
    path: "/tv/:id",
    name: "TVDetails",
    component: TVDetails,
  },
  {
    path: "/list/create",
    name: "CreateList",
    component: CreateList,
  },
  {
    path: "/list/:id",
    name: "ListDetail",
    component: ListDetail,
  },
  {
    path: "/test",
    name: "TestComp",
    component: TestCompVue,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
