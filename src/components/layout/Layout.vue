<template>
  <div class="layout-wrap">
    <Header ref="header" />
    <v-btn
      rounded="xl"
      theme="dark"
      class="mobile-menu-toggle"
      @click="toggleMenu"
      ><font-awesome-icon
        style="color: white"
        icon="fa-solid fa-bars"
      ></font-awesome-icon
    ></v-btn>
    <slot />
    <!-- <Footer /> -->
  </div>
</template>
<script>
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";
export default {
  name: "Layout",
  components: {
    Header,
    Footer,
  },
  methods: {
    toggleMenu() {
      this.$refs.header.toggleDropDown();
    },
  },
};
</script>
<style lang="scss" scoped>
.mobile-menu-toggle {
  // border: 2px solid red;
  position: fixed;
  bottom: 10px;
  left: 0;
  right: 0;
  margin: auto;
  width: 50px;
  z-index: 1;
}
</style>
