<template>
  <div>
    <div class="pa-2">
      <div style="display: flex; justify-content: space-between">
        <v-btn @click="$router.back()" variant="tonal">
          <font-awesome-icon icon="fa-solid fa-arrow-left"></font-awesome-icon>
        </v-btn>
        <v-btn theme="dark" @click="newList">
          <font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon>
        </v-btn>
      </div>
      <div
        class="mt-2"
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <h2>Lists</h2>
      </div>
      <div v-if="loading">
        <v-progress-linear indeterminate></v-progress-linear>
        <p class="text-center pt-2">Gathering your lists</p>
      </div>
    </div>
    <div>
      <user-lists
        @loadstart="loading = true"
        @loadend="loading = false"
        ref="listComp"
      />
    </div>
  </div>
</template>
<script>
import UserLists from "@/components/UserLists.vue";
export default {
  data() {
    return {
      message: "hi",
      loading: true,
    };
  },
  components: {
    UserLists,
  },
  methods: {
    newList() {
      this.$refs.listComp.creatingList = true;
    },
  },
};
</script>
<style lang=""></style>
