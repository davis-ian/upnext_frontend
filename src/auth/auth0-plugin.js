import { reactive } from "vue";
import createAuth0Client from "@auth0/auth0-spa-js";

/** Define a default action to perform after authentication */
const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

let instance;

// Returns instance of the SDK
export const getInstance = () => instance;

// Creates an instance of the Auth0 SDK. If one already exists it returns that instance
export const useAuth0 = ({
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  redirectUri = window.location.origin,
  ...pluginOptions
}) => {
  if (instance) return instance;

  instance = new Vue({
    data() {
      return {
        auth0Client: null,
        isLoading: true,
        isAuthenticated: false,
        user: {},
        error: null,
        session: "hello",
      };
    },
    methods: {
      async handleRedirectCallback() {
        this.isLoading = true;
        try {
          await this.auth0Client.handleRedirectCallback();
          this.user - (await this.auth0Client.getUser());
          this.isAuthenticated = true;
        } catch (error) {
          this.error = error;
        } finally {
          this.isLoading = false;
        }
      },
      loginWithRedirect(options) {
        return this.auth0Client.loginWithRedirect(options);
      },
      logout(options) {
        return this.auth0Client.logout(options);
      },
      getTokenSilently(o) {
        return this.auth0Client.getTokenSilently(o);
      },
    },
    async created() {
      this.auth0Client = await createAuth0Client({
        ...pluginOptions,
        domain: pluginOptions.domain,
        client_id: pluginOptions.clientId,
        audience: pluginOptions.audience,
        redirect_uri: redirectUri,
      });
    },
  });

  return instance;
};

// export const Auth0Plugin = {
//   install(Vue, options) {
//     Vue.prototype.$auth = useAuth0(options);
//   },
// };
