<template>
  <div class="base-component-container">
    <div class="component-title" v-if="title">
      <base-sub-title :title="title">
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
  name: "BarStackedChart",
  props: {
    categoryCount: { type: Number, default: 2 }
  },
  data() {
    return {
        series: [{
            name: 'WPA2-AES',
            data: [2,5]
        }, {
            name: 'WPA3-SAE',
            data: [1, 12]
        },
        ],
    };
  },
  mixins: [ChartMixin],
  computed: {
    defaultOptions() {
      return {
          chart: {
              type: 'bar',
              height: 350,
              stacked: true,
              toolbar: {
                show: true
              },
              zoom: {
                enabled: true
              }
            },
            responsive: [{
              breakpoint: 480,
              options: {
                legend: {
                  position: 'bottom',
                  offsetX: -10,
                  offsetY: 0
                }
              }
            }],
            plotOptions: {
              bar: {
                horizontal: false,
                borderRadius: 10
              },
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
            legend: {
              position: 'right',
              offsetY: 40
            },
            fill: {
              opacity: 1
            }
      }
    },
    chartOptions() {
      return _.merge(this.globalOptions, this.defaultOptions, this.options);
    },
    // series() {
    //   // categoryCount 갯수만큼 list 추가함
    //   let list = [];
    //   for (let i = 0; i < this.categoryCount; i++) {
    //     console.log(this.values[i]);
    //     if (!this.values[i]) {
    //       list.push("");
    //       continue;
    //     }
    //     let val = this.values[i].data[0].value;
    //     list.push(val);
    //   }
    //   return [{ data: list }];
    // },
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
