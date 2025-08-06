"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "ScheduleModal",
  props: {
    newSchedule: {
      type: Object,
      default: () => ({ time: "", title: "" })
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => _ctx.$emit("hideScheduleDialog")),
        b: __props.newSchedule.time,
        c: common_vendor.o(($event) => __props.newSchedule.time = $event.detail.value),
        d: common_vendor.t(__props.newSchedule.time),
        e: common_vendor.t(__props.newSchedule.time),
        f: __props.newSchedule.time,
        g: __props.newSchedule.title,
        h: common_vendor.o(($event) => __props.newSchedule.title = $event.detail.value),
        i: common_vendor.o(($event) => _ctx.$emit("saveSchedule")),
        j: common_vendor.o(() => {
        }),
        k: common_vendor.o(($event) => _ctx.$emit("hideScheduleDialog"))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d3b87b29"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/life/components/ScheduleModal.js.map
