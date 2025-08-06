"use strict";
const common_vendor = require("../common/vendor.js");
const baseURL = "http://127.0.0.1:5000";
class Request {
  constructor() {
    this.baseURL = baseURL;
    this.timeout = 1e4;
  }
  // 获取本地存储的token
  getToken() {
    return common_vendor.index.getStorageSync("token") || "";
  }
  request(options) {
    const token = this.getToken();
    const headers = {
      "Content-Type": "application/json",
      // 如果有token，添加到Authorization头（JWT标准格式）
      ...token ? { "Authorization": `Bearer ${token}` } : {},
      // 允许外部传入的header覆盖默认值
      ...options.header
    };
    return new Promise((resolve, reject) => {
      common_vendor.index.showLoading({
        title: "加载中...",
        mask: true
      });
      common_vendor.index.request({
        url: this.baseURL + options.url,
        method: options.method || "GET",
        data: options.data || {},
        header: headers,
        // 使用构建好的请求头
        timeout: this.timeout,
        success: (res) => {
          var _a;
          common_vendor.index.hideLoading();
          if (res.statusCode === 401) {
            common_vendor.index.removeStorageSync("token");
            common_vendor.index.showToast({
              title: "登录已过期，请重新登录",
              icon: "none"
            });
            setTimeout(() => {
              common_vendor.index.navigateTo({ url: "/pages/login/login" });
            }, 1500);
            reject("token已过期");
            return;
          }
          if (res.statusCode === 200) {
            resolve(res.data);
          } else {
            reject(res);
            common_vendor.index.showToast({
              title: ((_a = res.data) == null ? void 0 : _a.message) || "请求失败",
              icon: "none"
            });
          }
        },
        fail: (error) => {
          common_vendor.index.hideLoading();
          reject(error);
          common_vendor.index.showToast({
            title: "网络异常，请检查连接",
            icon: "none"
          });
        }
      });
    });
  }
  // 以下方法保持不变
  get(url, data, header) {
    return this.request({ url, method: "GET", data, header });
  }
  post(url, data, header) {
    return this.request({ url, method: "POST", data, header });
  }
  put(url, data, header) {
    return this.request({ url, method: "PUT", data, header });
  }
  delete(url, data, header) {
    return this.request({ url, method: "DELETE", data, header });
  }
}
const request = new Request();
exports.request = request;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/request.js.map
