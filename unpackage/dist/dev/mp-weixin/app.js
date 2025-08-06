"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const store_index = require("./store/index.js");
if (!Math) {
  "./pages/life/life.js";
  "./pages/food/food.js";
  "./pages/profile/profile.js";
  "./pages/login/login.js";
}
if (!Array) {
  const _component_router_view = common_vendor.resolveComponent("router-view");
  _component_router_view();
}
const _sfc_main = {
  __name: "App",
  setup(__props) {
    const store = common_vendor.useStore();
    common_vendor.onLaunch(() => {
      common_vendor.index.__f__("log", "at App.vue:14", "App launched");
      initUserInfo();
    });
    common_vendor.onShow(() => {
      common_vendor.index.__f__("log", "at App.vue:20", "App showed");
    });
    common_vendor.onHide(() => {
      common_vendor.index.__f__("log", "at App.vue:24", "App hide");
    });
    const initUserInfo = () => {
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      common_vendor.index.__f__("log", "at App.vue:29", userInfo, "userInfo");
      if (userInfo) {
        store.dispatch("user/setUserInfo", userInfo);
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/login/login"
        });
      }
    };
    return (_ctx, _cache) => {
      return {};
    };
  }
};
const Icon = () => "./components/Icon.js";
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.use(store_index.store);
  app.component("Icon", Icon);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
