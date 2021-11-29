<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- Modal -->
  <!-- ----------------------------------------------------------------------------- -->

  <div class="text-center">
    <v-dialog v-model="dialog" persistent max-width="310">
      <v-card>
        <v-card-title class="headline">{{ title }}</v-card-title>
        <v-card-text>{{ msg }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="confirm(true)">Yes</v-btn>
          <v-btn color="success" text @click="confirm(false)">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "DialogsModal",

  data: () => ({}),
  props: {
    title: {
      type: String,
    },
    msg: {
      type: String,
    },
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    confirm(flag) {
        this.$emit('confirm', flag);
    },
  },
};
</script>