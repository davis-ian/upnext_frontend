<template>
  <div class="pa-3">
    <div v-if="list">
      <v-row>
        <v-col cols="12">
          <div style="display: flex; justify-content: space-between">
            <h1>{{ list.name }}</h1>

            <v-menu v-if="canDeleteList">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props">...</v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in menuItems"
                  :key="index"
                  @click="handleMenuClick(index)"
                >
                  <template v-slot:prepend>
                    <div style="width: 2rem">
                      <font-awesome-icon :icon="item.icon"></font-awesome-icon>
                    </div>
                  </template>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          @click="goToDetails(result)"
          class="pa-1"
          cols="4"
          sm="4"
          md="3"
          v-for="(result, index) in list.results"
        >
          <div>
            <v-row>
              <v-col>
                <div style="position: relative">
                  <v-img
                    class="img"
                    max-height="100%"
                    :src="
                      'https://image.tmdb.org/t/p/original/' +
                      (result.poster_path || '')
                    "
                    :lazy-src="
                      'https://image.tmdb.org/t/p/original/' +
                      (result.poster_path || '')
                    "
                  >
                    <template v-slot:placeholder>
                      <div
                        class="d-flex align-center justify-center fill-height"
                      >
                        <v-progress-circular
                          color="grey-lighten-4"
                          indeterminate
                        ></v-progress-circular>
                      </div>
                    </template>
                    <!-- <v-btn
                      color="red"
                      @click.stop="deleteStep1(result)"
                      class="delete-btn"
                      density="compact"
                      icon
                    >
                      <font-awesome-icon :icon="['fas', 'x']" />
                    </v-btn> -->
                  </v-img>
                </div>
              </v-col>
              <!-- <v-col>
                  <h4>{{ result.title }}</h4>
                  <p>
                    {{ new Date(result.release_date).toLocaleDateString() }}
                  </p>
                  <score-circle
                    :score="result.vote_average * 10"
                  ></score-circle>
                </v-col> -->
            </v-row>
          </div>
        </v-col>
      </v-row>

      <v-dialog max-width="500px" v-model="deleteConfirmModal">
        <v-card v-if="selectedItem">
          <v-card-item>
            <v-card-title>Delete</v-card-title>
          </v-card-item>
          <v-card-text
            >Are you sure you want to delete
            <strong>{{ selectedItem.title }}</strong> from
            <strong>{{ list.name }}</strong
            >?</v-card-text
          >
          <v-card-actions class="px-4">
            <v-btn @click="cancelDelete">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn
              @click="removeListItem(selectedItem)"
              variant="outlined"
              color="red"
              >Confirm</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog max-width="500px" v-model="listDeleteConfirmationModal">
        <v-card>
          <v-card-item>
            <v-card-title>Delete List</v-card-title>
          </v-card-item>
          <v-card-text
            >Are you sure you want to delete <strong>{{ list.name }}</strong
            >? This cannot be undone.</v-card-text
          >
          <v-card-actions class="px-4">
            <v-btn @click="listDeleteConfirmationModal = false">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn
              @click="deleteList(list.id, $route.params.id)"
              variant="outlined"
              color="red"
              >Confirm</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
<script>
import UpnextAPI from "@/api/upnext";
import ListAPI from "@/api/tmdb";
import ScoreCircle from "@/components/UI/ScoreCircle.vue";
export default {
  data() {
    return {
      message: "hi",
      list: null,
      selectedItem: null,
      deleteConfirmModal: false,
      listDeleteConfirmationModal: false,
      menuItems: [{ title: "Delete", icon: "fa-solid fa-trash" }],
      userId: this.$auth0.user.value["https://nextup.com/userId"],
      userDetails: null,
    };
  },
  components: { ScoreCircle },
  computed: {
    canDeleteList() {
      return (
        this.$route.params.id != this.userDetails.props.watchedList &&
        this.$route.params.id != this.userDetails.props.upcomingList
      );
    },
  },
  methods: {
    handleMenuClick(val) {
      switch (val) {
        case 0:
          this.listDeleteStep1();
          break;
      }
    },
    // getProgressColor(val) {
    //   if (val > 70) {
    //     return "#01c6ac";
    //   } else if (val > 50) {
    //     return "#FFDE03";
    //   } else {
    //     return "#b00020";
    //   }
    // },
    getUser() {
      UpnextAPI.getUser(this.userId).then((resp) => {
        console.log(resp, "GOT USER");
        this.userDetails = resp.data;
      });
    },
    listDeleteStep1() {
      console.log("deleting", this.list);
      this.listDeleteConfirmationModal = true;
    },
    deleteList(id, key) {
      console.log(id);
      console.log(key);
      UpnextAPI.deleteList(id, key)
        .then((resp) => {
          console.log("deleted");
          this.$router.push("/lists");
        })
        .catch((error) => {
          console.log(error, "error");
        });
    },
    goToDetails(item) {
      if (item.hasOwnProperty("first_air_date")) {
        console.log("this is a tv show");
        this.$router.push("/tv/" + item.id);
      } else {
        this.$router.push("/movie/" + item.id);
      }
    },
    cancelDelete() {
      this.deleteConfirmModal = false;
      this.selectedItem = null;
    },
    deleteStep1(item) {
      this.selectedItem = item;
      console.log(this.selectedItem);
      this.deleteConfirmModal = true;
    },
    getDetails() {
      UpnextAPI.getList(this.$route.params.id)
        .then((resp) => {
          // console.log(resp, "resp");
          // this.list = resp.data;
          ListAPI.show(resp.data.props.tmdbId, {
            sort_by: "original_order.desc",
          }).then((tList) => {
            console.log(tList, "tList");
            this.list = tList.data;
          });
        })
        .catch((error) => {
          console.log(error, "error");
        });
    },
    // getDetails() {
    //   ListAPI.show()
    // }
    removeListItem(item) {
      let items = [{ media_type: item.media_type, media_id: item.id }];
      ListAPI.removeItems(this.list.id, items)
        .then((resp) => {
          console.log(resp, "resp");
          this.getDetails();
          this.deleteConfirmModal = false;
          this.selectedItem = null;
        })
        .catch((error) => {
          console.log(error, "error");
        });
    },
  },
  mounted() {
    console.log("detail mount");
    this.getDetails();
    this.getUser();
  },
};
</script>
<style lang="scss" scoped>
// .img-wrap {
//   transition: 0.3s;
//   // border: 2px solid red;
//   border-radius: 10px;
//   box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
//   .img {
//     border-radius: 10px;
//     cursor: pointer;
//   }
// }

.delete-btn {
  opacity: 0;
  position: absolute;
  right: 0;
  margin: 10px;
}
.img-wrap:hover .delete-btn {
  opacity: 0.4;
}

.delete-btn:hover {
  opacity: 1 !important;
}
</style>
