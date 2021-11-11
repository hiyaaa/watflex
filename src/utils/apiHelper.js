import mock from "./mock";
import axios from "axios";
import Vue from "vue";

axios.interceptors.request.use(config => {
  return config;
});

axios.defaults.headers = {
  'Cache-Control': 'no-cache',
  'Pragma': 'no-cache',
  'Expires': '0',
};

export default {
  getMock(key) {
    const rst = mock[key];
    return rst;
  },

  async get(url, params) {
    try {
      const res = await axios.get(url, { params });
      return Promise.resolve(res.data.result);
    } catch (e) {
      const msg = e.response ? `${e.response.data.errorMsg}(code: ${e.response.data.errorCode})` : e;
      Vue.$alert.error(msg);
      return Promise.reject(msg);
    }
  },
  async post(url, params) {
    try {
      const res = await axios.post(url, params);
      return Promise.resolve(res.data.result);
    } catch (e) {
      const msg = e.response ? `${e.response.data.errorMsg}(code: ${e.response.data.errorCode})` : e;
      Vue.$alert.error(msg);
      return Promise.reject(msg);
    }
  },
  async postFileDown(url, params) {
    try {
      const res = await axios.post(url, params, { responseType: "blob" });

      const linkUrl = window.URL.createObjectURL(new Blob([res.data]));
      let fileName = res.headers["content-disposition"];
      if (fileName) {
        fileName = fileName.split(";")[1];
        fileName = fileName.split("=")[1].replace(/"/g, "'");
      } else {
        fileName = "filename";
      }

      const link = document.createElement("a");
      link.href = linkUrl;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();

      return Promise.resolve(res);
    } catch (e) {
      let resText = await new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.addEventListener("abort", reject);
        reader.addEventListener("error", reject);
        reader.addEventListener("loadend", () => {
          resolve(reader.result);
        });
        reader.readAsText(e.response.data);
      });
      const resData = JSON.parse(resText);
      Vue.$alert.error(resData.errorMsg);
      return Promise.reject(e);
    }
  },

  async put(url, params) {
    try {
      const res = await axios.put(url, params);
      return Promise.resolve(res.data.result);
    } catch (e) {
      const msg = e.response ? `${e.response.data.errorMsg}(code: ${e.response.data.errorCode})` : e;
      Vue.$alert.error(msg);
      return Promise.reject(msg);
    }
  },

  async patch(url, params) {
    try {
      const res = await axios.patch(url, params);
      return Promise.resolve(res.data.result);
    } catch (e) {
      const msg = e.response ? `${e.response.data.errorMsg}(code: ${e.response.data.errorCode})` : e;
      Vue.$alert.error(msg);
      return Promise.reject(msg);
    }
  },
  
  async delete(url, params) {
    try {
      const res = await axios.delete(url, { params });
      return Promise.resolve(res.data.result);
    } catch (e) {
      const msg = e.response ? `${e.response.data.errorMsg}(code: ${e.response.data.errorCode})` : e;
      Vue.$alert.error(msg);
      return Promise.reject(msg);
    }
  },

};
