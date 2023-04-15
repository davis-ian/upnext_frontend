<template>
  <div>
    <p>create list</p>
    <v-text-field v-model="listName" label="Name"></v-text-field>
    <v-btn @click="createList">Submit</v-btn>
  </div>
</template>
<script>
import ListAPI from "@/api/tmdb";
import UpnextAPI from "@/api/upnext";
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
        return;
      }
      if (!this.userId > 0) {
        return;
      }

      console.log(resp, "list made");
      UpnextAPI.createList({
        name: this.listName,
        userId: this.userId,
      });
    },
    getUserLists(id) {
      console.log(id, "getting list for id");
      UpnextAPI.getListsForUser(id)
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
