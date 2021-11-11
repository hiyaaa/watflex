<template>
  <span style="position:absolute; top:10px; right:10px;">
    <base-btn fab x-small class="ml-5" depressed @click="refresh(false)"><v-icon>mdi-refresh</v-icon></base-btn>
    <!-- <base-btn fab x-small class="ml-1" depressed @click="refresh(true)"><v-icon>mdi-download</v-icon></base-btn> -->
  </span>
</template>
<script>
export default {
  name: "ComponentBtn",
  data: () => {
    return {};
  },
  props: {
    refresh: {
      type: Function
    },
    save: {
      type: Function
    }
  }
};
</script>
