<template>
  <div :style="{ width: width }">
    <v-select v-bind="$attrs" v-on="$listeners" hide-details dense>
      <slot v-for="(_, name) in $slots" :name="name" :slot="name" />
      <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>
    </v-select>
  </div>
</template>

<script>
export default {
  name: "BaseSelect",

  props: {
    width: {
      type: String,
      default: "100px"
    }
  },

  computed: {}
};
</script>
<style></style>
