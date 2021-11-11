import unitUtil from "@/utils/unitUtil";
export default {
  data: () => {
    return {
      globalOptions: {
        // 최종적으로 (globalOptions) + (각 차트의 defaultOptions) + (props로 받은 options) 를 merge 하여 options 사용
        chart: {
          toolbar: {
            show: true,
            offsetX: 0,
            offsetY: 0,
            autoSelected: "zoom",
            tools: {
              download: false, // 메뉴 아이콘. png, svg, csv 저장
              selection: false, // zoomin 시 사용자가 사각형으로 범위를 정하는 것이 가능 - scatter 차트등에서 필요
              zoomin: false, // + 아이콘. zoomin
              zoomout: false, // - 아이콘. zoomout
              zoom: false, // + 돋보기 아이콘. mouse drag 로 zoom 가능
              pan: false, // 손바닥 아이콘. mouse drag 로 graph 이동 가능
              reset: false // 집 아이콘. zoom 상태 초기화
            }
          }
        }
      }
    };
  },
  props: {
    title: { type: String },
    width: { type: String, default: "100%" },
    height: { type: String, default: "200" },
    values: { required: true, type: Array, default: () => [] },
    options: { type: Object, default: () => ({}) },
    editMode: { type: Boolean, default: false },
    isFullScreen: { type: Boolean, default: false }
  },
  computed: {
    titleSuffix() {
      const intervalString = this.values[0]?.meta?.intervalString;
      if (!intervalString) return "";
      const convertInterval = this.getConvertInterval(intervalString);
      return convertInterval;
    }
  },
  methods: {
    // title: value 형식의 라벨
    dataLabelFormatter(val, opt) {
      if (isNaN(val)) return "　　-";
      const meta = this.values[0]?.meta;
      const arr = [];
      arr.push(opt.w.globals.labels[opt.dataPointIndex] + ":");
      arr.push(meta?.prefix || "");
      if (meta.unit == "h") {
        if (val > 3600) {
          arr.push(parseInt(val / 3600) + "h");
          val %= 3600;
        }
        if (val > 60) {
          arr.push(parseInt(val / 60) + "m");
          val %= 60;
        }
        arr.push(val + "s");
      } else if (meta.unit == "byte") {
        arr.push(unitUtil.byteToUnit(val));
      } else {
        arr.push(this.commonUtil.addComma(val.toFixed(meta?.fixedNum || 0), true));
        arr.push(meta?.unit || "");
      }
      arr.push(meta?.suffix || "");
      const rst = arr.join(" ");
      return rst;
    },
    // value 만 표시하는 라벨
    labelFormatter(val) {
      if (isNaN(val)) return "-";
      const meta = this.values[0]?.meta;
      const arr = [];
      arr.push(meta?.prefix || "");
      arr.push(this.commonUtil.addComma(val.toFixed(meta?.fixedNum || 0), true));
      arr.push(meta?.unit || "");
      arr.push(meta?.suffix || "");
      const rst = arr.join(" ");
      return rst;
    },
    getConvertInterval(intervalString) {
      const interval = intervalString.slice(0, intervalString.length - 1); // 단위 제거
      let convertInterval = interval + " seconds";
      // 일, 시간, 분으로 변환
      if (interval >= 86400) {
        convertInterval = (interval / 86400).toFixed(0) + " days";
      } else if (interval >= 3600) {
        convertInterval = (interval / 3600).toFixed(0) + " hours";
      } else if (interval >= 60) {
        convertInterval = (interval / 60).toFixed(0) + " minutes";
      }
      return "per " + convertInterval;
    },
    getXaxisFormatter(val) {
      const fixedVal = val.toFixed(0);
      const intervalString = this.values[0]?.meta?.intervalString;
      if (!intervalString) return fixedVal;

      let format = "MM-DD HH:mm";
      const interval = intervalString.slice(0, intervalString.length - 1); // 단위 제거
      if (interval < 60) {
        format = "HH:mm:ss";
      } else if (interval < 3600) {
        format = "HH:mm";
      } else if (interval < 86400) {
        format = "MM-DD HH:mm";
      } else if (interval < 2592000) {
        format = "MM-DD";
      } else {
        format = "YYYY-MM-DD";
      }
      const rst = this.timeUtil.getLocalTime(fixedVal, format);
      return rst;
    }
  },
  components: {
    // WidgetFullScreen: () => import("@/components/common/WidgetFullScreen")
  }
};
