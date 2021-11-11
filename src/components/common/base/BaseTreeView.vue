<template>
  <v-treeview :items="items"></v-treeview>
</template>

<script>
export default {
  name: "BaseTreeView",

  props: {
    items: {
      type: Array
    }
  },

  computed: {}
};
</script>
