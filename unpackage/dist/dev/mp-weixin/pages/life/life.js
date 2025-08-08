"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
if (!Math) {
  (LifeHeader + PublicPosts + PrivateDiaries + TodaySchedule + PublishModal + DiaryModal + ScheduleModal)();
}
const LifeHeader = () => "./components/LifeHeader.js";
const PublicPosts = () => "./components/PublicPosts.js";
const PrivateDiaries = () => "./components/PrivateDiaries.js";
const TodaySchedule = () => "./components/TodaySchedule.js";
const PublishModal = () => "./components/PublishModal.js";
const DiaryModal = () => "./components/DiaryModal.js";
const ScheduleModal = () => "./components/ScheduleModal.js";
const _sfc_main = {
  __name: "life",
  setup(__props) {
    const activeTab = common_vendor.ref("public");
    const showPublish = common_vendor.ref(false);
    const showDiary = common_vendor.ref(false);
    const showSchedule = common_vendor.ref(false);
    common_vendor.ref(false);
    const publicPosts = common_vendor.ref([]);
    const privateDiaries = common_vendor.ref([
      // {
      //   id: '1',
      //   date: '2024-01-15',
      //   title: '美好的一天',
      //   content: '今天心情特别好，完成了很多事情。和朋友聊天很开心，感觉生活充满了希望。',
      //   mood: 'happy',
      //   tags: ['朋友', '开心', '充实']
      // },
      // {
      //   id: '2',
      //   date: '2024-01-14',
      //   title: '平静的思考',
      //   content: '今天工作比较忙，但晚上有时间静下来思考一些事情。生活需要平衡。',
      //   mood: 'neutral',
      //   tags: ['工作', '平衡', '思考']
      // }
    ]);
    const todaySchedule = common_vendor.ref([
      // { id: '1', time: '09:00', title: '晨间瑜伽', completed: true },
      // { id: '2', time: '10:30', title: '团队会议', completed: true },
      // { id: '3', time: '14:00', title: '和朋友喝咖啡', completed: false },
      // { id: '4', time: '19:00', title: '阅读时间', completed: false }
    ]);
    const newPost = common_vendor.reactive({ content: "", isPublic: true });
    const newDiary = common_vendor.reactive({ title: "", content: "", mood: "happy", tags: "" });
    const newSchedule = common_vendor.reactive({ time: "", title: "" });
    const moodOptions = [
      { value: "happy", emoji: "😊", emojiIcon: "icon-a-smile" },
      { value: "love", emoji: "❤️", emojiIcon: "icon-a-smile" },
      { value: "angry", emoji: "😐", emojiIcon: "icon-a-angry" },
      { value: "sad", emoji: "😢", emojiIcon: "icon-a-cry" }
    ];
    const switchTab = (tab) => {
      activeTab.value = tab;
      switch (tab) {
        case "public":
          getPublicPosts(1);
          break;
        case "private":
          getPrivateDiaries(1);
          break;
        case "schedule":
          getTodaySchedules(1);
          break;
      }
    };
    const showPublishDialog = () => showPublish.value = true;
    const hidePublishDialog = () => {
      showPublish.value = false;
      newPost.content = "";
    };
    const showDiaryDialog = () => showDiary.value = true;
    const hideDiaryDialog = () => {
      showDiary.value = false;
      Object.assign(newDiary, { title: "", content: "", mood: "happy", tags: "" });
    };
    const showScheduleDialog = () => showSchedule.value = true;
    const hideScheduleDialog = () => {
      showSchedule.value = false;
      Object.assign(newSchedule, { time: "", title: "" });
    };
    common_vendor.onMounted(() => {
      getPublicPosts(1);
    });
    const total = common_vendor.ref(0);
    const getPublicPosts = async (currentPage) => {
      try {
        const params = {
          page: currentPage,
          size: 10
        };
        const res = await utils_request.request.get("/api/v1/life/posts", { params });
        if (res.code === 200) {
          publicPosts.value = res.data.posts;
          total.value = res.data.total;
        } else {
          common_vendor.index.showToast({
            title: "获取数据失败"
          });
        }
      } catch (error) {
        common_vendor.index.showToast({ title: "网络错误", icon: "none" });
      }
    };
    const publishPost = async () => {
      if (!newPost.content.trim())
        return common_vendor.wx$1.showToast({ title: "请输入内容", icon: "none" });
      const params = {
        id: Date.now().toString(),
        author: "我",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
        content: newPost.content,
        timestamp: "刚刚",
        likes: 0,
        comments: 0,
        isLiked: false
      };
      await utils_request.request.post("/api/v1/life/posts", params);
      hidePublishDialog();
      common_vendor.wx$1.showToast({ title: "发布成功", icon: "success" });
      getPublicPosts();
    };
    const getPrivateDiaries = async (currentPage) => {
      try {
        const params = {
          page: currentPage,
          size: 10
        };
        const res = await utils_request.request.get("/api/v1/life/diaries", { params });
        if (res.code === 200) {
          privateDiaries.value = res.data.diaries;
        } else {
          common_vendor.index.showToast({
            title: "获取数据失败"
          });
        }
      } catch (error) {
        common_vendor.index.showToast({ title: "网络错误", icon: "none" });
      }
    };
    const saveDiary = async () => {
      if (!newDiary.title.trim() || !newDiary.content.trim())
        return common_vendor.wx$1.showToast({ title: "请填写标题和内容", icon: "none" });
      const params = {
        id: Date.now().toString(),
        date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        ...newDiary,
        tags: newDiary.tags
        //newDiary.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };
      await utils_request.request.post("/api/v1/life/diaries", params);
      hideDiaryDialog();
      common_vendor.wx$1.showToast({ title: "保存成功", icon: "success" });
      getPrivateDiaries();
    };
    const getTodaySchedules = async (currentPage) => {
      try {
        const params = {
          page: currentPage,
          size: 10
        };
        const res = await utils_request.request.get("/api/v1/life/schedules", { params });
        if (res.code === 200) {
          todaySchedule.value = res.data.schedules;
        } else {
          common_vendor.index.showToast({
            title: "获取数据失败"
          });
        }
      } catch (error) {
        common_vendor.index.showToast({ title: "网络错误", icon: "none" });
      }
    };
    const saveSchedule = async () => {
      if (!newSchedule.time.trim() || !newSchedule.title.trim())
        return common_vendor.wx$1.showToast({ title: "请填写时间和事项", icon: "none" });
      const params = { ...newSchedule, id: Date.now().toString(), completed: false };
      await utils_request.request.post("/api/v1/life/schedules", params);
      hideScheduleDialog();
      common_vendor.wx$1.showToast({ title: "添加成功", icon: "success" });
      getTodaySchedules();
    };
    const toggleLike = (postId) => {
      const post = publicPosts.value.find((p) => p.id === postId);
      if (post) {
        post.isLiked = !post.isLiked;
        post.likes += post.isLiked ? 1 : -1;
      }
    };
    const toggleSchedule = async (scheduleId) => {
      try {
        const item = todaySchedule.value.find((s) => s.id === scheduleId);
        if (!item) {
          common_vendor.index.__f__("error", "at pages/life/life.vue:274", "未找到对应的行程项");
          common_vendor.index.showToast({ title: "数据异常", icon: "none" });
          return;
        }
        const originalCompleted = item.completed;
        item.loading = true;
        const res = await utils_request.request.put(`/api/v1/life/schedules/${scheduleId}/complete`);
        if (res && res.code === 200) {
          item.completed = res.data.completed;
          common_vendor.index.showToast({ title: "更新成功", icon: "success" });
        } else {
          item.completed = originalCompleted;
          common_vendor.index.showToast({
            title: (res == null ? void 0 : res.message) || "更新失败",
            icon: "none"
          });
        }
      } catch (error) {
        const item = todaySchedule.value.find((s) => s.id === scheduleId);
        if (item) {
          item.completed = !item.completed;
          item.loading = false;
        }
        let errorMsg = "网络异常，请稍后重试";
        if (error.message.includes("404")) {
          errorMsg = "接口不存在";
        } else if (error.message.includes("401")) {
          errorMsg = "请先登录";
        } else if (error.message.includes("500")) {
          errorMsg = "服务器错误";
        }
        common_vendor.index.showToast({ title: errorMsg, icon: "none" });
        common_vendor.index.__f__("error", "at pages/life/life.vue:320", "切换行程状态失败:", error);
      } finally {
        const item = todaySchedule.value.find((s) => s.id === scheduleId);
        if (item) {
          item.loading = false;
        }
      }
    };
    const getMoodEmoji = (mood) => {
      const option = moodOptions.find((o) => o.value === mood);
      return option ? option.emojiIcon : "icon-a-smile";
    };
    const showComments = (postId) => common_vendor.index.__f__("log", "at pages/life/life.vue:336", "查看评论:", postId);
    const sharePost = (postId) => common_vendor.index.__f__("log", "at pages/life/life.vue:337", "分享动态:", postId);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(switchTab),
        b: common_vendor.o(showPublishDialog),
        c: common_vendor.p({
          activeTab: activeTab.value
        }),
        d: activeTab.value === "public"
      }, activeTab.value === "public" ? {
        e: common_vendor.o(toggleLike),
        f: common_vendor.o(showComments),
        g: common_vendor.o(sharePost),
        h: common_vendor.p({
          posts: publicPosts.value
        })
      } : activeTab.value === "private" ? {
        j: common_vendor.o(showDiaryDialog),
        k: common_vendor.p({
          diaries: privateDiaries.value,
          getMoodEmoji
        })
      } : activeTab.value === "schedule" ? {
        m: common_vendor.o(toggleSchedule),
        n: common_vendor.o(showScheduleDialog),
        o: common_vendor.p({
          scheduleList: todaySchedule.value
        })
      } : {}, {
        i: activeTab.value === "private",
        l: activeTab.value === "schedule",
        p: showPublish.value
      }, showPublish.value ? {
        q: common_vendor.o(hidePublishDialog),
        r: common_vendor.o(publishPost),
        s: common_vendor.p({
          newPost
        })
      } : {}, {
        t: showDiary.value
      }, showDiary.value ? {
        v: common_vendor.o(hideDiaryDialog),
        w: common_vendor.o(saveDiary),
        x: common_vendor.p({
          newDiary,
          moodOptions
        })
      } : {}, {
        y: showSchedule.value
      }, showSchedule.value ? {
        z: common_vendor.o(hideScheduleDialog),
        A: common_vendor.o(saveSchedule),
        B: common_vendor.p({
          newSchedule
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c9b3d7a8"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/life/life.js.map
