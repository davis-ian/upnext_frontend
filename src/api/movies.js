import axios from "axios";

export default {
  index(collection, params) {
    return axios.get(`${import.meta.env.VITE_APP_MOVIE_API}/${collection}`, {
      params: params,
    });
  },
  show(id, collection, params) {
    return axios.get(
      import.meta.env.VITE_APP_MOVIE_API + `/${collection}/${id}`,
      {
        params: params,
      }
    );
  },
  indexProviders(id, collection, params) {
    return axios.get(
      `${
        import.meta.env.VITE_APP_MOVIE_API
      }/${collection}/${id}/watch/providers`,
      {
        params: params,
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
