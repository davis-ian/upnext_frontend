import axios from "axios";

export default {
  index(id) {
    return axios.get(import.meta.env.VITE_APP_API + `/lists/by-user/` + id);
  },
  show(id, params) {},
  update(id, body) {},
  create(params) {
    return axios.post(import.meta.env.VITE_APP_API + `/lists`, params);
  },
  delete(id) {},
};
