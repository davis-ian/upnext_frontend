import axios from "axios";
import tmdbApi from "./tmdb";

export default {
  // returns all lists for a user
  getListsForUser(id) {
    return axios.get(import.meta.env.VITE_APP_API + `/lists/by-user/` + id);
  },

  // returns list by id
  async getList(id, params) {
    return axios
      .get(import.meta.env.VITE_APP_API + `/lists/` + id)
      .then((resp) => {
        return resp;
      });
  },

  updateList(id, body) {},

  // creates tmbd list and then creates instance in db
  async create(listName, userId) {
    return tmdbApi
      .create(listName)
      .then((resp) => {
        return axios.post(import.meta.env.VITE_APP_API + `/lists`, {
          name: listName,
          userId: userId,
          tmdbId: resp.data.id,
        });
      })
      .catch((error) => {
        return error;
      });
  },

  // deletes tmbd list and then deletes instance in db
  async deleteList(id, key) {
    return tmdbApi
      .delete(id)
      .then((resp) => {
        return axios.delete(import.meta.env.VITE_APP_API + `/lists/${key}`);
      })
      .catch((error) => {
        return error;
      });
  },

  // returns user by id
  async getUser(id, params) {
    return axios
      .get(import.meta.env.VITE_APP_API + `/users/` + id)
      .then((resp) => {
        return resp;
      });
  },
};
