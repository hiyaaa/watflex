<template>
  <div class="base-component-container">
    <div class="component-title" v-if="title">
      <base-sub-title :title="title">
        <!-- <div v-if="!isFullScreen">
          <WidgetFullScreen
            :componentName="$options._componentTag"
            :title="title"
            :values="values"
            :options="chartOptions"
            :categoryCount="categoryCount"
          ></WidgetFullScreen>
        </div> -->
        <slot />
      </base-sub-title>
    </div>
    <apexchart type="bar" :width="width" :height="height" :options="chartOptions" :series="series" />
    <!-- content -->
  </div>
</template>

<script>
import * as _ from "lodash";
import ChartMixin from "@/mixin/ChartMixin";

export default {
  name: "BarLabeledChart",
  props: {
    categoryCount: { type: Number, default: 5 }
  },
  data() {
    return {};
  },
  mixins: [ChartMixin],
  computed: {
    defaultOptions() {
      return {
        chart: {
          events: {
            click: (event, chartContext, config) => {
              const data = this.values[config.dataPointIndex];
              if (data?.data[0]?.exportValue) {
                this.$emit("click", data.data[0].exportValue);
              }
            }
          }
        },
        grid: {
          show: false
        },
        plotOptions: {
          bar: {
            horizontal: true,
            distributed: true,
            dataLabels: {
              position: "bottom",
              maxItems: 5
            }
          }
        },
        dataLabels: {
          formatter: this.dataLabelFormatter,
          style: {
            colors: ["#000000de"]
          },
          textAnchor: "start"
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: this.categories,
          labels: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        yaxis: {
          labels: {
            show: false
          }
        },
        tooltip: {
          x: {
            show: false
          },
          y: {
            title: {
              formatter: () => {}
            },
            formatter: this.dataLabelFormatter
          }
        },
        noData: {
          text: "No Data",
          align: "center",
          verticalAlign: "middle",
          offsetX: 0,
          offsetY: 0
        }
      };
    },
    chartOptions() {
      return _.merge(this.globalOptions, this.defaultOptions, this.options);
    },
    series() {
      // categoryCount 갯수만큼 list 추가함
      let list = [];
      for (let i = 0; i < this.categoryCount; i++) {
        if (!this.values[i]) {
          list.push("");
          continue;
        }
        let val = this.values[i].data[0].value;

        list.push(val);
      }
      return [{ data: list }];
    },
    categories() {
      // 현재 보이지 않게 되어있음 갯수만 의미있음
      // categoryCount 갯수만큼 list 추가함
      let list = [];
      for (let i = 0; i < this.categoryCount; i++) {
        if (!this.values[i]) {
          list.push("");
          continue;
        }
        let val = this.values[i].data[0].key;
        list.push(val);
      }
      return list;
    }
  },
  methods: {},
  components: {}
};
</script>

<style scoped></style>
