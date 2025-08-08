"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _component_SvgIcon = common_vendor.resolveComponent("SvgIcon");
  _component_SvgIcon();
}
const _sfc_main = {
  __name: "DiaryModal",
  props: {
    newDiary: {
      type: Object,
      default: () => ({ title: "", content: "", mood: "happy", tags: "" })
    },
    moodOptions: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => _ctx.$emit("hideDiaryDialog")),
        b: __props.newDiary.title,
        c: common_vendor.o(($event) => __props.newDiary.title = $event.detail.value),
        d: common_vendor.f(__props.moodOptions, (mood, k0, i0) => {
          return {
            a: "994740f3-0-" + i0,
            b: common_vendor.p({
              iconClass: mood.emojiIcon,
              size: "24"
            }),
            c: mood.value,
            d: __props.newDiary.mood === mood.value ? 1 : "",
            e: common_vendor.o(($event) => __props.newDiary.mood = mood.value, mood.value)
          };
        }),
        e: __props.newDiary.content,
        f: common_vendor.o(($event) => __props.newDiary.content = $event.detail.value),
        g: __props.newDiary.tags,
        h: common_vendor.o(($event) => __props.newDiary.tags = $event.detail.value),
        i: common_vendor.o(($event) => _ctx.$emit("saveDiary")),
        j: common_vendor.o(() => {
        }),
        k: common_vendor.o(($event) => _ctx.$emit("hideDiaryDialog"))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-994740f3"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/life/components/DiaryModal.js.map
