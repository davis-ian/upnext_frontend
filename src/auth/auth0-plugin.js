import Vue from "vue";

let instance;

export const getInstance = () => instance;

export const useAuth0 = () => {
  if (instance) return instance;

  instance = new Vue({
    data() {
      return {
        auth0Client: null,
        isLoading: true,
        isAuthenticated: false,
        user: {},
        error: null,
      };
    },
    methods: {},
  });

  return instance;
};
