import { createWebHistory, createRouter } from "vue-router";

import { authGuard, useAuth0 } from "@auth0/auth0-vue";

import Home from "@/views/Home.vue";
import UserProfile from "@/views/UserProfile.vue";
import MovieDetails from "@/views/MovieDetails.vue";
import TVDetails from "@/views/TVDetails.vue";
import CreateList from "@/views/CreateList.vue";
import ListDetail from "@/views/ListDetail.vue";
import TestCompVue from "@/views/TestComp.vue";
import Lists from "@/views/Lists.vue";

// const extendedAuthGuard = async (to) => {
//   const response = await authGuard(to);
// };

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
    // beforeEnter: extendedAuthGuard,
  },
  {
    path: "/movie/:id",
    name: "MovieDetails",
    component: MovieDetails,
    // beforeEnter: extendedAuthGuard,
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
  {
    path: "/lists",
    name: "Lists",
    component: Lists,
    // beforeEnter: extendedAuthGuard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
