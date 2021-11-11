<template>
  <div id="simpleAlert">
    <v-snackbar
      top
      :value="this.$root.alertStore.show"
      :timeout="this.$root.alertStore.timeout"
      :color="this.$root.alertStore.color"
      @input="change"
    >
      <pre class="float-left pt-2">{{this.$root.alertStore.message}}</pre>
      <v-btn class="float-right ml-2" dark outlined @click="change(false)" v-if="this.$root.alertStore.button">Close</v-btn>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  name: "SimpleAlert",
  data() {
    return {};
  },
  methods: {
    change(v) {
      this.$root.alertStore.show = v;
    }
  }
};
</script>
<style>
</style>