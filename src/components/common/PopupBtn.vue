<template>
  <base-btn text v-bind="$attrs" v-on="$listeners" :color="items[type]">{{ type }}</base-btn>
</template>

<script>
export default {
  name: "PopupBtn",
  data: () => ({
    items: {
      save: "info",
      apply: "info",
      close: "error"
    }
  }),

  props: {
    type: {
      type: String,
      required: true
    }
  },

  computed: {},

  methods: {}
};
</script>
