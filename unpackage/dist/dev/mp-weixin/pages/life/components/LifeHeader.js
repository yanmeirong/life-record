"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "LifeHeader",
  props: {
    activeTab: {
      type: String,
      default: "public"
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => _ctx.$emit("showPublishDialog")),
        b: __props.activeTab === "public" ? 1 : "",
        c: common_vendor.o(($event) => _ctx.$emit("switchTab", "public")),
        d: __props.activeTab === "private" ? 1 : "",
        e: common_vendor.o(($event) => _ctx.$emit("switchTab", "private")),
        f: __props.activeTab === "schedule" ? 1 : "",
        g: common_vendor.o(($event) => _ctx.$emit("switchTab", "schedule"))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-01333ea5"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/life/components/LifeHeader.js.map
