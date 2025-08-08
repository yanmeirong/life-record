"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_wechat = require("../../../utils/wechat.js");
if (!Array) {
  const _component_SvgIcon = common_vendor.resolveComponent("SvgIcon");
  _component_SvgIcon();
}
const _sfc_main = {
  __name: "PublicPosts",
  props: {
    posts: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const handleShare = (post) => {
      utils_wechat.showActionSheet({
        itemList: ["分享给微信好友", "分享到朋友圈", "保存图片"],
        success: (res) => {
          switch (res.tapIndex) {
            case 0:
              shareToWechatFriend(post);
              break;
            case 1:
              shareToTimeline(post);
              break;
            case 2:
              $emit("savePostImage", post.id);
              break;
          }
        }
      });
    };
    const shareToWechatFriend = (post) => {
      utils_wechat.shareAppMessage({
        title: `${post.author}的动态`,
        path: `/pages/post/detail?id=${post.id}`,
        imageUrl: post.images && post.images.length > 0 ? post.images[0] : "",
        success: () => {
          common_vendor.index.__f__("log", "at pages/life/components/PublicPosts.vue:91", "分享成功");
        },
        fail: (err) => {
          common_vendor.index.__f__("log", "at pages/life/components/PublicPosts.vue:94", "分享失败", err);
        }
      });
    };
    const shareToTimeline = (post) => {
      common_vendor.wx$1.updateShareMenu({
        withShareTicket: true,
        isTimelineShare: true
      });
      common_vendor.wx$1.shareTimeline({
        title: `${post.author}的动态: ${post.content.substring(0, 20)}...`,
        query: `id=${post.id}`,
        imageUrl: post.images && post.images.length > 0 ? post.images[0] : "",
        success: () => {
          common_vendor.index.__f__("log", "at pages/life/components/PublicPosts.vue:112", "朋友圈分享成功");
        },
        fail: (err) => {
          common_vendor.index.__f__("log", "at pages/life/components/PublicPosts.vue:115", "朋友圈分享失败", err);
        }
      });
    };
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
            g: "b11b0ef8-0-" + i0,
            h: common_vendor.p({
              iconClass: post.isLiked ? "icon-dianzan1" : "icon-fabulous",
              size: "24"
            }),
            i: common_vendor.t(post.likes),
            j: post.isLiked ? 1 : "",
            k: common_vendor.o(($event) => _ctx.$emit("toggleLike", post.id), post.id),
            l: "b11b0ef8-1-" + i0,
            m: common_vendor.t(post.comments),
            n: common_vendor.o(($event) => _ctx.$emit("showComments", post.id), post.id),
            o: "b11b0ef8-2-" + i0,
            p: common_vendor.o(($event) => handleShare(post), post.id),
            q: post.id
          });
        }),
        b: common_vendor.p({
          iconClass: "icon-comments",
          size: "24"
        }),
        c: common_vendor.p({
          iconClass: "icon-share",
          size: "16"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b11b0ef8"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/life/components/PublicPosts.js.map
