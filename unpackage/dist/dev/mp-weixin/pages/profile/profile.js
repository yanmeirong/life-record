"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_uni_popup_dialog = common_vendor.resolveComponent("uni-popup-dialog");
  const _component_uni_popup = common_vendor.resolveComponent("uni-popup");
  (_component_uni_popup_dialog + _component_uni_popup)();
}
const _sfc_main = {
  __name: "profile",
  setup(__props) {
    const stats = common_vendor.ref([
      { label: "动态", value: 28 },
      { label: "获赞", value: 156 },
      { label: "粉丝", value: 89 },
      { label: "关注", value: 42 }
    ]);
    const wishes = common_vendor.ref([
      { text: "打卡XX网红餐厅" },
      { text: "学会做红烧肉" },
      { text: "二个月瘦5斤" }
      // 修正原文"三个月"为图片中的"二个月"
    ]);
    const achievements = common_vendor.ref([
      { name: "美食达人", desc: "发布10篇美食打卡" },
      { name: "健康生活", desc: "连续记录健康数据30天" },
      { name: "社交达人", desc: "获得100个点赞" },
      { name: "探店专家", desc: "打卡50家不同餐厅" }
    ]);
    common_vendor.ref([
      { name: "生活", closable: true },
      { name: "打卡", closable: true },
      { name: "食谱", closable: false },
      { name: "我的", closable: false }
    ]);
    const currentMood = common_vendor.ref("happy");
    computed(() => {
      switch (currentMood.value) {
        case "happy":
          return "/static/happy.png";
        case "love":
          return "/static/love.png";
        case "neutral":
          return "/static/neutral.png";
        case "sad":
          return "/static/sad.png";
        default:
          return "";
      }
    });
    computed(() => {
      switch (currentMood.value) {
        case "happy":
          return "开心";
        case "love":
          return "喜爱";
        case "neutral":
          return "平淡";
        case "sad":
          return "难过";
        default:
          return "";
      }
    });
    const popup = common_vendor.ref(null);
    const showAddWishDialog = () => {
      popup.value.open();
    };
    const addWish = (text) => {
      if (text.trim()) {
        wishes.value.unshift({ text: text.trim() });
      }
    };
    const removeWish = (index) => {
      wishes.value.splice(index, 1);
    };
    common_vendor.onShow(() => {
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(stats.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.value),
            b: common_vendor.t(item.label),
            c: item.label
          };
        }),
        b: common_vendor.o(showAddWishDialog),
        c: common_vendor.f(wishes.value, (wish, index, i0) => {
          return {
            a: common_vendor.t(wish.text),
            b: common_vendor.o(($event) => removeWish(index), index),
            c: index
          };
        }),
        d: wishes.value.length === 0
      }, wishes.value.length === 0 ? {} : {}, {
        e: common_vendor.f(achievements.value, (badge, index, i0) => {
          return {
            a: common_vendor.t(badge.name),
            b: common_vendor.t(badge.desc),
            c: index
          };
        }),
        f: common_vendor.o(addWish),
        g: common_vendor.p({
          mode: "input",
          title: "添加愿望",
          placeholder: "请输入你的愿望"
        }),
        h: common_vendor.sr(popup, "dd383ca2-0", {
          "k": "popup"
        }),
        i: common_vendor.p({
          type: "dialog"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dd383ca2"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/profile/profile.js.map
