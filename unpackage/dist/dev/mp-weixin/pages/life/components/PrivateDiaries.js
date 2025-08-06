"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "PrivateDiaries",
  props: {
    diaries: {
      type: Array,
      default: () => []
    },
    getMoodEmoji: {
      type: Function,
      default: () => "😊"
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.diaries, (diary, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(diary.title),
            b: common_vendor.t(__props.getMoodEmoji(diary.mood)),
            c: common_vendor.n(`mood-${diary.mood}`),
            d: common_vendor.t(diary.date),
            e: common_vendor.t(diary.content),
            f: diary.tags.length > 0
          }, diary.tags.length > 0 ? {
            g: common_vendor.f(diary.tags, (tag, k1, i1) => {
              return {
                a: common_vendor.t(tag),
                b: tag
              };
            })
          } : {}, {
            h: diary.id
          });
        }),
        b: common_vendor.o(($event) => _ctx.$emit("showDiaryDialog"))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-59850d4d"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/life/components/PrivateDiaries.js.map
