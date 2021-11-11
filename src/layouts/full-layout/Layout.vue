<template>
  <v-app id="inspire">
    <Header></Header>
    <v-main>
      <BreadCrumbs style="position: absolute;"></BreadCrumbs>
      <router-view class="mt-5" />
      <v-btn v-if="false" bottom color="success" dark fab fixed right @click.stop="Customizer_drawer = !Customizer_drawer">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-main>
    <SimpleAlert></SimpleAlert>
    <Customizer></Customizer>
  </v-app>
</template>

<script>
import { sync } from "vuex-pathify";
import Header from "./header/Header";
import Customizer from "./customizer/Customizer";
export default {
  name: "Layout",

  components: {
    Header,
    Customizer,
    BreadCrumbs: () => import("@/components/common/BreadCrumbs")
  },

  props: {
    source: String
  },
  data: () => ({
    expandOnHover: false
  }),
  computed: {
    Customizer_drawer: sync("app/Customizer_drawer")
  },

  methods: {}
};
</script>

<style></style>
