"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "PublicPosts",
  props: {
    posts: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.posts, (post, k0, i0) => {
          return common_vendor.e({
            a: post.avatar,
            b: common_vendor.t(post.author),
            c: common_vendor.t(post.timestamp),
            d: common_vendor.t(post.content),
            e: post.images && post.images.length > 0
          }, post.images && post.images.length > 0 ? {
            f: post.images[0]
          } : {}, {
            g: common_vendor.t(post.likes),
            h: post.isLiked ? 1 : "",
            i: common_vendor.o(($event) => _ctx.$emit("toggleLike", post.id), post.id),
            j: common_vendor.t(post.comments),
            k: common_vendor.o(($event) => _ctx.$emit("showComments", post.id), post.id),
            l: common_vendor.o(($event) => _ctx.$emit("sharePost", post.id), post.id),
            m: post.id
          });
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b11b0ef8"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/life/components/PublicPosts.js.map
