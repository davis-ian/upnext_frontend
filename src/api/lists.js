import axios from "axios";
import ListAPI from "@/api/tmdb-lists";

export default {
  index(id) {
    return axios.get(import.meta.env.VITE_APP_API + `/lists/by-user/` + id);
  },
  async show(id, params) {
    return axios
      .get(import.meta.env.VITE_APP_API + `/lists/` + id)
      .then((resp) => {
        return ListAPI.show(resp.data.props.tmdbId);
      });
  },
  update(id, body) {},
  // creates tmbd list and then creates instance in db
  async create(listName, userId) {
    return ListAPI.create(listName)
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
  async delete(id, key) {
    return ListAPI.delete(id)
      .then((resp) => {
        return axios.delete(import.meta.env.VITE_APP_API + `/lists/${key}`);
      })
      .catch((error) => {
        return error;
      });
  },
};
