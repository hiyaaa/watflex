const BASE_PATH = "/api";

export const API_URL = {
  DASHBOARD: {
    test: BASE_PATH + "/dashboard/test",
    test2: param => BASE_PATH + "/dashboard/test2/" + param,
  },
  DEVICES: {
    test: BASE_PATH + "/devices/test",
  },
};
