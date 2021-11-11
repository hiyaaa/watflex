<template>
  <v-menu offset-y v-model="menuVal">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" depressed v-bind="$attrs">
        {{ selectVal ? convert(selectVal) : label }}
        <v-spacer />
        <v-icon v-show="!menuVal">mdi-menu-down</v-icon>
        <v-icon v-show="menuVal">mdi-menu-up</v-icon>
      </v-btn>
    </template>
    <v-list dense>
      <v-list-item v-for="(item, index) in items" :key="index" @click="$emit('clickList', item.value)">
        <v-list-item-content>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "BaseCustomSelect",
  data: () => ({
    menuVal: false
  }),

  props: {
    selectVal: {
      type: String
    },
    items: {
      type: Array
    },
    label: {
      type: String,
      default: "select"
    }
  },

  computed: {},

  methods: {
    convert(val) {
      const rst = this.items.find(item => {
        return item.value == val;
      });
      return rst.text;
    }
  }
};
</script>
