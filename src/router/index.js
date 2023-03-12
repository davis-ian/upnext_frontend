import { createWebHistory, createRouter } from "vue-router";
import MoviesHome from "@/views/MoviesHome.vue";
import UserProfile from "@/views/UserProfile.vue";
import MovieDetails from "@/views/MovieDetails.vue";
import TVDetails from "@/views/TVDetails.vue";
import HomeOld from "@/views/HomeOld.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: MoviesHome,
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
    path: "/home-old",
    name: "OldHome",
    component: HomeOld,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
