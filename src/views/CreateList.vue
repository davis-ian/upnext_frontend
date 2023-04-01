<template>
  <div>
    <p>create list</p>
    <v-text-field v-model="listName" label="Name"></v-text-field>
    <v-btn @click="createList">Submit</v-btn>
  </div>
</template>
<script>
import ListAPI from "@/api/tmdb-lists";
import UserListAPI from "@/api/lists";
export default {
  data() {
    return {
      listName: "",
      userId: this.$auth0.user.value["https://nextup.com/userId"],
      lists: [],
    };
  },
  methods: {
    createList(name) {
      if (this.listName.length == 0) {
        console.log("name required");
        return;
      }
      if (!this.userId > 0) {
        console.log("no user id");
        console.log(this.userId);
        console.log(this.$auth0);
        return;
      }
      ListAPI.create(this.listName)
        .then((resp) => {
          console.log(resp, "list made");
          UserListAPI.create({
            name: this.listName,
            userId: this.userId,
          });
        })
        .catch((err) => {
          console.log(err, "error");
        });
    },
    getUserLists(id) {
      console.log(id, "getting list for id");
      UserListAPI.index(id)
        .then((resp) => {
          console.log(resp, "user lists");
          this.lists = resp.data;
        })
        .catch((err) => {
          console.log(err, "error");
        });
    },
  },
};
</script>
<style lang=""></style>
