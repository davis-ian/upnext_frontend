<template>
  <div>
    <div
      class="pa-3"
      style="display: flex; justify-content: space-between; align-items: center"
    >
      <h2>Lists</h2>
      <v-btn @click="newList" icon>+</v-btn>
    </div>
    <div v-if="loading">
      <v-progress-linear indeterminate></v-progress-linear>
      <p class="text-center pt-2">Gathering your lists</p>
    </div>
    <user-lists
      @loadstart="loading = true"
      @loadend="loading = false"
      ref="listComp"
    />
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
