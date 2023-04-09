import axios from "axios";

export default {
  index(collection, params) {
    return axios.get(`${import.meta.env.VITE_APP_MOVIE_API_V3}/${collection}`, {
      params: {
        ...params,
        api_key: import.meta.env.VITE_APP_MOVIE_API_KEY_V3,
      },
    });
  },
  show(id, collection, params) {
    return axios.get(
      import.meta.env.VITE_APP_MOVIE_API_V3 + `/${collection}/${id}`,
      {
        params: {
          ...params,
          api_key: import.meta.env.VITE_APP_MOVIE_API_KEY_V3,
        },
      }
    );
  },
  indexProviders(id, collection, params) {
    return axios.get(
      `${
        import.meta.env.VITE_APP_MOVIE_API_V3
      }/${collection}/${id}/watch/providers`,
      {
        params: {
          ...params,
          api_key: import.meta.env.VITE_APP_MOVIE_API_KEY_V3,
        },
      }
    );
  },
  indexVideos(id, collection, params) {
    return axios.get(
      `${import.meta.env.VITE_APP_MOVIE_API_V3}/${collection}/${id}/videos`,
      {
        params: {
          ...params,
          api_key: import.meta.env.VITE_APP_MOVIE_API_KEY_V3,
        },
      }
    );
  },
  update(id) {
    // readonly resource
  },
  create(data) {
    // readonly resource
  },
  delete(id) {
    // readonly resource
  },
};
