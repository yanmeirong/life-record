"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "PublishModal",
  props: {
    newPost: {
      type: Object,
      default: () => ({ content: "", isPublic: true })
    }
  },
  setup(__props) {
    const chooseImage = async () => {
      try {
        const res = await common_vendor.index.chooseImage({
          count: 1,
          // 最多选择1张
          sizeType: ["original", "compressed"],
          // 原图/压缩图
          sourceType: ["album"]
          // 仅从相册选择
        });
        if (res.tempFilePaths.length) {
          const imagePath = res.tempFilePaths[0];
          common_vendor.index.__f__("log", "at pages/life/components/PublishModal.vue:67", "选择的图片路径：", imagePath);
          newPost.images = [imagePath];
        }
      } catch (err) {
        common_vendor.index.__f__("error", "at pages/life/components/PublishModal.vue:72", "选择图片失败：", err);
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => _ctx.$emit("hidePublishDialog")),
        b: __props.newPost.content,
        c: common_vendor.o(($event) => __props.newPost.content = $event.detail.value),
        d: common_vendor.o(chooseImage),
        e: __props.newPost.isPublic ? 1 : "",
        f: common_vendor.o(($event) => __props.newPost.isPublic = true),
        g: !__props.newPost.isPublic ? 1 : "",
        h: common_vendor.o(($event) => __props.newPost.isPublic = false),
        i: common_vendor.o(($event) => _ctx.$emit("publishPost")),
        j: common_vendor.o(() => {
        }),
        k: common_vendor.o(($event) => _ctx.$emit("hidePublishDialog"))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8646a732"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/life/components/PublishModal.js.map
