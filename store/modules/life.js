const state = {
  publicPosts: [],
  privateDiaries: [],
  todaySchedule: []
}

const mutations = {
  SET_PUBLIC_POSTS(state, posts) {
    state.publicPosts = posts
  },
  ADD_PUBLIC_POST(state, post) {
    state.publicPosts.unshift(post)
  },
  SET_PRIVATE_DIARIES(state, diaries) {
    state.privateDiaries = diaries
  },
  ADD_PRIVATE_DIARY(state, diary) {
    state.privateDiaries.unshift(diary)
  },
  SET_TODAY_SCHEDULE(state, schedule) {
    state.todaySchedule = schedule
  },
  UPDATE_SCHEDULE_STATUS(state, { id, completed }) {
    const item = state.todaySchedule.find(i => i.id === id)
    if (item) {
      item.completed = completed
    }
  }
}

const actions = {
  // 模拟获取公开动态
  fetchPublicPosts({ commit }) {
    // 实际项目中替换为API请求
    const mockPosts = [
      {
        id: '1',
        author: '小明',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop&crop=face',
        content: '今天天气真好，和朋友们一起去公园野餐！生活太美好了 🌸',
        images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'],
        timestamp: '2小时前',
        likes: 12,
        comments: 3,
        isLiked: false
      }
    ]
    commit('SET_PUBLIC_POSTS', mockPosts)
  },
  
  // 添加公开动态
  addPublicPost({ commit }, post) {
    commit('ADD_PUBLIC_POST', post)
  },
  
  // 模拟获取私密日记
  fetchPrivateDiaries({ commit }) {
    const mockDiaries = [
      {
        id: '1',
        date: '2024-01-15',
        title: '美好的一天',
        content: '今天心情特别好，完成了很多事情。和朋友聊天很开心，感觉生活充满了希望。',
        mood: 'happy',
        tags: ['朋友', '开心', '充实']
      }
    ]
    commit('SET_PRIVATE_DIARIES', mockDiaries)
  },
  
  // 添加私密日记
  addPrivateDiary({ commit }, diary) {
    commit('ADD_PRIVATE_DIARY', diary)
  },
  
  // 模拟获取今日行程
  fetchTodaySchedule({ commit }) {
    const mockSchedule = [
      { id: '1', time: '09:00', title: '晨间瑜伽', completed: true },
      { id: '2', time: '10:30', title: '团队会议', completed: true },
      { id: '3', time: '14:00', title: '和朋友喝咖啡', completed: false }
    ]
    commit('SET_TODAY_SCHEDULE', mockSchedule)
  },
  
  // 更新行程状态
  updateScheduleStatus({ commit }, payload) {
    commit('UPDATE_SCHEDULE_STATUS', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}