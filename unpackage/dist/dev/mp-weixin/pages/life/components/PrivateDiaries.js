"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _component_SvgIcon = common_vendor.resolveComponent("SvgIcon");
  _component_SvgIcon();
}
const _sfc_main = {
  __name: "PrivateDiaries",
  props: {
    diaries: {
      type: Array,
      default: () => []
    },
    getMoodEmoji: {
      type: Function,
      default: () => "icon-fabulous"
    }
  },
  setup(__props) {
    const isHover = ref(false);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.diaries, (diary, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(diary.title),
            b: "59850d4d-0-" + i0,
            c: common_vendor.p({
              iconClass: __props.getMoodEmoji(diary.mood),
              size: "24"
            }),
            d: common_vendor.n(`mood-${diary.mood}`),
            e: "59850d4d-1-" + i0,
            f: common_vendor.o(($event) => _ctx.$emit("showDiaryDialog"), diary.id),
            g: common_vendor.t(diary.date),
            h: common_vendor.t(diary.content),
            i: diary.tags.length > 0
          }, diary.tags.length > 0 ? {
            j: common_vendor.f(diary.tags, (tag, k1, i1) => {
              return {
                a: common_vendor.t(tag),
                b: tag
              };
            })
          } : {}, {
            k: diary.id,
            l: common_vendor.o(($event) => isHover.value = true, diary.id),
            m: common_vendor.o(($event) => isHover.value = false, diary.id)
          });
        }),
        b: common_vendor.p({
          iconClass: "icon-edit",
          size: "24"
        }),
        c: common_vendor.unref(isHover) ? 1 : "",
        d: common_vendor.p({
          iconClass: "icon-xieriji-copy",
          size: "24",
          color: "red"
        }),
        e: common_vendor.o(($event) => _ctx.$emit("showDiaryDialog"))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-59850d4d"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/life/components/PrivateDiaries.js.map
