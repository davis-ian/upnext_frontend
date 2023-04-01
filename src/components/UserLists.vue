<template>
  <div>
    <v-list nav>
      <v-list-item
        @click="handleRowClick(list)"
        elevation="2"
        v-for="(list, index) in lists"
        :key="index"
        :value="list"
        active-color="primary"
        >{{ list.props.name }}
        <template v-if="canDelete" v-slot:append>
          <v-btn
            @click.stop="deleteList(list.props.tmdbId, list.key)"
            color="grey-lighten-1"
            icon="mdi-information"
            variant="text"
          ></v-btn>
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>
<script>
// import ListAPI from "@/api/tmdb-lists";
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
  watch: {
    userId() {
      this.getUserLists(this.userId);
    },
  },
  props: {
    canDelete: {
      type: Boolean,
      default: true,
    },
    customRowClick: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getListDetail(id) {
      this.$router.push(`/list/${id}`);
      //   console.log(id);
    },
    handleRowClick(item) {
      if (this.customRowClick) {
        this.$emit("row-click", item);
        console.log("custom");
      } else {
        this.getListDetail(item.key);
      }
      //   console.log("test");
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
    deleteList(id, key) {
      UserListAPI.delete(id, key)
        .then((resp) => {
          console.log("deleted");
          this.getUserLists(this.userId);
        })
        .catch((error) => {
          console.log(error, "error");
        });
    },
  },
  mounted() {
    this.getUserLists(this.userId);
  },
};
</script>
<style lang=""></style>
