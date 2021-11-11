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
    <apexchart type="donut" :width="width" :height="height" :options="chartOptions" :series="series" />
  </div>
</template>

<script>
import * as _ from "lodash";
import ChartMixin from "@/mixin/ChartMixin";

export default {
  name: "DonutChart",
  props: {},
  data: () => {
    return {
    };
  },
  mixins: [ChartMixin],
  computed: {
    defaultOptions() {
      return {
        chart: {
          id: this._uid
        },
        plotOptions: {
            pie:{
                donut:{
                    labels:{
                        show:true,
                        total:{
                            showAlways:true,
                            show:true
                        }
                    }
                }
            }
        },
        dataLabels: {
          enabled: false,
        }, //chart 위에 data value 표시
        legend: {
          position: "right",
          labels: {
            useSeriesColors: false
          },
          formatter: (val, opts) => {
            return this.values[opts.seriesIndex].name + " ("+this.values[opts.seriesIndex].data[0].value+")";
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
              return this.commonUtil.addComma(val);
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

<style scoped>
.donutTotal{
    position: absolute;
    font-size: 32px;
}
</style>
