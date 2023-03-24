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

      <!-- <v-btn color="red" @click="toggleListPrivacy">Toggle</v-btn> -->
    </div>

    <div style="border: 2px solid">
      <h3>Lists</h3>
      <v-btn href="/list/create">Create +</v-btn>
      <v-btn @click="getUserLists(userId)">Get Lists</v-btn>
    </div>
    <h4>Your Lists</h4>
    <v-list nav>
      <v-list-item
        elevation="2"
        v-for="(list, index) in lists"
        :key="index"
        :value="list"
        active-color="primary"
        >{{ list.props.name }}</v-list-item
      >
    </v-list>
  </div>
</template>
<script>
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
    };
  },
  methods: {
    login() {
      console.log("logging in");
      this.$auth0.loginWithRedirect();
    },
    logout() {
      this.$auth0.logout({
        // returnTo: window.location.origin,
        returnTo: "/",
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
  },
  mounted() {
    console.log("profile mounted");
    console.log(this.$auth0.user);
  },
};
</script>
<style lang=""></style>
