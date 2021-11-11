<template>
  <div>
    <v-tooltip top color="grey darken-4">
        <template v-slot:activator="{on}">
            <p v-on="on">{{text}}</p>
        </template>
        <span>{{text}}</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: "Tooltip",
  data() {
    return {
    };
  },
  props:{
      text: {
          type: String,
          required: true
      }
  },
  watch: {
  },
  methods: {
  }
};
</script>

<style>
</style>

