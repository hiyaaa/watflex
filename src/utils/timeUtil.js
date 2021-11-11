import moment from "moment-timezone";
import { FORMATS, DEFAULT_FORMAT, LATEST_TIME } from "@/constants/consts";

export default {
  getInterval(time) {
    const start = convertText(time);
    const now = this.getNowTime("x");
    const diff = this.getDiffMillis(start, now);
    const dataCount = 500;
    const interval = diff / dataCount;

    let rst = interval;

    if (interval < 10000) {
      // 10초 미만시 10초로 고정
      rst = 10000;
    } else if (interval > 86400000) {
      // 86400초(1일) 초과시 1일로 고정
      rst = 86400000;
    } else if (interval > 60000) {
      // 60초 초과 시 초단위 제거
      rst = (interval / 60000).toFixed(0) * 60000;
    }

    return rst;
  },
  getTimezone() {
    return moment.tz.guess();
  },
  getTimezoneList() {
    return moment.tz.names();
  },
  getTimezoneOffset(timezone) {
    const offset = moment.tz(timezone).format("Z");
    return offset;
  },
  // timezone 값을 이용하지 않고 keyword 변환 - parse - to ISO
  getNoTimezoneTime(time) {
    const parseTime = moment(time, FORMATS, true);
    const rst = parseTime.toISOString();
    return rst;
  },
  // timezone 값을 이용하지 않고 now time - format
  getNoTimezoneNowTime() {
    const parseTime = moment();
    const rst = parseTime.toISOString();
    return rst;
  },
  // keyword 변환 - parse - to ISO
  getISOTime(time) {
    const convertTime = convertText(time);
    const parseTime = parseLocalTime(convertTime);
    const rst = parseTime.toISOString();
    return rst;
  },
  // now time - format
  getNowTime(format) {
    const parseTime = parseLocalTime(null);
    const rst = parseTime.format(format || DEFAULT_FORMAT);
    return rst;
  },
  // keyword 변환 - timezone parse - format
  getLocalTime(time, format) {
    const convertTime = convertText(time);
    const parseTime = parseLocalTime(convertTime);
    const rst = parseTime.format(format || DEFAULT_FORMAT);
    return rst;
  },
  // DateTimePicker preset
  getPresetDt(diffValue, diffUnit, format) {
    const parseTime = parseLocalTime();
    const m = diffUnit ? parseTime.add(diffValue, diffUnit) : parseTime;
    const rst = m.format(format || DEFAULT_FORMAT);
    return rst;
  },
  // start of DT
  getStartOfDt(time, range, format) {
    const parseTime = parseLocalTime(time);
    const m = parseTime.startOf(range);
    const rst = m.format(format || DEFAULT_FORMAT);
    return rst;
  },
  // start of subtract DT
  getStartOfSubDt(time, range, subVal, subRange, format) {
    const parseTime = parseLocalTime(time);
    const m = parseTime.subtract(subVal, subRange).startOf(range);
    const rst = m.format(format || DEFAULT_FORMAT);
    return rst;
  },
  // end of DT
  getEndOfDt(time, unit, format) {
    const parseTime = parseLocalTime(time);
    const m = parseTime.endOf(unit);
    const rst = m.format(format || DEFAULT_FORMAT);
    return rst;
  },
  // add DT
  getAddDt(time, addVal, addRange, format) {
    const parseTime = parseLocalTime(time);
    const m = parseTime.add(addVal, addRange);
    const rst = m.format(format || DEFAULT_FORMAT);
    return rst;
  },
  getDiffDays(start, end) {
    return Math.floor(this.getDiffHours(start, end) / 24);
  },
  getDiffHours(start, end) {
    return Math.floor(this.getDiffMinutes(start, end) / 60);
  },
  getDiffMinutes(start, end) {
    return Math.floor(this.getDiffSeconds(start, end) / 60);
  },
  getDiffSeconds(start, end) {
    return Math.floor(this.getDiffMillis(start, end) / 1000);
  },
  getDiffMillis(start, end) {
    const st = moment(start, FORMATS, true);
    const ed = moment(end, FORMATS, true);
    return Math.floor(moment.duration(ed.diff(st)).asMilliseconds());
  },
  isValidDateTime(time) {
    if (!time) return false;
    const t = moment(time, FORMATS, true);
    return moment(t).isValid();
  },
  isValidDateRange(start, end) {
    if (!start || !end) return false;
    const transSt = convertText(start);
    const transEd = convertText(end);
    const st = moment(transSt, FORMATS, true);
    const ed = moment(transEd, FORMATS, true);
    return st.isSameOrBefore(ed);
  },
  isLatestTime(time) {
    return Object.values(LATEST_TIME).includes(time);
  },
  showElapsedTime(elapsed) {
    if (typeof elapsed === "undefined") return;
    var days = Math.floor(elapsed / 86400);
    var hours = Math.floor((elapsed - days * 86400) / 3600);
    var minutes = Math.floor((elapsed - days * 86400 - hours * 3600) / 60);
    //var secs = Math.floor(elapsed - days * 86400 - hours * 3600 - minutes * 60);
    return (days > 0 ? days + "d " : "") + (hours > 0 ? hours + "h " : "") + (minutes > 0 ? minutes + "m" : "");
  }
};

// time zone parse
function parseLocalTime(time) {
  const timezone = moment.tz.guess();
  const rst = time ? moment.tz(time, FORMATS, true, timezone) : moment().tz(timezone);
  return rst;
}

// keyword 변환
function convertText(time) {
  if (!time) return;
  const t = time.toString().trim();
  if (t == "now") return moment().toISOString();
  if (moment(t, FORMATS, true).isValid()) return t;
  const unit = t.substr(t.length - 1, 1);
  let convertUnit;
  switch (unit) {
    case "m":
      convertUnit = "minutes";
      break;
    case "h":
      convertUnit = "hours";
      break;
    case "d":
      convertUnit = "days";
      break;
    case "M":
      convertUnit = "months";
      break;
    default:
      convertUnit = "minutes";
      break;
  }
  const number = t.substring(4, t.length - 1);
  const rst = moment()
    .subtract(number, convertUnit)
    .toISOString();
  return rst;
}
// // keyword 변환
// function convertText(time) {
//   if (!time) return;
//   const t = time.toString().trim();
//   let rst;
//   switch (t) {
//     case LATEST_TIME.NOW:
//       rst = moment().toISOString();
//       break;
//     case LATEST_TIME.MIN_5:
//       rst = moment()
//         .add(-5, "minutes")
//         .toISOString();
//       break;
//     case LATEST_TIME.MIN_15:
//       rst = moment()
//         .add(-15, "minutes")
//         .toISOString();
//       break;
//     case LATEST_TIME.MIN_30:
//       rst = moment()
//         .add(-30, "minutes")
//         .toISOString();
//       break;
//     case LATEST_TIME.DAY_7:
//       rst = moment()
//         .add(-7, "days")
//         .toISOString();
//       break;
//     case LATEST_TIME.MTH_1:
//       rst = moment()
//         .add(-1, "months")
//         .toISOString();
//       break;
//     default:
//       rst = t;
//       break;
//   }
//   return rst;
// }
