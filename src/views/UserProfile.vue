<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <h2>User Profile</h2>
      <v-btn v-if="!isAuthenticated" @click="login">Log in</v-btn>
      <v-btn v-if="isAuthenticated" @click="logout">Log out</v-btn>
      <pre v-if="isAuthenticated">
            <code>{{ user }}</code>
        </pre>
    </div>

    <h4>Your Lists</h4>
    <v-btn @click="creatingList = true">Create +</v-btn>
    <user-lists :canDelete="true" ref="lists" />

    <v-dialog v-model="creatingList">
      <v-card>
        <v-text-field v-model="listName" label="Name"></v-text-field>
        <v-btn @click="createList(listName, userId)">Submit</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import UserLists from "@/components/UserLists.vue";
import ListAPI from "@/api/tmdb-lists";
import UserListAPI from "@/api/lists";
export default {
  data() {
    return {
      user: this.$auth0.user,
      isAuthenticated: this.$auth0.isAuthenticated,
      isLoading: this.$auth0.isLoading,
      lists: [],
      userId: this.$auth0.user.value["https://nextup.com/userId"],
      creatingList: false,
      listName: "",
    };
  },
  components: { UserLists },
  methods: {
    login() {
      this.$auth0.loginWithRedirect();
    },
    logout() {
      this.$auth0.logout({
        returnTo: "/",
      });
    },
    toggleListPrivacy() {
      console.log(this.list.public);
      ListAPI.update(8245289, {
        public: !this.list.public,
      })
        .then((resp) => {
          console.log(resp, "list update success");
        })
        .catch((err) => {
          console.log(err, "list update error");
        });
    },
    createList(name, userId) {
      if (name.length == 0) {
        console.log("name required");
        return;
      }
      if (!userId > 0) {
        console.log("no user id");
        console.log(userId);
        console.log(this.$auth0.user.value["https://nextup.com/userId"]);
        return;
      }
      UserListAPI.create(name, userId)
        .then((resp) => {
          this.creatingList = false;
          this.$refs.lists.getUserLists(userId);
        })
        .catch((error) => {
          console.log(error, "error");
        });
    },
  },
};
</script>
<style lang=""></style>
