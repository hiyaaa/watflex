<template>
  <v-tabs v-bind="$attrs" v-on="$listeners" :key="renderCount">
    <slot></slot>
  </v-tabs>
</template>

<script>
import { sync } from "vuex-pathify";
export default {
  name: "BaseTabs",
  data() {
    return {
      renderCount: 0
    };
  },
  props: {},
  computed: { locale: sync("app/locale") },
  watch: {
    locale() {
      this.renderCount++;
    }
  }
};
</script>
<style></style>
