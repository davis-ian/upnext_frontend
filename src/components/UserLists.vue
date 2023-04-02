<template>
  <div>
    <div v-if="!isLoading && this.lists.length == 0">
      <v-btn @click="getUserLists()">Check Lists</v-btn>
    </div>
    <v-list nav>
      <v-list-item
        class="mb-2"
        style="border: 1px solid #e5e5e5; border-radius: 40px"
        @click="handleRowClick(list)"
        v-for="(list, index) in lists"
        :key="index"
        :value="list"
        active-color="primary"
        >{{ list.props.name }}
        <!-- <template v-if="canDelete" v-slot:append>
          <v-btn
            @click.stop="deleteList(list.props.tmdbId, list.key)"
            variant="text"
            icon
            density="compact"
            class="delete-btn"
          >
            <font-awesome-icon icon="fa-solid fa-trash"></font-awesome-icon>
          </v-btn>
        </template> -->
      </v-list-item>
    </v-list>

    <v-dialog v-model="creatingList">
      <v-card class="pa-3">
        <v-text-field
          autofocus
          @keydown.enter="createList(listName, userId)"
          v-model="listName"
          label="Name"
        ></v-text-field>
        <v-btn @click="createList(listName, userId)">Submit</v-btn>
      </v-card>
    </v-dialog>
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
      creatingList: false,
      listName: "",
      userId: this.$auth0.user.value["https://nextup.com/userId"],
    };
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
    },
    getUserLists() {
      const id = this.user["https://nextup.com/userId"];
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
          this.getUserLists();
        })
        .catch((error) => {
          console.log(error, "error");
        });
    },
  },
  mounted() {
    this.getUserLists();
  },
};
</script>
<style lang="scss" scoped>
.delete-btn {
  opacity: 0.4;
}
.delete-btn:hover {
  opacity: 1;
}
</style>
