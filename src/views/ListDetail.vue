<template>
  <div class="pa-3">
    <!-- <span>id - {{ $route.params }}</span> -->
    <div v-if="list">
      <h1>{{ list.name }}</h1>

      <div>
        <v-row>
          <v-col cols="3" v-for="(result, index) in list.results">
            <!-- <span>{{ result.title }}</span> -->
            <div>
              <v-hover>
                <template v-slot:default="{ isHovering, props }">
                  <div class="img-wrap" v-bind="props">
                    <v-img
                      @click="goToDetails(result)"
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
                      <v-btn
                        color="red"
                        @click.stop="deleteStep1(result)"
                        class="delete-btn"
                        density="compact"
                        icon
                      >
                        <font-awesome-icon :icon="['fas', 'x']" />
                      </v-btn>
                    </v-img>
                  </div>
                </template>
              </v-hover>
            </div>
          </v-col>
        </v-row>
      </div>
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
    </div>
  </div>
</template>
<script>
import UserListAPI from "@/api/lists";
import ListAPI from "@/api/tmdb-lists";
export default {
  data() {
    return {
      message: "hi",
      list: null,
      selectedItem: null,
      deleteConfirmModal: false,
    };
  },
  methods: {
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
  },
};
</script>
<style lang="scss" scoped>
.img-wrap {
  transition: 0.3s;
  // border: 2px solid red;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  .img {
    border-radius: 10px;
    cursor: pointer;
  }
}
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
