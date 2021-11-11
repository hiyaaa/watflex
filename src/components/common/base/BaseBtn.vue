<template>
  <v-btn v-bind="$attrs" v-on="$listeners" depressed :color="color">
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  name: "BaseBtn",

  props: {
    color: {
      type: String,
      default: "#ebebeb"
    }
  },

  computed: {}
};
</script>
<style></style>
