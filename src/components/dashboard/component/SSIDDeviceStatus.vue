<template>
  <div style="margin:0 auto" align="center">
    <v-row no-gutters style="margin-bottom: 22px;">
      <div>{{ $t("title.ssidDeviceStatus") }}<span v-if="radioSelect1 == 'radio_treemap'"> (SNR)</span></div>
      <v-radio-group v-model="radioSelect1" row style="position: absolute; top: 0px; right: 100px; padding:0px">
        <v-radio label="List" value="radio_list"></v-radio>
        <v-radio label="Tree map" value="radio_treemap"></v-radio>
      </v-radio-group>
    </v-row>
    <v-row class="w100">
      <div class="w100" v-if="radioSelect1 == 'radio_list'">
        <DeviceStatusDataTable :dataTableKey="dataTableKey" :domainId="domain" :zone="zone"></DeviceStatusDataTable>
      </div>
      <div class="w100" v-else>
        <ComponentBtn :refresh="getSSIDDeviceTreemap" />
        <treemap-chart height="380px" width="95%" :options="options" :values="SSIDDeviceTreemapValue" />
      </div>
    </v-row>
  </div>
</template>
<script>
import { get } from "vuex-pathify";
export default {
  name: "SSIDDeviceStatus",
  data: () => {
    return {
      dataTableKey: "SSIDDeviceStatus",
      radioSelect1: "radio_list",
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
      }
    };
  },
  props: {
    zone: {
      type: String
    }
  },
  watch: {
    zone() {
      this.getData();
    },
    pageRefresh() {
      this.refresh();
    }
  },
  computed: {
    domain: get("account/account@domain")
  },
  methods: {
    refresh() {
      this.getData();
    },
    getData() {
      this.getSSIDDeviceTreemap();
      // this.SSIDDeviceListValue = res;
    },
    getSSIDDeviceTreemap(clickDown = false) {
      //   this.SSIDDeviceTreemapValue = this.apiHelper.getMock("dashboard_Device_Treemap");
      const params = { 
        item: "treemap",
        domainId: this.domain
      };
      if (clickDown == false) {
        this.SSIDDeviceTreemapValue = [];
        this.apiHelper.get(this.apiUrl.MGMTDEVICE.LIST, params).then(res => {
          res.list.forEach(ele => {
            const length = this.SSIDDeviceTreemapValue.length;
            if (length == 0 || this.SSIDDeviceTreemapValue[length - 1].name != ele.ssid) {
              this.SSIDDeviceTreemapValue.push({
                name: ele.ssid,
                data: [
                  {
                    x: ele.device,
                    y: ele.data
                  }
                ]
              });
            } else {
              this.SSIDDeviceTreemapValue[length - 1].data.push({ x: ele.device, y: ele.data });
            }
          });
        });
      } else {
        this.apiHelper.postFileDown(this.apiUrl.MGMTDEVICE.LIST_DOWNLOAD, params);
      }
    }
  },
  created() {
    this.getData();
  },
  components: {
    DeviceStatusDataTable: () => import("@/components/common/DeviceStatusDataTable"),
    ComponentBtn: () => import("@/components/dashboard/component/ComponentBtn")
  }
};
</script>
<style>
.w100 {
  width: 100%;
}
</style>
