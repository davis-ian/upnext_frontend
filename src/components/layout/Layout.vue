<template>
  <div class="layout-wrap">
    <!-- <Header class="header" ref="header" /> -->
    <div class="layout-content">
      <!-- <div class="top-nav">
        <h2 @click="$router.push('/')">UpNext</h2>
      </div> -->
      <slot class="main-content"> </slot>
    </div>
    <div class="bottom-nav">
      <HeaderV2 />
    </div>

    <!-- <Footer /> -->
  </div>
</template>
<script>
import Header from "@/components/layout/Header.vue";
import HeaderV2 from "@/components/layout/HeaderV2.vue";
import Footer from "@/components/layout/Footer.vue";
export default {
  data() {
    return {
      value: 1,
      drawer: false,
    };
  },
  name: "Layout",
  components: {
    Header,
    HeaderV2,
    Footer,
  },
};
</script>
<style lang="scss" scoped>
// TODO: set up layout for desktop, only working mobile right now
.layout-wrap {
  height: 100%;
  width: 100%;
  background-color: var(--dark-1);
  color: var(--light-1);
}
.layout-content {
  overflow-x: hidden;
  padding-bottom: 100px;
}
.main-content {
  height: 100%;
}

.top-nav {
  position: sticky;
  top: 0;
  z-index: 5;
  background-color: black;
  color: white;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bottom-nav {
  // height: 84px;
  // position: sticky;
  // position: absolute;
  // left: 0;
  // bottom: 0;
  // margin: auto;
  z-index: 9;
  width: 100%;
  color: var(--dark-1);
}

/* Media query for mobile devices */
@media (max-width: 767px) {
  .layout-wrap {
    max-width: 100%;
    overflow-x: hidden; /* Set to "hidden" to disable horizontal scrolling */
  }
}
</style>
