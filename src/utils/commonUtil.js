import uuid from "uuid/v4";
import Vue from "vue";
import crypto from "crypto";
import timeUtil from "./timeUtil";
import { FORMAT_24 } from "@/constants/consts";
import i18n from "@/i18n";
import * as _ from "lodash";

export default {
  getPageCount(totalCount, countPerPage) {
    const pageCount = parseInt((totalCount - 1) / countPerPage) + 1;
    return pageCount < 1 ? 1 : pageCount;
  },
  getUuid() {
    return uuid();
  },
  getTimeUnitStr(unit) {
    let str = "";
    switch (unit) {
      case "D":
        str = "Days";
        break;
      case "H":
        str = "Hours";
        break;
      case "M":
        str = "Minutes";
        break;
      default:
        break;
    }
    return str;
  },
  isNumeric(val) {
    var regExp = /^[0-9]+$/;
    if (regExp.test(val)) {
      return isNaN(val); // 숫자가 아닐 경우 true
    }
    return true;
  },
  checkSpecialChar(val, target) {
    // const normalRule = /[~!@#$%^&*()_+|<>?:{}]/;
    const normalRule = /[~!#$%^&*()+|<>?:{}]/;
    if ((val && (val.indexOf("'") >= 0 || val.indexOf('"') >= 0 || val.indexOf("\\") >= 0)) || normalRule.test(val)) {
      Vue.$alert.warn("Please enter except special(\" or ' or \\ or !, @, #...) charcters. : " + target);
      return false;
    }
    return true;
  },
  checkStringLength(val, target, paramlength) {
    if (val && val.toString().split("").length > paramlength) {
      Vue.$alert.warn(`Please ${target} sould be ${paramlength}`);
      return false;
    }
    return true;
  },
  checkOnlyNumber(val, target) {
    const exp = /^[0-9]*$/g;
    if (isNaN(val) || !exp.test(val)) {
      Vue.$alert.warn("Please enter numbers only : " + target);
      return false;
    }
    return true;
  },
  checkOnlyPosNumber(val, target) {
    const exp = /^[0-9]*$/g;
    if (isNaN(val) || !exp.test(val) || val < 1) {
      Vue.$alert.warn("Please enter positive numbers only : " + target);
      return false;
    }
    return true;
  },
  checkEmptyString(val, target) {
    if (typeof val != "undefined" && val.toString().trim() == "") {
      Vue.$alert.warn("Please enter some value : " + target);
      return false;
    }
    return true;
  },
  checkUndefinedOrEmptyString(val, target, alert = true) {
    if (typeof val == "undefined" || val.toString().trim() == "") {
      if (alert) {
        Vue.$alert.warn("Please enter some value : " + target);
      }
      return false;
    }
    return true;
  },
  checkStringBytes(val, length, target) {
    if (Buffer.byteLength(val, "utf8") > length) {
      Vue.$alert.warn(`Please enter some value less than ${length} bytes : ` + target);
      return false;
    }
    return true;
  },
  checkUrlFormat(val, target) {
    const normalRule = /^[a-zA-Z0-9]{3,20}$/g;
    if (!normalRule.test(val)) {
      Vue.$alert.warn("Please enter except special charcters(3~20) : " + target);
      return false;
    }
    return true;
  },
  checkNormalFormat(val, target) {
    const normalRule = /^[a-zA-Z0-9가-힣]{3,20}$/g;
    if (!normalRule.test(val)) {
      Vue.$alert.warn("Please enter except special charcters(3~20) : " + target);
      return false;
    }
    return true;
  },
  checkPwFormat(val, target) {
    const pwRule1 = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const pwRule2 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{10,}$/;
    const pwRule3 = /^(?=.*[A-Za-z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/;
    const pwRule4 = /^(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/;
    const message = "Please enter at least 8 characters including\nnumbers, letters and special characters";
    if (!(pwRule1.test(val) || pwRule2.test(val) || pwRule3.test(val) || pwRule4.test(val))) {
      Vue.$alert.warn(`${message} : ${target}`);

      return false;
    }
    return true;
  },
  checkPhoneNumber(val, target) {
    const phoneRule = /^\d{10,11}$/;
    if (!phoneRule.test(val)) {
      Vue.$alert.warn("Please enter a 10 or 11 digits number : " + target);
      return false;
    }
    return true;
  },
  checkEmailFormat(val, target) {
    const emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (!emailRule.test(val)) {
      Vue.$alert.warn("Please enter a valid email address e.g.) foo@bar.com : " + target);
      return false;
    }
    return true;
  },
  checkError(res) {
    if (res instanceof Error) {
      return false;
    }
    return true;
  },
  /**
   * files(webpack context)를 인수로 받아 파일명을 키로하는 modules 객체 리턴
   * @param {webpackContext} files
   */
  getModulesFromFiles(files) {
    const modules = {};
    files.keys().forEach(key => {
      if (key === "./index.js") return;
      modules[key.replace(/(\.\/|\.js)/g, "")] = files(key).default;
    });
    return modules;
  },
  /**
   * bytes 값을 해당 unit으로 변환 (Bytes, KB, MB, GB, ...). unit param 을 받지 않은경우 적절한 unit 으로 변환.
   * @param {Number} bytes - bytes 크기
   * @param {Number} decimals - 표현할 소수점 자리수
   * @param {String} unit - 단위 ("Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB")
   */
  formatBytes(bytes, decimals = 3, unit) {
    if (bytes == 0) return 0;
    return this.formatBytesInfo(bytes, decimals, unit).str;
  },
  formatBytesInfo(bytes, decimals = 3, unit) {
    const UNIT_LIST = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const result = { value: 0, unit: UNIT_LIST[0], str: "" };

    let matchedUnit = unit ? UNIT_LIST.filter(v => v.toUpperCase().indexOf(unit.toUpperCase()) == 0)[0] : null;
    let unitIndex = UNIT_LIST.indexOf(matchedUnit);
    const k = 1024; //단위 기준 값

    let formattable = false;
    if (
      (typeof unit === "undefined" && bytes != null && !isNaN(bytes) && bytes >= k) ||
      (unitIndex >= 1 && bytes != null && !isNaN(bytes))
    ) {
      formattable = true;
    }

    if (formattable == false) {
      return { value: bytes, unit: UNIT_LIST[0], str: "" };
    }

    const reversNum = bytes > 0 ? 1 : -1; //음수가 들어왔을 경우 log 계산식에서는 양수로 계산하고 return 시 음수로 보정하기 위함
    bytes *= reversNum;

    if (unitIndex < 0) {
      unitIndex = parseInt(Math.floor(Math.log(bytes) / Math.log(k)));
    }

    if (unitIndex == 0) {
      result.value = Number(bytes) * reversNum;
    } else {
      result.value = Number((bytes / Math.pow(k, unitIndex)).toFixed(decimals)) * reversNum;
    }
    result.unit = UNIT_LIST[unitIndex];
    result.str = result.value + " " + result.unit;

    return result;
  },

  /**
   * 값을 1천 단위의 unit 으로 변환(K, M, B, T). unit param 을 받지 않은경우 적절한 unit 으로 변환.
   * @param {Number} val - value
   * @param {String} unit - 단위 ("K", "M", "B", "T")
   */
  formatThousand(val, decimals = 3, unit) {
    return this.formatThousandInfo(val, decimals, unit).str;
  },
  formatThousandInfo(val, decimals = 3, unit) {
    const UNIT_LIST = ["", "K", "M", "B", "T"];
    const result = { value: 0, unit: "", str: "" };

    let unitIndex = unit == "" || unit ? UNIT_LIST.indexOf(unit.toUpperCase()) : -1;
    const k = 1000; //단위 기준 값

    let formattable = false;
    if (
      (typeof unit === "undefined" && val != null && !isNaN(val) && val >= k) ||
      (unitIndex >= 1 && val != null && !isNaN(val))
    ) {
      formattable = true;
    }

    if (formattable == false) {
      return { value: val, unit: "", str: val + "" };
    }

    const reversNum = val > 0 ? 1 : -1; //음수가 들어왔을 경우 log 계산식에서는 양수로 계산하고 return 시 음수로 보정하기 위함
    val *= reversNum;

    if (unitIndex < 0) {
      unitIndex = parseInt(Math.floor(Math.log(val) / Math.log(k)));
    }
    if (unitIndex == 0) {
      result.value = Number(val) * reversNum;
    } else {
      result.value = Number((val / Math.pow(k, unitIndex)).toFixed(decimals)) * reversNum;
    }
    result.unit = UNIT_LIST[unitIndex];
    result.str = (result.value + " " + result.unit).trim();

    return result;
  },

  formatPhone(val) {
    if (!val) return;
    let rst;
    if (val.length == 11) {
      rst = val.substr(0, 3) + "-" + val.substr(3, 4) + "-" + val.substr(7, 4);
    } else if (val.length == 10) {
      rst = val.substr(0, 3) + "-" + val.substr(3, 3) + "-" + val.substr(6, 4);
    } else {
      rst = val;
    }
    return rst;
  },

  /**
   * Byte 단위의 크기를 적절한 단위의 크기로 환산하기 index number
   * 'Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'
   * @param {Number} bytes
   */
  getFormatUnitIndex(bytes) {
    const k = 1024;
    const i = Math.floor(Math.log(Math.abs(bytes)) / Math.log(k));
    return i;
  },

  /**
   * 숫자 단위의 크기를 적절한 단위의 크기로 환산하기 index number
   * 'k', 'm', 'b', 't'
   * @param {Number} val
   */
  getFormatSizeIndex(val) {
    const k = 1000;
    const i = Math.floor(Math.log(Math.abs(val)) / Math.log(k));
    return i;
  },

  /**
   * percentage value 별 reder color
   * @param {Number} value
   */
  getRenderColor() {
    return "#28f528"; //green - 게이지 색깔 차등 둘 필요 있는경우 주석 제거
    // if (value <= consts.WARNING_CRITERIA.GOOD) {
    //   return "#28f528"; //green
    // } else if (value > consts.WARNING_CRITERIA.GOOD && value < consts.WARNING_CRITERIA.BAD) {
    //   return "#ffa500"; //orange
    // } else {
    //   return "#ff0000"; //red
    // }
  },

  /**
   * graph 의 tooltip 에 사용되는 날짜형식 formatter
   * @param {*} val
   */
  tooltipFormatter(val) {
    return timeUtil.getLocalTime(val, FORMAT_24);
  },

  /**
   * 3자리 수마다 , 추가
   * @param {Number} num
   * @param {Boolean} zeroTrim 소수점 아래 맨 뒤 0 제거
   */
  addComma(val, zeroTrim = false) {
    if (val == undefined) {
      return;
    }
    const regexp = /\B(?=(\d{3})+(?!\d))/g;
    const arr = val.toString().split(".");

    arr[0] = arr[0].replace(regexp, ",");
    if (zeroTrim && arr[1]) {
      arr[1] = arr[1].replace(/0*$/g, "");
      return arr.join(".").replace(/\.*$/g, "");
    } else {
      return arr.join(".");
    }
  },

  /**
   * json object key 값 존재여부 확인
   * @param {JSON} obj
   * @param {String} flatKeyString ex) foo.bar.val
   */
  checkValidKey(obj, flatKeyString) {
    if (!obj || Object.keys(obj).length < 1) {
      return false;
    }

    let rst = true;
    let prop = obj;
    flatKeyString.split(".").forEach(key => {
      if (prop[key] !== undefined) {
        prop = prop[key];
      } else {
        rst = false;
        return;
      }
    });
    return rst;
  },

  // datatable 컴포넌트에 검색 추가시 특정 헤더에 대해서만 검색하도록하는 커스텀 필터
  // searchHeader 에 검색 대상 header value 전달
  customFilter(value, search, item, searchHeader) {
    let valueIndex = Object.values(item).indexOf(value);
    let header = Object.keys(item)[valueIndex];
    if (header == searchHeader) {
      if (value.toUpperCase().indexOf(search.toUpperCase()) > -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },

  getHash(val) {
    return val
      ? crypto
          .createHash("sha512")
          .update(val)
          .digest("base64")
      : "";
  },

  setLocalStorage(key, value) {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  },
  getLocalStorage(key) {
    const data = localStorage.getItem(key);
    const rst = JSON.parse(data);
    return rst;
  },
  getDataTableSettings(key, header) {
    const dataTableSettings = this.getLocalStorage("dataTableSettings") || {};
    const settings = dataTableSettings[key] || {};
    return settings[header];
  },
  transText(items) {
    return items.map(item => {
      const transItem = _.cloneDeep(item);
      transItem.text = i18n.t(transItem.text);
      return transItem;
    });
  },

  deleteEmptyParams(params) {
    Object.keys(params).forEach(key => {
      if (params[key] === "" || params[key] === null || params[key] === undefined) delete params[key];
    });
  }
};
