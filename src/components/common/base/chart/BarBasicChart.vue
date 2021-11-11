<template>
  <div class="base-component-container">
    <div class="component-title" v-if="title">
      <base-sub-title :title="title" :subTitle="titleSuffix">
        <slot />
      </base-sub-title>
    </div>
    <div class="component-content">
      <apexchart type="bar" :width="width" :height="height" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script>
import * as _ from "lodash";
import ChartMixin from "@/mixin/ChartMixin";

export default {
  name: "BarBasicChart",
  props: {},
  mixins: [ChartMixin], 
  data() {
    return {/*
        series: [{
            name: 'Net Profit',
            data: [3,7,2,8]
          }]
    */};
  },
  computed: {    
    defaultOptions() {
      const categorieNames = this.values.map((item)=>item.name);      
      return {
          chart: {
              type: 'bar',
              height: 350
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
            },
            xaxis: {
              categories: categorieNames//['WPA2+Open','WPA2+1x','WPA3+Open','WPA3+1x'],
            },
            fill: {
              opacity: 1
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return val
                }
              }
            }
        // chart: {
        //   id: this._uid,
        //   stacked: false,
        // },
        // dataLabels: { enabled: false }, //chart 위에 data value 표시
        // stroke: { curve: "straight", width: 2, lineCap: "square" },
        // legend: { show:false },
        // grid: { position: "front" },
        // xaxis: {
        //   show: true,
        //   tooltip: { enabled: true },
        //   type: "numeric",
        //   labels: {
        //     minHeight: 20,
        //     trim: true,
        //     formatter: this.getXaxisFormatter
        //   }
        // },
        // yaxis: {
        //   labels: {
        //     show: true,
        //     minWidth: 70,
        //     formatter: this.labelFormatter
        //   }
        // },
        // tooltip: {
        //   x: {
        //     formatter: v => this.timeUtil.getLocalTime(v)
        //   }
        // }
      };
    },
    chartOptions() {
      
      return _.merge(this.globalOptions, this.defaultOptions, this.options);
    },
    series() {
      const list = this.values.map(val => val.data.map(itemData => itemData.value)[0]);
      return [{
        name: 'Net Profit',
        data: list
      }];
    }
    // series() {
    //   const list = this.values.map(val => {
    //       console.log(val.data[0]);
    //     return {
    //       name: val.name,
    //       data: val.data.map(itemData => [itemData.key, itemData.value])
    //     };
    //   });
    //   return list;
    // }
  },
  methods: {},
  components: {},
  mounted () {},
  created() {}
};
</script>

<style scoped></style>
