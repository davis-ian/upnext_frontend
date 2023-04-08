<template>
  <div>
    <v-avatar :size="size + 5" color="black">
      <v-progress-circular
        bg-color="#424242"
        :size="size"
        :model-value="score"
        :color="getProgressColor(Math.floor(score))"
      >
        {{ Math.floor(score) }}
      </v-progress-circular>
    </v-avatar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: "hi",
    };
  },
  props: {
    score: {
      type: Number,
      required: false,
    },
    size: {
      type: Number,
      default: 40,
    },
  },
  methods: {
    getProgressColor(val) {
      if (val > 70) {
        return "#01c6ac";
      } else if (val > 50) {
        return "#FFDE03";
      } else {
        return "#b00020";
      }
    },
  },
};
</script>
<style lang=""></style>
