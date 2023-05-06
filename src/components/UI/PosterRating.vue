<template>
  <div style="width: 100%">
    <div style="display: flex; align-items: center">
      <!-- <span style="color: white">{{ score }}</span> -->
      <!-- <font-awesome-icon
        v-for="full in Math.floor(score)"
        icon="fa-solid fa-star"
        style="color: #ffde03; font-size: 1.2rem"
      ></font-awesome-icon>
      <font-awesome-icon
        v-if="score % 2 > 0.4"
        icon="fa-solid fa-star-half"
        style="color: #ffde03; font-size: 1.2rem"
      ></font-awesome-icon> -->
      <!-- <v-progress-linear
        :color="getProgressColor(score * 10)"
        :model-value="score * 10"
      ></v-progress-linear> -->

      <!-- <span style="color: white">{{ Math.floor(score * 10) }}%</span> -->
      <font-awesome-icon
        class="mr-1"
        icon="fa-solid fa-star"
        style="font-size: 0.8rem"
        :style="{ color: getProgressColor(score * 10) }"
      ></font-awesome-icon>
      <span>
        <span>{{ Math.round(score * 10) / 10 }}</span>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: "hi",
      fullStars: 0,
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
        return "#FFDE03";
      } else if (val > 50) {
        return "#01c6ac";
      } else {
        return "#b00020";
      }
    },
  },
};
</script>
<style lang="scss"></style>
