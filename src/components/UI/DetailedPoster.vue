<template>
  <div>
    <v-hover>
      <template v-slot:default="{ isHovering, props }">
        <div class="img-wrap" v-bind="props">
          <v-img
            @load="imageLoaded = true"
            class="img"
            max-height="100%"
            :src="src"
            :lazy-src="src"
            cover
          >
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular
                  color="grey-lighten-4"
                  indeterminate
                ></v-progress-circular>
              </div>
            </template>
          </v-img>
          <div class="overlay"></div>
          <!-- <score-circle v-if="imageLoaded" :score="score" class="score" /> -->
          <poster-rating v-if="imageLoaded" :score="score" class="score" />
        </div>
      </template>
    </v-hover>
  </div>
</template>
<script>
import ScoreCircle from "@/components/UI/ScoreCircle.vue";
import PosterRating from "@/components/UI/PosterRating.vue";
export default {
  data() {
    return {
      imageLoaded: false,
    };
  },
  props: {
    src: {
      type: String,
    },
    score: {
      type: Number,
    },
  },
  components: {
    ScoreCircle,
    PosterRating,
  },
};
</script>
<style lang="scss">
.img-wrap {
  position: relative;
  transition: 0.3s;
  // border: 2px solid red;
  border-radius: 10px;
  .img {
    border-radius: 10px;
    cursor: pointer;
  }
}
.score {
  position: absolute;
  bottom: 0px;
  right: opx;
}
.overlay {
  //   border: 2px solid red;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 20%;
  border-radius: 0 0 10px 10px;
  background: linear-gradient(hsl(0 0% 0% / 0), hsl(0 0% 0% / 1));
}
.img-wrap:hover {
  transition: 0.3s;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  transform: scale(1.02);
}
</style>
