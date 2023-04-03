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

const app = createApp(App);
const pinia = createPinia();
// =============================================================================
// PLUGINS
// =============================================================================
import { registerPlugins } from "@/plugins";
import { createAuth0 } from "@auth0/auth0-vue";
// import { Auth0Plugin } from "./auth/auth0-plugin";
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
} from "@fortawesome/free-solid-svg-icons";

// import { fa } from "@fortawesome/free-regular-svg-icons";

library.add(
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
// app.use(Auth0Plugin, {
//   domain: import.meta.env.VITE_APP_AUTH0_DOMAIN,
//   clientId: import.meta.env.VITE_APP_AUTH0_CLIENT_ID,
//   audience: import.meta.env.VITE_APP_AUD,
//   onRedirectCallback: (appState) => {
//     router.push(
//       appState && appState.targelUrl
//         ? appState.targetUrl
//         : window.location.pathname
//     );
//   },
// });

app.use(router);
app.use(pinia);

app.use(
  createAuth0({
    domain: import.meta.env.VITE_APP_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_APP_AUTH0_CLIENT_ID,
    useRefreshTokens: true,
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: import.meta.env.VITE_APP_AUD,
    },
  })
);
registerPlugins(app);
app.mount("#app");
