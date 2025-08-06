"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "TodaySchedule",
  props: {
    scheduleList: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => _ctx.$emit("showScheduleDialog")),
        b: common_vendor.f(__props.scheduleList, (item, k0, i0) => {
          return common_vendor.e({
            a: item.completed
          }, item.completed ? {} : {}, {
            b: common_vendor.o(($event) => _ctx.$emit("toggleSchedule", item.id), item.id),
            c: common_vendor.t(item.time),
            d: common_vendor.t(item.title),
            e: item.id,
            f: item.completed ? 1 : ""
          });
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-70bb329b"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/life/components/TodaySchedule.js.map
