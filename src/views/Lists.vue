<template>
  <div>
    <h2 class="pa-3">Lists</h2>
    <user-lists />
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
};
</script>
<style lang=""></style>
