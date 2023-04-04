import { defineStore } from "pinia";
import { createAuth0Client } from "@auth0/auth0-spa-js";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: null,
  }),

  actions: {
    async loginWithPopup() {
      const auth0 = await createAuth0Client({
        domain: "<your-auth0-domain>",
        client_id: "<your-auth0-client-id>",
        redirect_uri: window.location.origin,
      });

      await auth0.loginWithPopup();
      const user = await auth0.getUser();

      // save user information to Pinia store
      this.setUser(user);
    },

    async logout() {
      const auth0 = await createAuth0Client({
        domain: "<your-auth0-domain>",
        client_id: "<your-auth0-client-id>",
        redirect_uri: window.location.origin,
      });

      await auth0.logout();

      // clear user information from Pinia store
      this.setUser(null);
    },

    async getUser() {
      const auth0 = await createAuth0Client({
        domain: "<your-auth0-domain>",
        client_id: "<your-auth0-client-id>",
        redirect_uri: window.location.origin,
      });

      const user = await auth0.getUser();

      // save user information to Pinia store
      this.setUser(user);

      return user;
    },

    setUser(user) {
      this.user = user;
    },
  },
});
