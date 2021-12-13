<template>
  <div>
    <span style="position: absolute; right: 20px"> </span>
    <base-title title="영화 검색"></base-title>
    <v-row style="width: 100%" no-gutters class="mt-3">
      <v-col>
        <v-sheet class="mx-auto" elevation="8">
          <v-row>
            <v-col
              lg="12"
              sm="12"
              cols="2"
              class="
                pt-0 pb-0
                d-flex
                align-center
                justify-start justify-md-end"
              >
              <div class="mt-2 mr-2">
                <p>영화명 : </p>
              </div>
              <div style="width: 300px;" class="mt-6 mr-3">
                <v-text-field
                  outlined
                  dense
                >
                </v-text-field>
            </div>
            <div>
              <v-btn dense class="mr-5">검색</v-btn>
            </div>
            </v-col>
          </v-row>
             
        </v-sheet>
      </v-col>
    </v-row>

    <v-row style="width: 100%" no-gutters class="mt-3">
      <v-col>
        <v-sheet class="mx-auto" elevation="8">
          <v-row>
            <v-col
              lg="12"
              sm="12"
              cols="2"
              
              >
              <ScrollTable
                dataTableKey="search"
                :columnList="transColumnList"
                :defaultRowCount="defaultRowCount"
                :nameClickEvent="clickEvent"
                :api="getMovieList"
                :scrollHieght="'35'"

              ></ScrollTable>
            </v-col>
          </v-row>
             
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { get } from "vuex-pathify";
import unitUtil from "@/utils/unitUtil";
export default {
  name: "ApCurrentStatus",
  data: () => {
    return {
      model: null,
      left: '<',
      right: '>',
      itemList: [],
      defaultRowCount: 20,
      columnList: [
        {
          text: "이미지",
          value: "image",
          width: 120,
          sortable: false,
          align: "center",
        },
        {
          text: "영화명",
          value: "movieNm",
          width: 120,
          sortable: false,
          align: "center",
        },
        {
          text: "영화명(영문)",
          value: "movieNmEn",
          sortable: false,
          align: "center",
        },
        {
          text: "제작 년도",
          value: "prdtYear",
          sortable: false,
          align: "center",
        },
        {
          text: "개봉일",
          value: "openDt",
          sortable: false,
          align: "center",
        },
        {
          text: "제작 상태",
          value: "prdtStatNm",
          sortable: false,
          align: "center",
        },
        {
          text: "제작 국가",
          value: "nationAlt",
          sortable: false,
          align: "center",
        },
        {
          text: "장르",
          value: "genreAlt",
          sortable: false,
          align: "center",
        },
        {
          text: "감독",
          value: "peopleNm",
          sortable: false,
          align: "center",
        },
        {
          text: "제작사",
          value: "companyNm",
          sortable: false,
          align: "center",
        },
      
      ],

    };
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
  },
  computed: {
    pageRefresh: get("app/pageRefresh"),
    dashboardRefresh: get("app/dashboardRefresh"),
    tooltipFormatter() {
      return (value) => {
        return unitUtil.byteToUnit(value);
      };
    },
    legendFormatter() {
      return (name, value) => {
        return name + " (" + unitUtil.byteToUnit(value) + ")";
      };
    },
    transColumnList() {
      return this.commonUtil.transText(this.columnList);
    },

  },
  props: {
    zone: { type: String, default: "" },
  },
  methods: {
    refresh() {
      // this.getData();
    },
    getMovieList(){

    },
    clickEvent(){

    }
  },
  created() {
    this.refresh();
  },
  components: {
    ScrollTable: () => import("@/components/common/ScrollTable"),
  },
};
</script>
<style scoped>

</style>