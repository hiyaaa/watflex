<template>
  <div>
    <v-infinite-scroll
      class="infinite-scroll"
      :loading="loading"
      @bottom="nextPage"
      :offset="20"
      :style="getStyle"
    >
      <base-data-table
        v-bind="$attrs"
        v-on="$listeners"
        :headers="columnList"
        dense
        :refresh="refresh"
        @update:sort="updateSort"
      >
        <template #item="{ headers, item }">
          <tr :class="item.severity == null ? '' : item.severity">
            <td
              v-for="(header, i) in headers"
              :key="i"
              v-bind:class="isAlign(header.value)"
            >
              <span
                v-if="
                  ['name'].includes(
                    header.value
                  )
                "
                @click="clickName(item)"
                :style="
                  nameClickEvent ? 'cursor: pointer; color: #1e88e5;' : ''
                "
                >{{ item[header.value] }}</span
              >

              <span v-else-if="header.value.includes('Time')">{{
                formatTime(item[header.value])
              }}</span>
              <v-chip
                v-else-if="header.value == 'status'"
                small
                label
                style="width: 100%; text-align: center; justify-content: center"
                :color="getStatusColor(item[header.value])"
                >{{ getStatusValue(item[header.value]) }}
              </v-chip>
            
              <span v-else>
                {{item[header.value]}}
              </span>
            </td>
          </tr>
        </template>
      </base-data-table>
    </v-infinite-scroll>
  </div>
</template>

<script>
import { ACTION_TYPE, DEVICE_STATUS } from "@/constants/consts";

export default {
  data() {
    return {
      actionTypeList: ACTION_TYPE,
      headers: [],
      loading: false,
    };
  },
  computed: {
    getStyle() {
      return "max-height: " + this.scrollHieght + "vh; overflow: auto";
    },
  },
  methods: {
    
    formatTime(time) {
      if (!time) return;
      // if (typeof time == "string" && time.indexOf(" ") < 0) return time;
      return this.timeUtil.getLocalTime(time);
    },
    getStatusValue(val) {
      if (this.dataTableKey == "userList") {
        if (val == 0) {
          return "Delete";
        } else if (val == 1) {
          return "Active";
        }
      } else {
        return val;
      }
    },
    
    getStatusColor(val) {
      if (this.dataTableKey !== "userList") {
        let device = Object.values(DEVICE_STATUS).filter(
          (v) => val.toLowerCase() == v.STATUS
        )[0];
        if (device) {
          return device.COLOR;
        } else {
          return "grey";
        }
      } else {
        if (val == 0) {
          return "grey";
        } else if (val == 1) {
          return DEVICE_STATUS.ONLINE.COLOR;
        }
      }
    },
    clickName(val) {
      if (this.nameClickEvent) this.nameClickEvent(val);
    },
    updateSort(sort) {
      this.$emit("update:sortCol", sort.sortCol);
      this.$emit("update:dir", sort.dir);
      this.refresh(true, false);
    },
    isAlign(val) {
      let i;
      let centerValue = [
        "clientMac",
      ];
      let rightValue1 = [
        "alerts",
      ]; // ap list
      let rightValue2 = [
        "snr",
      ]; // client list
      for (i = 0; i <= centerValue.length; i++)
        if (val == centerValue[i]) return "text-center";
      for (i = 0; i <= rightValue1.length; i++)
        if (val == rightValue1[i]) return "text-right";
      for (i = 0; i <= rightValue2.length; i++)
        if (val == rightValue2[i]) return "text-right";
      return false;
    },
    nextPage() {
      this.loading = true;
      var _self = this;
      this.api(false, false, function () {
        _self.loading = false;
      });
    },
  },
  components: {
  },
  watch: {
  },
  props: {
    // localStorage 에 테이블 설정 저장하기위한 키(테이블 별 고유값)
    dataTableKey: {
      type: String,
    },
    itemsPerPage: {
      type: Number,
      default: 3,
    },
    // 전체 컬럼 리스트
    columnList: {
      type: Array,
      default: () => [],
    },
    // 디폴트로 보여줄 itemsPerPage
    defaultRowCount: {
      type: Number,
    },
    // name 컬럼 클릭시 이벤트
    nameClickEvent: {
      type: Function,
    },
    // download 버튼 표시 여부
    hideDownload: {
      type: Boolean,
      default: false,
    },
    refresh: {
      type: Function,
    },
    api: {
      type: Function,
    },
    scrollHieght: {
      type: String,
      default: "55",
    },
  },
  created() {
  },
};
</script>

<style>
.search-action-data-table-header {
  white-space: nowrap;
}
</style>
