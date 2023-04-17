<template>
  <div>
    <!-- <div v-if="!isLoading && this.lists.length == 0">
      <v-btn @click="getUserLists()">Check Lists</v-btn>
    </div> -->

    <!-- :class="handleInList(list) ? 'inactive' : 'active'" -->
    <v-list class="transparent" nav>
      <v-list-item
        class="mb-2"
        style="border: 1px solid #e5e5e5; color: white; border-radius: 40px"
        @click="handleRowClick(list)"
        v-for="(list, index) in lists"
        :key="index"
        :value="list"
      >
        <!-- {{ list }} -->
        <div class="px-4" style="display: flex; justify-content: space-between">
          {{ list.props.name }}
          <!-- {{ handleInList(list) }} -->
          <span v-if="showListStatus">
            <font-awesome-icon
              :icon="list.in_list ? 'fa-solid fa-minus' : 'fa-solid fa-plus'"
            ></font-awesome-icon>
          </span>
        </div>
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
import ListAPI from "@/api/tmdb";
import UpnextAPI from "@/api/upnext";
export default {
  data() {
    return {
      user: this.$auth0.user,
      isAuthenticated: this.$auth0.isAuthenticated,
      isLoading: this.$auth0.isLoading,
      lists: [],
      statuses: [],
      upcomingList: [],
      watchedList: [],
      showListStatus: false,
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
    hiddenLists: {
      type: Array,
      required: false,
    },
  },
  methods: {
    handleInList(list) {
      if (this.showListStatus) {
        if (list.in_list) {
          return true;
        }
      }
      return false;
    },
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
    async getUserLists() {
      try {
        this.$emit("loadstart");
        const { data } = await UpnextAPI.getListsForUser(this.userId);
        this.lists = data;

        console.log(this.lists, "lists");
        if (this.hiddenLists) {
          let found = this.lists.find(
            (x) =>
              (this.lists = this.lists.filter(
                (item) => !this.hiddenLists.includes(item.props.tmdbId)
              ))
          );
        }
        // this.checkStatusAllLists(this.lists);
      } catch (err) {
        console.log(err, "error");
      } finally {
        this.$emit("loadend");
      }
    },
    deleteList(id, key) {
      UpnextAPI.deleteList(id, key)
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
        return;
      }
      UpnextAPI.createList(name, userId)
        .then((resp) => {
          this.creatingList = false;
          this.getUserLists();
        })
        .catch((error) => {
          console.log(error, "error");
        });
    },
    checkStatusAllLists(arr) {
      let promises = [];
      for (let i = 0; i < arr.length; i++) {
        promises.push(
          ListAPI.showListStatus(arr[i].props.tmdbId, {
            media_id: this.$route.params.id,
            media_type: "movie",
          }).then((response) => {
            this.lists[i] = {
              ...this.lists[i],
              in_list: response.data.item_present,
            };
          })
        );
      }
      Promise.all(promises).then(() => {
        this.showListStatus = true;
      });
    },
  },
  async mounted() {
    await this.getUserLists();
    this.checkStatusAllLists(this.lists);
    if (this.$route.params.id) {
      console.log(this.$route.params.id, "media id");
    }
    console.log(this.lists, "after status");
  },
};
</script>
<style lang="scss" scoped>
.transparent {
  background-color: transparent;
}
.active {
  color: #00c853;
  border: 1px solid #00c853 !important;
}
.inactive {
  color: #ff5252;
  border: 1px solid #ff5252 !important;
}
.delete-btn {
  opacity: 0.4;
}
.delete-btn:hover {
  opacity: 1;
}
</style>
