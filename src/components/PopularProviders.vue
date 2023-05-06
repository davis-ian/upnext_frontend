<template>
  <div style="display: flex; flex-wrap: wrap; gap: 5px">
    <v-chip
      v-for="(provider, index) in popularProviders"
      :key="index"
      :color="isSelected(provider) ? '#23d9a5' : ''"
      :selected="isSelected(provider)"
      @click="toggleSelection(provider)"
    >
      {{ provider.name }}
    </v-chip>
  </div>
</template>
<script>
import { ref, watch, getCurrentInstance } from "vue";
export default {
  data() {
    return {
      selectedProviders: [],
    };
  },
  props: {
    popularProviders: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const selectedProviders = ref([]);

    const isSelected = (provider) => {
      return selectedProviders.value.includes(provider);
    };

    const toggleSelection = (provider) => {
      const index = selectedProviders.value.indexOf(provider);
      if (index === -1) {
        selectedProviders.value.push(provider);
      } else {
        console.log(index, "index");
        selectedProviders.value.splice(index, 1);
      }
      console.log(selectedProviders, "selected in component");
    };

    const instance = getCurrentInstance();

    watch(selectedProviders.value, (newVal, oldVal) => {
      console.log("selection watch");
      instance.emit("selection-changed", newVal);
    });

    return {
      selectedProviders,
      isSelected,
      toggleSelection,
    };
  },
};
</script>
<style lang="scss"></style>
