<template lang="">
  <div>
    <!-- {{ items }} -->
    <swiper
      :effect="'coverflow'"
      :grabCursor="true"
      :centeredSlides="true"
      :slidesPerView="'auto'"
      :coverflowEffect="{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }"
      :pagination="true"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="(item, index) in items" class="s-slide">
        <v-img
          @click="handleItemClick(item)"
          :src="handleImgSrc(item.poster_path, 500)"
          :lazy-src="handleImgSrc(item.poster_path, 500)"
        >
        </v-img>
        <p class="text-center">{{ item.title }}</p>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectCoverflow, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
export default {
  data() {
    return {
      modules: [EffectCoverflow, Pagination],
    };
  },
  components: { Swiper, SwiperSlide },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleItemClick(item) {
      this.$router.push("/media/movie/" + item.id);
    },
    handleImgSrc(ext, width = null) {
      if (ext) {
        if (width) {
          return (
            `https://ik.imagekit.io/upnext/tr:w-${width}/https://image.tmdb.org/t/p/original/` +
            (ext || "")
          );
        } else
          return (
            `https://ik.imagekit.io/upnext/https://image.tmdb.org/t/p/original/` +
            (ext || "")
          );
      }
      return null;
    },
  },
};
</script>
<style lang="scss" scoped>
// .s-slide {
//   border: 1px solid;
// }
.swiper {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 300px;
  height: 300px;
}

.swiper-slide img {
  display: block;
  width: 100%;
}
</style>
