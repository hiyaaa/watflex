<template>
  <div>
    <div class="component-title" v-if="title">
      <base-sub-title :title="title">
        <slot />
      </base-sub-title>
    </div>
    <apexchart type="treemap" :width="width" :height="height" :options="chartOptions" :series="series" />
  </div>
</template>

<script>
import * as _ from "lodash";
import ChartMixin from "@/mixin/ChartMixin";

export default {
  name: "TreemapChart",
  props: {
    tooltipFormatter: {
      type: Function,
      required: false,
      default: val => val
    }
  },
  data: () => {
    return {
      // series: [
      //     {
      //       name: 'Desktops',
      //       data: [
      //         { x: 'ABC', y: 10 },
      //         { x: 'DEF', y: 60 },
      //         { x: 'XYZ', y: 41 }
      //       ]
      //     },
      //     {
      //       name: 'Mobile',
      //       data: [
      //         { x: 'ABCD', y: 10},
      //         { x: 'DEFG', y: 20 },
      //         { x: 'WXYZ', y: 51 },
      //         { x: 'PQR', y: 30 },
      //         { x: 'MNO', y: 20 },
      //         { x: 'CDE', y: 30 }
      //       ]
      //     },
      //   ],
    };
  },
  mixins: [ChartMixin],
  computed: {
    defaultOptions() {
      return {
        chart: {
          id: this._uid,
          type: "treemap"
          // animations: {
          //   enabled: false
          // }
        },
        dataLabels: {
          enabled: true,
          position: "bottom"
        }, //chart 위에 data value 표시
        legend: {
          show: true,
          position: "bottom",
          labels: {
            useSeriesColors: false
          }
          // formatter: (val, opts) => {
          //   return this.values[opts.seriesIndex].name;
          // }
        },
        tooltip: {
          y: {
            title: {
              formatter: seriesName => {
                return seriesName + " ";
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
      // let list = [];
      // for (let i = 0; i < this.values.length; i++) {
      //   console.log(this.values[i].data);
      //   let value =
      //     this.values[i].data.value == undefined
      //       ? this.values[i].data.filter(d => d.value != null).pop().value
      //       : this.values[i].data.value;
      //   list.push(value);
      // }
      return this.values;
    }
  },
  methods: {},
  components: {}
};
</script>

<style scoped>
.donutTotal {
  position: absolute;
  font-size: 32px;
}
</style>
