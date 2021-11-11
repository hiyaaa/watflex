<template>
  <v-toolbar flat min-width="330">
    <v-toolbar-title style="font-size: 1rem; overflow: visible;"> {{ title }} </v-toolbar-title>
    <v-divider class="mx-4" inset vertical v-if="title"></v-divider>
    <span> {{ subTitle }}</span>
    <v-row no-gutters>
      <slot />
    </v-row>
  </v-toolbar>
</template>

<script>
export default {
  name: "BaseSubTitle",

  props: {
    title: {
      type: String
    },
    subTitle: {
      type: String
    }
  },

  computed: {}
};
</script>
