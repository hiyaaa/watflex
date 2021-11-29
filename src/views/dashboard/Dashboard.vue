<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card class="pa-5">
          <v-row class="mb-3">
            <v-col style="padding-top:0px">
              <DailyBoxOffice></DailyBoxOffice>
            </v-col>
          </v-row>
          <v-row class="mb-3">
            <v-col style="padding-top:0px">
              <WeeklyBoxoffice></WeeklyBoxoffice>
            </v-col>
          </v-row>
          <v-row class="mb-3">
            <v-col style="padding-top:0px">
              <WeekendBoxoffice></WeekendBoxoffice>
            </v-col>
          </v-row>
         
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
 
<script>
import { sync } from "vuex-pathify";
import timeUtil from "@/utils/timeUtil";
import { get } from "vuex-pathify";
export default {
  name: "Dashboard",

  data: () => {
    return {
      menuToggle: false,
      zone: "",
      refreshTime: 0,
      switchToggle: true,
      zoneList:"",
    };
  },

  methods: {
    changeZone(val) {
      this.zone = val;
      localStorage.setItem("dashboardZone",val);
      this.dashboardRefresh = timeUtil.getLocalTime();
    },
    apply() {
      if (this.switchToggle) {
        this.refreshCount = this.refreshTime;
        this.dashboardRefresh = timeUtil.getLocalTime();
      } else this.refreshCount = -1;
      this.dashboardRefresh = this.menuToggle = false;
    }
  },
  computed: {
    dashboardRefresh: sync("app/dashboardRefresh"),
    refreshCount: sync("app/refreshCount"),
    domain: get("account/account@domain")
  },
  created() {
    if(localStorage.getItem("dashboardZone")) {
      this.zoneList = localStorage.getItem("dashboardZone");
    }else this.zoneList="";
    this.dashboardRefresh = timeUtil.getLocalTime();
    if (this.refreshCount < 0) {
      this.switchToggle = false;
      this.refreshTime = 180;
    } else {
      this.refreshTime = this.refreshCount;
    }
  },
  components: {
    DailyBoxOffice: () => import("@/components/dashboard/DailyBoxOffice"),
    WeeklyBoxoffice: () => import("@/components/dashboard/WeeklyBoxoffice"),
    WeekendBoxoffice: () => import("@/components/dashboard/WeekendBoxoffice"),
  }
};
</script>
