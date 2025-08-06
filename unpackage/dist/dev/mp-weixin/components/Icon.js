"use strict";
const common_vendor = require("../common/vendor.js");
if (!Array) {
  const _component_use = common_vendor.resolveComponent("use");
  const _component_svg = common_vendor.resolveComponent("svg");
  (_component_use + _component_svg)();
}
const _sfc_main = {
  __name: "Icon",
  props: {
    // 图标名称（对应 iconfont 中的 symbol id）
    iconName: {
      type: String,
      required: true,
      default: ""
    },
    // 自定义类名
    className: {
      type: String,
      default: ""
    },
    // 图标大小（支持数字型 rpx 或字符串型带单位）
    size: {
      type: [Number, String],
      default: 32
    },
    // 图标颜色
    color: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    const iconStyle = common_vendor.computed(() => {
      const style = {};
      if (typeof props.size === "number") {
        style.fontSize = `${props.size}rpx`;
      } else {
        style.fontSize = props.size;
      }
      if (props.color) {
        style.color = props.color;
      }
      return style;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["xlink:href"]: `#${__props.iconName}`
        }),
        b: common_vendor.n(__props.className),
        c: common_vendor.s(iconStyle.value),
        d: common_vendor.p({
          ["aria-hidden"]: "true"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ca7f3f1d"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/Icon.js.map
