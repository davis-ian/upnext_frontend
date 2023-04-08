import { createAuth0 } from "@auth0/auth0-vue";

export const auth0 = createAuth0({
  domain: import.meta.env.VITE_APP_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_APP_AUTH0_CLIENT_ID,
  useRefreshTokens: true,
  cacheLocation: "localstorage",
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: import.meta.env.VITE_APP_AUD,
  },
});
