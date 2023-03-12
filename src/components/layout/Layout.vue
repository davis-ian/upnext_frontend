<template>
  <Header />
  <slot />
  <!-- <Footer /> -->
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
<style lang=""></style>
