<template>
  <div>
    <span style="position:absolute; right:20px;">
      watflex
    </span>
    <base-title title="watflex"></base-title>
    <v-row style="float:left; width:100%" no-gutters class="mt-3">
     aaaaaa
    </v-row>
  </div>
</template>
<script>
import { get } from "vuex-pathify";
import unitUtil from "@/utils/unitUtil";
export default {
  name: "ApCurrentStatus",
  data: () => {
    return {
      cardHeight: 200,
      apConnStatusValues: [],
      apRadioTypeValues: [],
      apRunTimeValues: [],
      pieOptions: {
        colors: ["#6fb5e3", "#ed6969"]
      },
      barLabeldOptions: {
        colors: ["#008ffb"]
      }
    };
  },
  watch: {
    zone() {
      this.refresh();
    },
    pageRefresh() {
      this.refresh();
    },
    dashboardRefresh() {
      this.refresh();
    }
  },
  computed: {
    pageRefresh: get("app/pageRefresh"),
    dashboardRefresh: get("app/dashboardRefresh"),
    tooltipFormatter() {
      return value => {
        return unitUtil.byteToUnit(value);
      };
    },
    legendFormatter() {
      return (name, value) => {
        return name + " (" + unitUtil.byteToUnit(value) + ")";
      };
    }
  },
  props: {
    zone: { type: String, default: "" }
  },
  methods: {
    refresh() {
      // this.getData();
    },
  },
  created() {
    this.refresh();
  },
  components: {
  }
};
</script>
