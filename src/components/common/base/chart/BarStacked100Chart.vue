<template>
  <apexchart type="bar" :width="width" :height="height" :options="chartOptions" :series="series" />
</template>

<script>
import * as _ from "lodash";
import ChartMixin from "@/mixin/ChartMixin";

export default {
  name: "BarStacked100Chart",
  data() {
    return {};
  },
  mixins: [ChartMixin],
  computed: {
    defaultOptions() {
      return {
        chart: {
          stacked: true,
          stackType: "100%"
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: "100%"
          }
        },
        dataLabels: {
          formatter: (val, opts) => {
            return this.values[opts.seriesIndex].data[0];
          },
          style: {
            colors: ["white"]
          },
          enabled: true,
          textAnchor: "start"
        },
        legend: {
          showForSingleSeries: false,
          position: "top",
          horizontalAlign: "right",
          offsetX: 0,
          showForNullSeries: true
        },
        xaxis: {
          categories: this.totalCount,
          labels: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: ["#1e88e5"],
              fontSize: "20px",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 450
            },
            offsetY: 5
          },
          axisTicks: {
            show: false
          }
        },
        tooltip: {
          x: {
            show: false
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
      if (this.values.length == 0) return [];
      const list = this.values.map(val => {
        return {
          name: val.name,
          data: val.data
        };
      });

      return list;
    },
    totalCount() {
      let count = 0;
      this.values.forEach(val => (count += val.data[0]));
      return [count];
    }
  },
  methods: {},
  components: {}
};
</script>

<style scoped></style>
