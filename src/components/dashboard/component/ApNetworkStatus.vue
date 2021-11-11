<template>
  <div align="center">
    <v-row no-gutters>
      <div>{{ $t("title.apNetworkStatus") }}</div>
    </v-row>
    <v-row style="text-align:left">
      <v-col cols="4" style="position: relative;">
        <v-radio-group v-model="radioSelect2" row style="position: absolute; top: -6px; right: 0px; padding:0px">
          <v-radio label="Traffic" value="traffic"></v-radio>
          <v-radio label="SNR" value="snr"></v-radio>
        </v-radio-group>
        <v-card class="ap-network-card" :height="inner_height">
          <v-row class="pa-4">
            <v-col cols="4" class="pa-0">
              <div class="ap-network-status-icon" @click="clickAp()">
                <v-icon x-large :color="getColor('normal')">mdi-wifi</v-icon>
                <span>{{ $t("title.allAp") }}</span>
              </div>
            </v-col>
            <v-col cols="8" class="pa-0">
              <div>
                <div>
                  <div class="ap-network-device-status" :style="{ background: this.getColor('over') }"></div>
                  {{ $t("title.overNormalRange" + this.dataLabel()) }}
                </div>
                <div>
                  <div class="ap-network-device-status" :style="{ background: this.getColor('normal') }"></div>
                  {{ $t("title.normalRange" + this.dataLabel()) }}
                </div>
                <div>
                  <div class="ap-network-device-status" :style="{ background: this.getColor('disconn') }"></div>
                  {{ $t("title.disconnect" + this.dataLabel()) }}
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row class="pa-4">
            <div class="ap-network-status-icon" v-for="(ap, i) in apList" :key="i" @click="clickAp(ap.name, ap.mac)">
              <v-icon v-if="radioSelect2 == 'traffic'" x-large :color="getColor('normal')">mdi-wifi</v-icon>
              <!--TODO:: :color="getColor(ap.meta.traffic)"-->
              <v-icon v-else x-large :color="getColor('normal')">mdi-wifi</v-icon>
              <!--TODO:: :color="getColor(ap.meta.client_conn)"-->
              <span>{{ ap.name }}</span>
            </div>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="8">
        <ComponentBtn :refresh="getApNetworkstatus" />
        <div>
          {{ this.treemapTitle }}
        </div>
        <treemap-chart
          :height="inner_height"
          width="95%"
          :options="options"
          :values="apNetworkstatusValue"
          :tooltipFormatter="tooltipFormatter"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { get } from "vuex-pathify";
import unitUtil from "@/utils/unitUtil";

export default {
  name: "ApNetworkStatus",
  data: () => {
    return {
      inner_height: "350",
      dataTableKey: "ApNetworkStatus",
      apList: [],
      apNetworkstatusValue: [],
      radioSelect2: "traffic",
      apName: "",
      apMac: "",
      options: {
        color: [
          "#647B34",
          "#503D66",
          "#C06327",
          "#337385",
          "#95B84C",
          "#C6504C",
          "#487FC0",
          "#3EA9C5",
          "#FE9741",
          "#8061A5",
          "#274C78",
          "#762522"
        ]
      },
      treemapTitle: ""
    };
  },
  props: {
    zone: {
      type: String
    }
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
    },
    radioSelect2() {
      this.setTreemapTitle();
    },
    locale() {
      if (this.apName == "전체 APs" || this.apName == "All APs") this.apName = this.$t("title.allAp");
      this.setTreemapTitle();
    }
  },
  computed: {
    locale: get("app/locale"),
    tooltipFormatter() {
      return value => {
        return this.radioSelect2 === "traffic" ? unitUtil.byteToUnit(value) : value;
      };
    }
  },
  methods: {
    refresh() {
      if (this.apName == "") this.apName = this.$t("title.allAp");
      this.getData();
    },
    getData() {
      this.getApList();
      this.getApNetworkstatus();
    },
    dataLabel() {
      return this.radioSelect2 === "traffic" ? "Traffic" : "Connect";
    },
    getApList() {
      const params = {
        deviceType: "ap",
        zoneId: this.zone,
        page: 1,
        limit: 10
      };
      this.apiHelper.get(this.apiUrl.DEVICES.LIST, params).then(res => {
        this.apList = res.list;
        this.pageCount = this.commonUtil.getPageCount(res.totalCount, params.limit);
      });
    },
    setTreemapTitle() {
      var type = "";
      if (this.radioSelect2 == "traffic") type = "Traffic";
      if (this.locale == "ko") {
        type = type || "무선 감도(SNR)";
        this.treemapTitle = this.apName + "의 SSID/Client별 " + type;
      } else {
        type = type || "SNR";
        this.treemapTitle = type + " By SSID/Client " + this.apName;
      }
      this.getApNetworkstatus();
    },
    clickAp(name, mac) {
      // this.getApNetworkstatus에서 파라미터값을 받을수 없어서 만듦.
      this.apMac = mac;
      if (name == undefined) this.apName = this.$t("title.allAp");
      else this.apName = name;
      this.setTreemapTitle();
    },
    getApNetworkstatus(clickDown = false) {
      const isTraffic = this.radioSelect2 === "traffic";
      const params = {
        zoneId: this.zone
      };
      if (this.apName == this.$t("title.allAp")) {
        params.item = "treemap";
      } else {
        params.item = "treemap";
        params.ap = this.apMac;
      }
      if (clickDown == false) {
        this.apiHelper.get(isTraffic ? this.apiUrl.NETWORK.LIST_TRAFFIC : this.apiUrl.NETWORK.LIST_SNR, params).then(res => {
          this.apNetworkstatusValue = [];
          res.list.forEach(ele => {
            const length = this.apNetworkstatusValue.length;
            if (length == 0 || this.apNetworkstatusValue[length - 1].name != ele.ssid) {
              this.apNetworkstatusValue.push({
                name: ele.ssid,
                data: [
                  {
                    x: ele.client,
                    y: ele.data
                  }
                ]
              });
            } else {
              this.apNetworkstatusValue[length - 1].data.push({ x: ele.client, y: ele.data });
            }
          });
        });
      } else {
        this.apiHelper.postFileDown(this.apiUrl.NETWORK.LIST_DOWNLOAD, params);
      }
    },
    getColor(status) {
      switch (status) {
        case "over":
          return "#ff8100";
        case "normal":
          return "#2196F3";
        case "disconn":
          return "grey";
      }
    }
  },
  created() {
    this.refresh();
    this.setTreemapTitle();
  },
  components: {
    ComponentBtn: () => import("@/components/dashboard/component/ComponentBtn")
  }
};
</script>
<style scoped>
.ap-network-status-icon {
  float: left;
  cursor: pointer;
  text-align: center;
}
.ap-network-status-icon * {
  display: block;
  width: 90px;
}
.ap-network-device-status {
  width: 30px;
  height: 10px;
  display: inline-block;
}
.ap-network-card {
  background: #f7f7f7 !important;
  margin: 30px 10px;
  overflow: auto;
  overflow-x: hidden;
}
</style>
