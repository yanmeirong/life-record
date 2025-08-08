"use strict";
const common_vendor = require("../common/vendor.js");
const showActionSheet = (options) => {
  return new Promise((resolve, reject) => {
    common_vendor.wx$1.showActionSheet({
      itemList: options.itemList || [],
      itemColor: options.itemColor || "#000000",
      success: (res) => {
        options.success && options.success(res);
        resolve(res);
      },
      fail: (err) => {
        options.fail && options.fail(err);
        reject(err);
      },
      complete: options.complete
    });
  });
};
const shareAppMessage = (options) => {
  return new Promise((resolve, reject) => {
    common_vendor.wx$1.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage"]
    });
    resolve();
  });
};
exports.shareAppMessage = shareAppMessage;
exports.showActionSheet = showActionSheet;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/wechat.js.map
