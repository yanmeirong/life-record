<template>
  <view class="food-container">
    <!-- 头部区域 -->
    <view class="header-section">
      <view class="header-content">
        <view class="header-text">
          <text class="title">美食打卡</text>
          <text class="subtitle">发现美食，分享快乐</text>
        </view>
        <button class="checkin-btn" @tap="showCheckinDialog">
          <text class="iconfont icon-camera"></text>
          打卡
        </button>
      </view>
      
      <!-- 标签页 -->
      <view class="tabs-container">
        <view class="tabs">
          <view 
            class="tab-item"
            :class="{ active: activeTab === 'latest' }"
            @tap="switchTab('latest')"
          >
            最新
          </view>
          <view 
            class="tab-item"
            :class="{ active: activeTab === 'hot' }"
            @tap="switchTab('hot')"
          >
            热门
          </view>
          <view 
            class="tab-item"
            :class="{ active: activeTab === 'nearby' }"
            @tap="switchTab('nearby')"
          >
            附近
          </view>
          <view 
            class="tab-item"
            :class="{ active: activeTab === 'topics' }"
            @tap="switchTab('topics')"
          >
            话题
          </view>
        </view>
      </view>
    </view>

    <!-- 内容区域 -->
    <view class="content-section">
      <!-- 美食打卡列表 -->
      <view v-if="activeTab !== 'topics'" class="tab-content">
        <view 
          v-for="post in filteredPosts" 
          :key="post.id"
          class="food-card"
        >
          <!-- 美食图片 -->
          <view class="food-image-container">
            <image class="food-image" :src="post.image" mode="aspectFill" />
            <view class="rating-overlay">
              <view class="stars">
                <text 
                  v-for="i in 5" 
                  :key="i"
                  class="star"
                  :class="{ filled: i <= post.rating }"
                >
                  ★
                </text>
              </view>
            </view>
            <view class="food-title-overlay">
              <text class="food-name">{{ post.foodName }}</text>
              <text class="restaurant-name">{{ post.restaurantName }}</text>
            </view>
          </view>
          
          <!-- 用户信息和内容 -->
          <view class="card-content">
            <view class="user-info">
              <image class="user-avatar" :src="post.avatar" />
              <view class="user-details">
                <text class="username">{{ post.author }}</text>
                <view class="location">
                  <text class="iconfont icon-location"></text>
                  <text class="location-text">{{ post.location }}</text>
                </view>
              </view>
              <text class="timestamp">{{ post.timestamp }}</text>
            </view>
            
            <text class="post-content">{{ post.content }}</text>
            
            <!-- 标签 -->
            <view v-if="post.tags.length > 0" class="tags">
              <text 
                v-for="tag in post.tags"
                :key="tag"
                class="tag"
              >
                # {{ tag }}
              </text>
            </view>
            
            <!-- 互动按钮 -->
            <view class="actions">
              <view 
                class="action-item"
                :class="{ liked: post.isLiked }"
                @tap="toggleLike(post.id)"
              >
                <text class="iconfont icon-heart"></text>
                <text>{{ post.likes }}</text>
              </view>
              <view class="action-item" @tap="showComments(post.id)">
                <text class="iconfont icon-comment"></text>
                <text>{{ post.comments }}</text>
              </view>
              <view 
                class="action-item"
                :class="{ bookmarked: post.isBookmarked }"
                @tap="toggleBookmark(post.id)"
              >
                <text class="iconfont icon-bookmark"></text>
                <text>收藏</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 话题活动 -->
      <view v-else class="tab-content">
        <view 
          v-for="topic in topics"
          :key="topic.id"
          class="topic-card"
        >
          <text class="topic-title">{{ topic.name }}</text>
          <text class="topic-description">{{ topic.description }}</text>
          <view class="topic-stats">
            <text>{{ topic.participantCount }} 人参与</text>
            <text>奖励: {{ topic.reward }}</text>
          </view>
          <button class="join-topic-btn">参与话题</button>
        </view>
      </view>
    </view>

    <!-- 美食打卡弹窗 -->
    <view v-if="showCheckin" class="modal-overlay" @tap="hideCheckinDialog">
      <view class="modal-content checkin-modal" @tap.stop>
        <view class="modal-header">
          <text class="modal-title">美食打卡</text>
          <text class="close-btn" @tap="hideCheckinDialog">×</text>
        </view>
        
        <view class="form-group">
          <text class="label">餐厅名称</text>
          <input 
            class="form-input"
            placeholder="请输入餐厅名称"
            v-model="newCheckin.restaurantName"
          />
        </view>
        
        <view class="form-group">
          <text class="label">美食名称</text>
          <input 
            class="form-input"
            placeholder="请输入美食名称"
            v-model="newCheckin.foodName"
          />
        </view>
        
        <view class="form-group">
          <text class="label">评分</text>
          <view class="rating-selector">
            <text 
              v-for="i in 5"
              :key="i"
              class="rating-star"
              :class="{ active: i <= newCheckin.rating }"
              @tap="newCheckin.rating = i"
            >
              ★
            </text>
          </view>
        </view>
        
        <view class="form-group">
          <text class="label">地理位置</text>
          <view class="location-input">
            <input 
              class="form-input"
              placeholder="餐厅地址或位置"
              v-model="newCheckin.location"
            />
            <button class="location-btn" @tap="getLocation">定位</button>
          </view>
        </view>
        
        <view class="form-group">
          <text class="label">打卡描述</text>
          <textarea 
            class="form-textarea"
            placeholder="分享你的用餐感受..."
            v-model="newCheckin.content"
          />
        </view>
        
        <view class="form-group">
          <text class="label">标签</text>
          <input 
            class="form-input"
            placeholder="用逗号分隔，如：川菜, 火锅, 麻辣"
            v-model="newCheckin.tags"
          />
        </view>
        
        <button class="confirm-btn" @tap="submitCheckin">发布打卡</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

// 响应式数据
const activeTab = ref('latest')
const showCheckin = ref(false)

const foodPosts = ref([
  {
    id: '1',
    author: '美食达人小王',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop&crop=face',
    restaurantName: '海底捞火锅',
    foodName: '川味麻辣锅',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop',
    location: '北京市朝阳区',
    content: '服务真的太好了！麻辣锅底很正宗，配菜新鲜，强烈推荐给大家！',
    timestamp: '2小时前',
    likes: 24,
    comments: 8,
    isLiked: false,
    isBookmarked: false,
    tags: ['火锅', '川菜', '服务好']
  }
])

const topics = ref([
  {
    id: '1',
    name: '一周健康美食挑战',
    description: '分享你的健康美食搭配',
    participantCount: 1240,
    reward: '50积分 + 健康达人勋章'
  }
])

const newCheckin = reactive({
  restaurantName: '',
  foodName: '',
  rating: 5,
  location: '',
  content: '',
  tags: ''
})

// 计算属性
const filteredPosts = computed(() => {
  switch (activeTab.value) {
    case 'hot':
      return [...foodPosts.value].sort((a, b) => b.likes - a.likes)
    case 'nearby':
      return foodPosts.value.filter(post => post.location.includes('北京'))
    default:
      return foodPosts.value
  }
})

// 方法
const switchTab = (tab) => {
  activeTab.value = tab
}

const showCheckinDialog = () => {
  showCheckin.value = true
}

const hideCheckinDialog = () => {
  showCheckin.value = false
  Object.assign(newCheckin, {
    restaurantName: '',
    foodName: '',
    rating: 5,
    location: '',
    content: '',
    tags: ''
  })
}

const getLocation = () => {
  wx.getLocation({
    type: 'gcj02',
    success: (res) => {
      // 这里应该调用逆地理编码API获取地址
      newCheckin.location = `纬度${res.latitude}，经度${res.longitude}`
      wx.showToast({ title: '定位成功', icon: 'success' })
    },
    fail: () => {
      wx.showToast({ title: '定位失败', icon: 'none' })
    }
  })
}

const submitCheckin = () => {
  if (!newCheckin.restaurantName || !newCheckin.foodName) {
    wx.showToast({ title: '请填写餐厅和美食名称', icon: 'none' })
    return
  }
  
  const checkin = {
    id: Date.now().toString(),
    author: '我',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
    restaurantName: newCheckin.restaurantName,
    foodName: newCheckin.foodName,
    rating: newCheckin.rating,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
    location: newCheckin.location,
    content: newCheckin.content,
    timestamp: '刚刚',
    likes: 0,
    comments: 0,
    isLiked: false,
    isBookmarked: false,
    tags: newCheckin.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
  }
  
  foodPosts.value.unshift(checkin)
  hideCheckinDialog()
  wx.showToast({ title: '打卡成功', icon: 'success' })
}

const toggleLike = (postId) => {
  const post = foodPosts.value.find(p => p.id === postId)
  if (post) {
    post.isLiked = !post.isLiked
    post.likes += post.isLiked ? 1 : -1
  }
}

const toggleBookmark = (postId) => {
  const post = foodPosts.value.find(p => p.id === postId)
  if (post) {
    post.isBookmarked = !post.isBookmarked
    wx.showToast({ 
      title: post.isBookmarked ? '收藏成功' : '取消收藏', 
      icon: 'success' 
    })
  }
}
</script>

<style lang="scss" scoped>
.food-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #fff3e0 0%, #ffffff 50%, #ffebee 100%);
}

.header-section {
  background: linear-gradient(135deg, #ff6b35 0%, #f093fb 50%, #f5f7fa 100%);
  padding: 32rpx 48rpx 48rpx;
  border-radius: 0 0 60rpx 60rpx;
  color: white;
}

.content-section {
  padding: 32rpx 48rpx 160rpx;
  margin-top: -32rpx;
}

.food-card {
  background: white;
  border-radius: 32rpx;
  margin-bottom: 32rpx;
  overflow: hidden;
  box-shadow: 0 8rpx 32rpx rgba(255, 107, 53, 0.15);
  
  .food-image-container {
    position: relative;
    height: 384rpx;
    
    .food-image {
      width: 100%;
      height: 100%;
    }
    
    .rating-overlay {
      position: absolute;
      top: 32rpx;
      right: 32rpx;
      background: rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(10rpx);
      border-radius: 24rpx;
      padding: 16rpx 24rpx;
      
      .stars {
        .star {
          color: #ffc107;
          font-size: 24rpx;
          margin-right: 4rpx;
          
          &.filled {
            color: #ffc107;
          }
        }
      }
    }
    
    .food-title-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
      padding: 32rpx;
      
      .food-name {
        display: block;
        color: white;
        font-size: 40rpx;
        font-weight: 600;
        margin-bottom: 8rpx;
      }
      
      .restaurant-name {
        color: rgba(255, 255, 255, 0.9);
        font-size: 28rpx;
      }
    }
  }
  
  .card-content {
    padding: 32rpx;
    
    .user-info {
      display: flex;
      align-items: center;
      margin-bottom: 24rpx;
      
      .user-avatar {
        width: 64rpx;
        height: 64rpx;
        border-radius: 50%;
        margin-right: 24rpx;
      }
      
      .user-details {
        flex: 1;
        
        .username {
          display: block;
          font-weight: 600;
          font-size: 28rpx;
          margin-bottom: 8rpx;
        }
        
        .location {
          display: flex;
          align-items: center;
          color: #666;
          font-size: 24rpx;
          
          .iconfont {
            margin-right: 8rpx;
          }
        }
      }
      
      .timestamp {
        color: #999;
        font-size: 24rpx;
      }
    }
    
    .post-content {
      line-height: 1.6;
      margin-bottom: 24rpx;
      font-size: 28rpx;
    }
    
    .tags {
      margin-bottom: 24rpx;
      
      .tag {
        display: inline-block;
        background: linear-gradient(135deg, #fff3e0, #ffebee);
        color: #ff6b35;
        padding: 8rpx 16rpx;
        border-radius: 16rpx;
        font-size: 24rpx;
        margin-right: 16rpx;
        margin-bottom: 8rpx;
        border: 2rpx solid rgba(255, 107, 53, 0.2);
      }
    }
    
    .actions {
      display: flex;
      padding-top: 24rpx;
      border-top: 2rpx solid #f5f5f5;
      
      .action-item {
        display: flex;
        align-items: center;
        padding: 16rpx 24rpx;
        border-radius: 16rpx;
        margin-right: 24rpx;
        color: #666;
        font-size: 28rpx;
        transition: all 0.3s;
        
        &.liked {
          color: #e91e63;
          background: rgba(233, 30, 99, 0.1);
        }
        
        &.bookmarked {
          color: #ff6b35;
          background: rgba(255, 107, 53, 0.1);
        }
        
        .iconfont {
          margin-right: 8rpx;
        }
      }
    }
  }
}

.topic-card {
  background: white;
  border-radius: 32rpx;
  padding: 40rpx;
  margin-bottom: 32rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
  
  .topic-title {
    display: block;
    font-size: 36rpx;
    font-weight: 600;
    margin-bottom: 16rpx;
  }
  
  .topic-description {
    display: block;
    color: #666;
    font-size: 28rpx;
    line-height: 1.5;
    margin-bottom: 24rpx;
  }
  
  .topic-stats {
    display: flex;
    justify-content: space-between;
    color: #999;
    font-size: 24rpx;
    margin-bottom: 32rpx;
  }
  
  .join-topic-btn {
    width: 100%;
    height: 88rpx;
    background: linear-gradient(135deg, #ff6b35, #f093fb);
    color: white;
    border: none;
    border-radius: 24rpx;
    font-size: 32rpx;
    font-weight: 600;
  }
}

// 弹窗样式
.checkin-modal {
  max-height: 80vh;
  overflow-y: auto;
  
  .form-group {
    margin-bottom: 24rpx;
    
    .label {
      display: block;
      font-size: 28rpx;
      font-weight: 600;
      margin-bottom: 12rpx;
      color: #333;
    }
    
    .form-input {
      width: 100%;
      height: 80rpx;
      border: 2rpx solid #eee;
      border-radius: 16rpx;
      padding: 0 24rpx;
      font-size: 28rpx;
    }
    
    .form-textarea {
      width: 100%;
      min-height: 160rpx;
      border: 2rpx solid #eee;
      border-radius: 16rpx;
      padding: 24rpx;
      font-size: 28rpx;
      line-height: 1.5;
    }
    
    .rating-selector {
      display: flex;
      gap: 16rpx;
      
      .rating-star {
        font-size: 48rpx;
        color: #ddd;
        transition: all 0.3s;
        
        &.active {
          color: #ffc107;
        }
      }
    }
    
    .location-input {
      display: flex;
      align-items: center;
      gap: 16rpx;
      
      .form-input {
        flex: 1;
      }
      
      .location-btn {
        background: #ff6b35;
        color: white;
        border: none;
        padding: 0 24rpx;
        height: 80rpx;
        border-radius: 16rpx;
        font-size: 28rpx;
      }
    }
  }
}
</style>