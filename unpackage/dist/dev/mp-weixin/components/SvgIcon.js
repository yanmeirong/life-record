"use strict";
const common_vendor = require("../common/vendor.js");
if (!Array) {
  const _component_use = common_vendor.resolveComponent("use");
  const _component_svg = common_vendor.resolveComponent("svg");
  (_component_use + _component_svg)();
}
const _sfc_main = {
  __name: "SvgIcon",
  props: {
    iconClass: { type: String, required: true },
    // 传图标symbol名称，如 icon-home
    size: { type: [Number, String], default: 24 },
    color: { type: String, default: "" }
  },
  setup(__props) {
    const props = __props;
    const iconStyle = {
      width: props.size + "px",
      height: props.size + "px",
      color: props.color
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["xlink:href"]: `#${__props.iconClass}`
        }),
        b: common_vendor.s(iconStyle),
        c: common_vendor.p({
          ["aria-hidden"]: "true"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4c110535"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/SvgIcon.js.map
