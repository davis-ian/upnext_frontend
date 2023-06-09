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
  discoverTitles(collection, params) {
    return axios.get(
      `${import.meta.env.VITE_APP_MOVIE_API_V3}/discover/${collection}`,
      {
        params: {
          ...params,
          watch_region: "US",
          api_key: import.meta.env.VITE_APP_MOVIE_API_KEY_V3,
        },
      }
    );
  },
  getWatchProviders(collection, params) {
    return axios.get(
      `${import.meta.env.VITE_APP_MOVIE_API_V3}/watch/providers/${collection}`,
      {
        params: {
          ...params,
          watch_region: "US",
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
  getCast(id, collection, params) {
    return axios.get(
      import.meta.env.VITE_APP_MOVIE_API_V3 + `/${collection}/${id}/credits`,
      {
        params: {
          ...params,
          api_key: import.meta.env.VITE_APP_MOVIE_API_KEY_V3,
        },
      }
    );
  },
  getExternalIds(id, collection, params) {
    return axios.get(
      import.meta.env.VITE_APP_MOVIE_API_V3 +
        `/${collection}/${id}/external_ids`,
      {
        params: {
          ...params,
          api_key: import.meta.env.VITE_APP_MOVIE_API_KEY_V3,
        },
      }
    );
  },
  getContentRatings(id, params) {
    return axios.get(
      import.meta.env.VITE_APP_MOVIE_API_V3 + `/tv/${id}/content_ratings`,
      {
        params: {
          ...params,

          api_key: import.meta.env.VITE_APP_MOVIE_API_KEY_V3,
        },
      }
    );
  },
  getReleaseDates(id, params) {
    return axios.get(
      import.meta.env.VITE_APP_MOVIE_API_V3 + `/movie/${id}/release_dates`,
      {
        params: {
          ...params,

          api_key: import.meta.env.VITE_APP_MOVIE_API_KEY_V3,
        },
      }
    );
  },
  getRecommendations(id, collection, params) {
    return axios.get(
      import.meta.env.VITE_APP_MOVIE_API_V3 +
        `/${collection}/${id}/recommendations`,
      {
        params: {
          ...params,
          api_key: import.meta.env.VITE_APP_MOVIE_API_KEY_V3,
        },
      }
    );
  },
  getSimilar(id, collection, params) {
    return axios.get(
      import.meta.env.VITE_APP_MOVIE_API_V3 + `/${collection}/${id}/similar`,
      {
        params: {
          ...params,
          api_key: import.meta.env.VITE_APP_MOVIE_API_KEY_V3,
        },
      }
    );
  },
  getReviews(id, collection, params) {
    return axios.get(
      import.meta.env.VITE_APP_MOVIE_API_V3 + `/${collection}/${id}/reviews`,
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
