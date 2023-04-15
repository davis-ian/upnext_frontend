import axios from "axios";

export default {
  // List CRUD
  index(params) {
    return axios.get(`${import.meta.env.VITE_APP_MOVIE_API_V4}/lists/`, {
      params: {
        ...params,
      },
    });
  },
  show(id, params) {
    return axios
      .create({
        headers: {
          Authorization:
            "Bearer " + import.meta.env.VITE_APP_MOVIE_ACCESS_TOKEN,
        },
      })
      .get(import.meta.env.VITE_APP_MOVIE_API_V4 + `/list/${id}`, {
        params: {
          ...params,
        },
      });
  },
  update(id, body) {
    return axios
      .create({
        headers: {
          Authorization:
            "Bearer " + import.meta.env.VITE_APP_MOVIE_ACCESS_TOKEN,
        },
      })
      .put(import.meta.env.VITE_APP_MOVIE_API_V4 + `/list/${id}`, body);
  },
  create(listName) {
    const json = {
      name: listName,
      iso_639_1: "en",
      public: false,
    };
    return axios
      .create({
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + import.meta.env.VITE_APP_MOVIE_ACCESS_TOKEN,
        },
      })
      .post(import.meta.env.VITE_APP_MOVIE_API_V4 + `/list`, json);
  },
  delete(id) {
    return axios
      .create({
        headers: {
          Authorization:
            "Bearer " + import.meta.env.VITE_APP_MOVIE_ACCESS_TOKEN,
        },
      })
      .delete(import.meta.env.VITE_APP_MOVIE_API_V4 + `/list/${id}`, {});
  },

  // List Item CRUD
  addItems(params) {
    return axios
      .create({
        headers: {
          Authorization:
            "Bearer " + import.meta.env.VITE_APP_MOVIE_ACCESS_TOKEN,
        },
      })
      .post(
        import.meta.env.VITE_APP_MOVIE_API_V4 + `/list/${params.list_id}/items`,
        params
      );
  },
  removeItems(list_id, items) {
    let data = {
      items: items,
    };

    return axios
      .create({
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization:
            "Bearer " + import.meta.env.VITE_APP_MOVIE_ACCESS_TOKEN,
        },
      })
      .delete(
        import.meta.env.VITE_APP_MOVIE_API_V4 + `/list/${list_id}/items`,
        { data }
      );
  },
  showListStatus(id, params) {
    return axios
      .create({
        headers: {
          Authorization:
            "Bearer " + import.meta.env.VITE_APP_MOVIE_ACCESS_TOKEN,
        },
      })
      .get(import.meta.env.VITE_APP_MOVIE_API_V3 + `/list/${id}/item_status`, {
        params: {
          ...params,
          api_key: import.meta.env.VITE_APP_MOVIE_API_KEY_V3,
        },
      });
  },
};
