import moment from "moment-timezone";

export const FORMAT_24 = "YYYY-MM-DD HH:mm:ss";
export const FORMAT_24_MILLIS = "YYYY-MM-DD HH:mm:ss.SSS";
export const FORMAT_AMPM = "YYYY-MM-DD hh:mm:ss A";
export const FORMAT_EPOCH_MILLIS = "x";
export const FORMAT_ISO = "YYYY-MM-DDTHH:mm:ss.SSSZ";
export const DEFAULT_FORMAT = FORMAT_24;

// const FORMATS
export const FORMATS = [
  FORMAT_24,
  FORMAT_24,
  FORMAT_24_MILLIS,
  DEFAULT_FORMAT,
  FORMAT_AMPM,
  FORMAT_ISO,
  moment.ISO_8601,
  FORMAT_EPOCH_MILLIS
];

//LATEST TIME 추가시 convertToISO() 에 case 문 추가필요
export const LATEST_TIME = {
  NOW: "now",
  MIN_5: "now-5m",
  MIN_15: "now-15m",
  MIN_30: "now-30m",
  HOUR_1: "now-1h",
  HOUR_24: "now-24h",
  DAY_7: "now-7d",
  DAY_14: "now-14d",
  MTH_1: "now-1M"
};

export const RANGE_LIST = [
  { text: "const.last1h", value: LATEST_TIME.HOUR_1 },
  { text: "const.last24h", value: LATEST_TIME.HOUR_24 },
  { text: "const.last7d", value: LATEST_TIME.DAY_7 },
  { text: "const.last14d", value: LATEST_TIME.DAY_14 }
];
