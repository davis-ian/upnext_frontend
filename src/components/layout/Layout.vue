<template>
  <div class="layout-wrap">
    <Header />
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
};
</script>
<style lang="scss" scoped></style>
