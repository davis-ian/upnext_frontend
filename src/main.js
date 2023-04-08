/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// // Components
// import App from "./App.vue";

// // Composables
// import { createApp } from "vue";
// import router from "./router";

// // Plugins
// import { registerPlugins } from "@/plugins";
// import { createAuth0 } from "@auth0/auth0-vue";
// import axios from "axios";
// import VueAxios from "vue-axios";

// const app = createApp(App);

// app.use(router);
// app.use(VueAxios, axios);
// app.use(
//   createAuth0({
//     domain: import.meta.env.VITE_APP_AUTH0_DOMAIN,
//     clientId: import.meta.env.VITE_APP_AUTH0_CLIENT_ID,
//     authorizationParams: {
//       redirect_uri: window.location.origin,
//     },
//   })
// );

// registerPlugins(app);

// =============================================================================
// COMPONENTS
// =============================================================================
import App from "./App.vue";
import router from "@/router";

// =============================================================================
// COMPOSABLES
// =============================================================================
import { createApp } from "vue";
import { createPinia } from "pinia";
// import pinia from "@/stores/user";

const app = createApp(App);
const pinia = createPinia();
// =============================================================================
// PLUGINS
// =============================================================================
import { registerPlugins } from "@/plugins";

// import { auth0 } from "@/auth/index";
import { createAuth0 } from "@auth0/auth0-vue";

import axios from "axios";
import VueAxios from "vue-axios";
// =============================================================================
// FONT AWESOME CORE
// =============================================================================
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// =============================================================================
// FONT AWESOME ICONS
// =============================================================================
import {
  faStar,
  faStarHalf,
  faBars,
  faList,
  faTrash,
  faRightFromBracket,
  faUser,
  faHouse,
  faArrowLeft,
  faBreadSlice,
  faBacon,
  faIceCream,
  faDrumstickBite,
  faX,
  faStream,
} from "@fortawesome/free-solid-svg-icons";

// import { fa } from "@fortawesome/free-regular-svg-icons";

library.add(
  faStar,
  faStarHalf,
  faBars,
  faList,
  faTrash,
  faRightFromBracket,
  faUser,
  faHouse,
  faX,
  faArrowLeft,
  faBreadSlice,
  faBacon,
  faIceCream,
  faDrumstickBite
);

// =============================================================================
// FONT AWESOME CONFIG
// =============================================================================
app.component("font-awesome-icon", FontAwesomeIcon);

// =============================================================================
// GLOBALS
// =============================================================================
const axiosInstance = axios.create({
  withCredentials: true,
});
app.config.globalProperties.$axios = { ...axiosInstance };

// =============================================================================
// INIT
// =============================================================================

app.use(VueAxios, axios);
app.use(router);
app.use(pinia);
// app.use(auth0);

app.use(
  createAuth0({
    domain: import.meta.env.VITE_APP_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_APP_AUTH0_CLIENT_ID,
    useRefreshTokens: true,
    cacheLocation: "localstorage",
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: import.meta.env.VITE_APP_AUD,
    },
  })
);

// app.directive("click-outside", {
//   bind: function (el, binding, vnode) {
//     el.clickOutsideEvent = function (event) {
//       if (!(el == event.target || el.contains(event.target))) {
//       }
//     };
//     document.body.addEventListener("click", el.clickOutsideEvent);
//   },
//   unbind: function (el) {
//     document.body.removeEventListener("click", el.clickOutsideEvent);
//   },
// });

registerPlugins(app);
app.mount("#app");
