<template>
  <div :style="{ width: width }">
    <v-text-field v-bind="$attrs" v-on="$listeners" hide-details dense single-line></v-text-field>
  </div>
</template>

<script>
export default {
  name: "BaseTextField",

  props: {
    width: {
      type: String,
      default: "200px"
    }
  },

  computed: {}
};
</script>
