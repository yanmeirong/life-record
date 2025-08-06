"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "food",
  setup(__props) {
    const activeTab = common_vendor.ref("latest");
    const showCheckin = common_vendor.ref(false);
    const foodPosts = common_vendor.ref([
      {
        id: "1",
        author: "美食达人小王",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop&crop=face",
        restaurantName: "海底捞火锅",
        foodName: "川味麻辣锅",
        rating: 5,
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop",
        location: "北京市朝阳区",
        content: "服务真的太好了！麻辣锅底很正宗，配菜新鲜，强烈推荐给大家！",
        timestamp: "2小时前",
        likes: 24,
        comments: 8,
        isLiked: false,
        isBookmarked: false,
        tags: ["火锅", "川菜", "服务好"]
      }
    ]);
    const topics = common_vendor.ref([
      {
        id: "1",
        name: "一周健康美食挑战",
        description: "分享你的健康美食搭配",
        participantCount: 1240,
        reward: "50积分 + 健康达人勋章"
      }
    ]);
    const newCheckin = common_vendor.reactive({
      restaurantName: "",
      foodName: "",
      rating: 5,
      location: "",
      content: "",
      tags: ""
    });
    const filteredPosts = common_vendor.computed(() => {
      switch (activeTab.value) {
        case "hot":
          return [...foodPosts.value].sort((a, b) => b.likes - a.likes);
        case "nearby":
          return foodPosts.value.filter((post) => post.location.includes("北京"));
        default:
          return foodPosts.value;
      }
    });
    const switchTab = (tab) => {
      activeTab.value = tab;
    };
    const showCheckinDialog = () => {
      showCheckin.value = true;
    };
    const hideCheckinDialog = () => {
      showCheckin.value = false;
      Object.assign(newCheckin, {
        restaurantName: "",
        foodName: "",
        rating: 5,
        location: "",
        content: "",
        tags: ""
      });
    };
    const getLocation = () => {
      common_vendor.wx$1.getLocation({
        type: "gcj02",
        success: (res) => {
          newCheckin.location = `纬度${res.latitude}，经度${res.longitude}`;
          common_vendor.wx$1.showToast({ title: "定位成功", icon: "success" });
        },
        fail: () => {
          common_vendor.wx$1.showToast({ title: "定位失败", icon: "none" });
        }
      });
    };
    const submitCheckin = () => {
      if (!newCheckin.restaurantName || !newCheckin.foodName) {
        common_vendor.wx$1.showToast({ title: "请填写餐厅和美食名称", icon: "none" });
        return;
      }
      const checkin = {
        id: Date.now().toString(),
        author: "我",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
        restaurantName: newCheckin.restaurantName,
        foodName: newCheckin.foodName,
        rating: newCheckin.rating,
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
        location: newCheckin.location,
        content: newCheckin.content,
        timestamp: "刚刚",
        likes: 0,
        comments: 0,
        isLiked: false,
        isBookmarked: false,
        tags: newCheckin.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag)
      };
      foodPosts.value.unshift(checkin);
      hideCheckinDialog();
      common_vendor.wx$1.showToast({ title: "打卡成功", icon: "success" });
    };
    const toggleLike = (postId) => {
      const post = foodPosts.value.find((p) => p.id === postId);
      if (post) {
        post.isLiked = !post.isLiked;
        post.likes += post.isLiked ? 1 : -1;
      }
    };
    const toggleBookmark = (postId) => {
      const post = foodPosts.value.find((p) => p.id === postId);
      if (post) {
        post.isBookmarked = !post.isBookmarked;
        common_vendor.wx$1.showToast({
          title: post.isBookmarked ? "收藏成功" : "取消收藏",
          icon: "success"
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(showCheckinDialog),
        b: activeTab.value === "latest" ? 1 : "",
        c: common_vendor.o(($event) => switchTab("latest")),
        d: activeTab.value === "hot" ? 1 : "",
        e: common_vendor.o(($event) => switchTab("hot")),
        f: activeTab.value === "nearby" ? 1 : "",
        g: common_vendor.o(($event) => switchTab("nearby")),
        h: activeTab.value === "topics" ? 1 : "",
        i: common_vendor.o(($event) => switchTab("topics")),
        j: activeTab.value !== "topics"
      }, activeTab.value !== "topics" ? {
        k: common_vendor.f(filteredPosts.value, (post, k0, i0) => {
          return common_vendor.e({
            a: post.image,
            b: common_vendor.f(5, (i, k1, i1) => {
              return {
                a: i,
                b: i <= post.rating ? 1 : ""
              };
            }),
            c: common_vendor.t(post.foodName),
            d: common_vendor.t(post.restaurantName),
            e: post.avatar,
            f: common_vendor.t(post.author),
            g: common_vendor.t(post.location),
            h: common_vendor.t(post.timestamp),
            i: common_vendor.t(post.content),
            j: post.tags.length > 0
          }, post.tags.length > 0 ? {
            k: common_vendor.f(post.tags, (tag, k1, i1) => {
              return {
                a: common_vendor.t(tag),
                b: tag
              };
            })
          } : {}, {
            l: common_vendor.t(post.likes),
            m: post.isLiked ? 1 : "",
            n: common_vendor.o(($event) => toggleLike(post.id), post.id),
            o: common_vendor.t(post.comments),
            p: common_vendor.o(($event) => _ctx.showComments(post.id), post.id),
            q: post.isBookmarked ? 1 : "",
            r: common_vendor.o(($event) => toggleBookmark(post.id), post.id),
            s: post.id
          });
        })
      } : {
        l: common_vendor.f(topics.value, (topic, k0, i0) => {
          return {
            a: common_vendor.t(topic.name),
            b: common_vendor.t(topic.description),
            c: common_vendor.t(topic.participantCount),
            d: common_vendor.t(topic.reward),
            e: topic.id
          };
        })
      }, {
        m: showCheckin.value
      }, showCheckin.value ? {
        n: common_vendor.o(hideCheckinDialog),
        o: newCheckin.restaurantName,
        p: common_vendor.o(($event) => newCheckin.restaurantName = $event.detail.value),
        q: newCheckin.foodName,
        r: common_vendor.o(($event) => newCheckin.foodName = $event.detail.value),
        s: common_vendor.f(5, (i, k0, i0) => {
          return {
            a: i,
            b: i <= newCheckin.rating ? 1 : "",
            c: common_vendor.o(($event) => newCheckin.rating = i, i)
          };
        }),
        t: newCheckin.location,
        v: common_vendor.o(($event) => newCheckin.location = $event.detail.value),
        w: common_vendor.o(getLocation),
        x: newCheckin.content,
        y: common_vendor.o(($event) => newCheckin.content = $event.detail.value),
        z: newCheckin.tags,
        A: common_vendor.o(($event) => newCheckin.tags = $event.detail.value),
        B: common_vendor.o(submitCheckin),
        C: common_vendor.o(() => {
        }),
        D: common_vendor.o(hideCheckinDialog)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b2742bb6"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/food/food.js.map
