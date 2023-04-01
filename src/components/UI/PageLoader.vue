<template>
  <v-overlay
    style="display: flex; justify-content: center; align-items: center"
    v-model="loading"
  >
    <v-progress-circular
      size="100"
      indeterminate
      color="#23d9a5"
    ></v-progress-circular>
  </v-overlay>
</template>
<script>
export default {
  data() {
    return {
      loading: true,
    };
  },
};
</script>
<style lang=""></style>
