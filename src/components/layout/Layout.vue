<template>
  <div class="layout-wrap">
    <!-- <Header class="header" ref="header" /> -->
    <div class="layout-content">
      <div class="top-nav">
        <h2 @click="$router.push('/')">UpNext</h2>
      </div>
      <slot class="main-content" />
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
}
.layout-content {
  height: 100vh;
  padding-bottom: 84px;
  overflow: auto;
  .main-content {
    height: 100vh;
  }
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
  height: 84px;
  position: sticky;
  bottom: 0;
  margin: auto;
  z-index: 9;
  width: 100%;
}
</style>
