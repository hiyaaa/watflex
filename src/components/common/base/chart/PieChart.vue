<template>
  <div>
    <div class="component-title" v-if="title">
      <base-sub-title :title="title">
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
    <apexchart type="pie" :width="width" :height="height" :options="chartOptions" :series="series" />
  </div>
</template>

<script>
import * as _ from "lodash";
import ChartMixin from "@/mixin/ChartMixin";
import commonUtil from "@/utils/commonUtil";

export default {
  name: "PieChart",
  props: {
    legendFormatter: {
      type: Function,
      required: false,
      default: (name, value)=>{
        return name + " (" + value + ")";
      }
    },
    tooltipFormatter: {
      type: Function,
      required: false,
      default: (val)=>{
        return commonUtil.addComma(val);
      }
    }
  },
  data() {
    return {};
  },
  mixins: [ChartMixin],
  computed: {
    defaultOptions() {
      return {
        chart: {
          id: this._uid
        },
        plotOptions: {
          pie: {
            offsetX: 50
          }
        },
        dataLabels: {
          enabled: true,
          formatter: this.labelFormatter,
          dropShadow: {
            enabled: false
          }
        }, //chart 위에 data value 표시
        legend: {
          position: "right",
          labels: {
            useSeriesColors: false
          },
          formatter: (val, opts) => {
            return this.legendFormatter(
              this.values[opts.seriesIndex].name
              , this.values[opts.seriesIndex].data[0].value
            );            
          }
        },
        tooltip: {
          x: {
            show: true,
            format: "yyyy-MM-dd HH:mm:ss"
          },
          y: {
            title: {
              formatter: (seriesName, opt) => {
                return this.values[opt.seriesIndex].name;
              }
            },
            formatter: val => {
              return this.tooltipFormatter(val);
            }
          }
        }
      };
    },
    chartOptions() {
      return _.merge(this.globalOptions, this.defaultOptions, this.options);
    },
    series() {
      let list = [];
      for (let i = 0; i < this.values.length; i++) {
        let value =
          this.values[i].data.value == undefined
            ? this.values[i].data.filter(d => d.value != null).pop().value
            : this.values[i].data.value;
        list.push(value);
      }
      return list;
    }
  },
  methods: {},
  components: {}
};
</script>

<style scoped></style>
