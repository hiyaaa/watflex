import commonUtil from "@/utils/commonUtil";
import timeUtil from "@/utils/timeUtil";
import apiHelper from "@/utils/apiHelper";
import { API_URL } from "@/constants/api";

export default {
  data: () => {
    return {
      commonUtil: commonUtil,
      timeUtil: timeUtil,
      apiHelper: apiHelper,
      apiUrl: API_URL
    };
  }
};
