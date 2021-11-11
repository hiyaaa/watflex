<template>
  <div class="base-component-container">
    <div class="component-title" v-if="title">
      <base-sub-title :title="title" :subTitle="titleSuffix">
        <!-- <div v-if="!isFullScreen">
          <WidgetFullScreen
            :componentName="$options._componentTag"
            :title="title"
            :values="values"
            :options="chartOptions"
          ></WidgetFullScreen>
        </div> -->
        <slot />
      </base-sub-title>
    </div>
    <div class="component-content">
      <apexchart type="line" :width="width" :height="height" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script>
import * as _ from "lodash";
import ChartMixin from "@/mixin/ChartMixin";

export default {
  name: "LineBasicChart",
  mixins: [ChartMixin],
  data() {
    return {};
  },
  computed: {
    defaultOptions() {
      return {
        chart: {
          id: this._uid,
          stacked: false,
          toolbar: {
            tools: {
              zoom: true,
              reset: "<i aria-hidden='true' class='v-icon meterial-icons mdi mdi-refresh'/>"
            }
          },
          zoom: {
            autoScaleYaxis: true
          }
        },
        dataLabels: { enabled: false }, //chart 위에 data value 표시
        stroke: { curve: "straight", width: 2, lineCap: "square" },
        legend: { position: "top", horizontalAlign: "center" },
        grid: { position: "front" },
        xaxis: {
          tooltip: { enabled: false },
          type: "numeric",
          labels: {
            minHeight: 20,
            trim: true,
            formatter: this.getXaxisFormatter
          }
        },
        yaxis: {
          labels: {
            show: true,
            minWidth: 70,
            formatter: this.labelFormatter
          }
        },
        tooltip: {
          x: {
            formatter: v => this.timeUtil.getLocalTime(v)
          }
        }
      };
    },
    chartOptions() {
      return _.merge(this.globalOptions, this.defaultOptions, this.options);
    },
    series() {
      const list = this.values.map(val => {
        return {
          name: val.name,
          data: val.data.map(itemData => [itemData.key, itemData.value])
        };
      });
      return list;
    }
  },
  methods: {},
  components: {},
  created() {}
};
</script>

<style scoped></style>
