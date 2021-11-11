<template>
  <div>
    <v-app-bar dense color="white">
      <BreadCrumbs></BreadCrumbs>
      <v-spacer></v-spacer>
      <v-col class="d-flex justify-end align-center" cols="3">
        <base-custom-select
          label="System"
          :selectVal="systemVal"
          :items="systemList"
          width="150"
          @clickList="selectSystem"
        ></base-custom-select>
        <v-btn icon><v-icon>mdi-message</v-icon></v-btn>
        <v-btn icon><v-icon>mdi-bell</v-icon></v-btn>
      </v-col>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      systemVal: null
    };
  },
  computed: {
    systemList() {
      const rst = [
        {
          text: "lms",
          value: "lms"
        },
        {
          text: "watflex",
          value: "watflex"
        }
      ];
      return rst;
    }
  },
  methods: {
    selectSystem(item) {
      this.systemVal = item;
    }
  },
  components: {
    BreadCrumbs: () => import("@/components/common/BreadCrumbs")
  }
};
</script>

<style></style>
