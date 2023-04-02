<template>
  <div>
    <div
      class="pa-3"
      style="display: flex; justify-content: space-between; align-items: center"
    >
      <h2>Lists</h2>
      <v-btn @click="newList" icon>+</v-btn>
    </div>
    <user-lists ref="listComp" />
  </div>
</template>
<script>
import UserLists from "@/components/UserLists.vue";
export default {
  data() {
    return {
      message: "hi",
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
