"use strict";
const state = {
  foodPosts: [],
  topics: []
};
const mutations = {
  SET_FOOD_POSTS(state2, posts) {
    state2.foodPosts = posts;
  },
  ADD_FOOD_POST(state2, post) {
    state2.foodPosts.unshift(post);
  },
  SET_TOPICS(state2, topics) {
    state2.topics = topics;
  },
  UPDATE_FOOD_LIKE(state2, { id, isLiked }) {
    const post = state2.foodPosts.find((p) => p.id === id);
    if (post) {
      post.isLiked = isLiked;
      post.likes += isLiked ? 1 : -1;
    }
  },
  UPDATE_FOOD_BOOKMARK(state2, { id, isBookmarked }) {
    const post = state2.foodPosts.find((p) => p.id === id);
    if (post) {
      post.isBookmarked = isBookmarked;
    }
  }
};
const actions = {
  // 模拟获取美食打卡
  fetchFoodPosts({ commit }) {
    const mockPosts = [
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
    ];
    commit("SET_FOOD_POSTS", mockPosts);
  },
  // 添加美食打卡
  addFoodPost({ commit }, post) {
    commit("ADD_FOOD_POST", post);
  },
  // 模拟获取话题
  fetchTopics({ commit }) {
    const mockTopics = [
      {
        id: "1",
        name: "一周健康美食挑战",
        description: "分享你的健康美食搭配",
        participantCount: 1240,
        reward: "50积分 + 健康达人勋章"
      }
    ];
    commit("SET_TOPICS", mockTopics);
  },
  // 切换点赞状态
  toggleLike({ commit }, { id, isLiked }) {
    commit("UPDATE_FOOD_LIKE", { id, isLiked });
  },
  // 切换收藏状态
  toggleBookmark({ commit }, { id, isBookmarked }) {
    commit("UPDATE_FOOD_BOOKMARK", { id, isBookmarked });
  }
};
const food = {
  namespaced: true,
  state,
  mutations,
  actions
};
exports.food = food;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/store/modules/food.js.map
