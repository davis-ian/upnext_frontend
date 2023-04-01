<template>
  <div>
    List Details

    <span>id - {{ $route.params }}</span>
    <div v-if="list">
      <h2>{{ list.name }}</h2>
      <div v-for="(result, index) in list.results">
        <div style="display: flex; justify-content: space-between">
          <span>{{ result.title }}</span>
          <div>
            <v-btn
              @click="removeListItem(result)"
              color="red"
              density="compact"
              icon="mdi-vuetify"
            ></v-btn>
          </div>
        </div>
        <v-divider v-if="index != list.results.length - 1"></v-divider>
      </div>
    </div>
  </div>
</template>
<script>
import UserListAPI from "@/api/lists";
import ListAPI from "@/api/tmdb-lists";
import axios from "axios";
export default {
  data() {
    return {
      message: "hi",
      list: null,
    };
  },
  methods: {
    getDetails() {
      UserListAPI.show(this.$route.params.id)
        .then((resp) => {
          console.log(resp, "resp");
          this.list = resp.data;
        })
        .catch((error) => {
          console.log(error, "error");
        });
    },
    removeListItem(item) {
      let items = [{ media_type: item.media_type, media_id: item.id }];
      ListAPI.removeItems(this.list.id, items)
        .then((resp) => {
          console.log(resp, "resp");
          this.getDetails();
        })
        .catch((error) => {
          console.log(error, "error");
        });
    },
  },
  mounted() {
    console.log("detail mount");
    this.getDetails();
  },
};
</script>
<style lang=""></style>
