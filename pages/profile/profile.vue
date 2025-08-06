<template>
  <view class="profile-container">
    <!-- 用户信息区域（渐变背景调整） -->
    <view class="user-info-section" :style="{background: 'linear-gradient(135deg, #ff7eb3 0%, #ff5e62 100%)'}">
      <view class="user-header">
        <!-- 隐藏默认头像，保持布局简洁 -->
        <view class="user-details">
          <view class="user-name">张三</view>
          <view class="user-tags">
            <text class="tag">生活记录者</text>
            <text class="tag-divider">·</text>
            <text class="tag">美食爱好者</text>
          </view>
          <view class="user-level">
            <text class="level-tag">Lv.5</text>
            <text class="points">1250积分</text>
          </view>
        </view>
      </view>
      
      <!-- 用户数据统计（优化间距和颜色） -->
      <view class="user-stats">
        <view class="stat-item" v-for="item in stats" :key="item.label">
          <text class="stat-value">{{ item.value }}</text>
          <text class="stat-label">{{ item.label }}</text>
        </view>
      </view>
    </view>

    <!-- 今日心情（调整图标大小和间距） -->
    <view class="mood-section">
      <view class="section-header">
        <text class="section-title">今日心情</text>
      </view>
      <view class="mood-content">
        <text class="mood-emoji">😊</text>
        <text class="mood-text">开心</text>
      </view>
    </view>

    <!-- 愿望清单（修正样式细节） -->
    <view class="wishlist-section">
      <view class="section-header">
        <text class="section-title">愿望清单</text>
        <view class="add-btn" @click="showAddWishDialog">
          <text class="iconfont icon-add">+</text>
          <text>添加</text>
        </view>
      </view>
      <view class="wishlist-items">
        <view 
          class="wish-item" 
          v-for="(wish, index) in wishes" 
          :key="index"
        >
          <text class="wish-text">{{ wish.text }}</text>
          <text class="wish-delete" @click="removeWish(index)">×</text>
        </view>
        <view v-if="wishes.length === 0" class="empty-wish">
          <text>暂无愿望，点击右上角添加</text>
        </view>
      </view>
    </view>

    <!-- 新增：成就徽章区域（根据图片补充） -->
    <view class="achievement-section">
      <view class="section-header">
        <text class="section-title">成就徽章</text>
      </view>
      <view class="achievement-grid">
        <view class="achievement-item" v-for="(badge, index) in achievements" :key="index">
          <text class="badge-name">{{ badge.name }}</text>
          <text class="badge-desc">{{ badge.desc }}</text>
        </view>
      </view>
    </view>

    <!-- 新增：功能入口（底部导航风格） -->
   <!-- <view class="function-entrance">
      <view class="entrance-item" v-for="(item, index) in functions" :key="index">
        <text class="entrance-text">{{ item.name }}</text>
        <text class="entrance-close" v-if="item closable">×</text>
      </view>
    </view> -->
    <!-- 添加愿望弹窗（保持原有逻辑） -->
    <uni-popup ref="popup" type="dialog">
      <uni-popup-dialog 
        mode="input" 
        title="添加愿望" 
        placeholder="请输入你的愿望"
        @confirm="addWish"
      ></uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'

// 用户数据统计（与图片一致）
const stats = ref([
  { label: '动态', value: 28 },
  { label: '获赞', value: 156 },
  { label: '粉丝', value: 89 },
  { label: '关注', value: 42 }
])

// 愿望清单（修正数据与图片匹配）
const wishes = ref([
  { text: '打卡XX网红餐厅' },
  { text: '学会做红烧肉' },
  { text: '二个月瘦5斤' } // 修正原文"三个月"为图片中的"二个月"
])

// 成就徽章数据（根据图片补充）
const achievements = ref([
  { name: '美食达人', desc: '发布10篇美食打卡' },
  { name: '健康生活', desc: '连续记录健康数据30天' },
  { name: '社交达人', desc: '获得100个点赞' },
  { name: '探店专家', desc: '打卡50家不同餐厅' }
])

// 功能入口数据（底部导航）
const functions = ref([
  { name: '生活', closable: true },
  { name: '打卡', closable: true },
  { name: '食谱', closable: false },
  { name: '我的', closable: false }
])
// 模拟当前心情状态
const currentMood = ref('happy'); 
// 心情列表，可根据实际调整
const moodList = [
  { mood: 'happy', icon: 'smile-icon' },
  { mood: 'love', icon: 'heart-icon' },
  { mood: 'neutral', icon: 'meh-icon' },
  { mood: 'sad', icon: 'frown-icon' }
];

// 模拟获取心情图标的方法，实际可根据 currentMood 返回不同图片路径
const getMoodIcon = computed(() => {
  switch (currentMood.value) {
    case 'happy':
      return '/static/happy.png'; 
    case 'love':
      return '/static/love.png';
    case 'neutral':
      return '/static/neutral.png';
    case 'sad':
      return '/static/sad.png';
    default:
      return '';
  }
});

// 获取心情文字描述
const getMoodLabel = computed(() => {
  switch (currentMood.value) {
    case 'happy':
      return '开心';
    case 'love':
      return '喜爱';
    case 'neutral':
      return '平淡';
    case 'sad':
      return '难过';
    default:
      return '';
  }
})

// 弹窗相关逻辑
const popup = ref(null)
const showAddWishDialog = () => {
  popup.value.open()
}
const addWish = (text) => {
  if (text.trim()) {
    wishes.value.unshift({ text: text.trim() })
  }
}
const removeWish = (index) => {
  wishes.value.splice(index, 1)
}

// 页面显示时更新状态
onShow(() => {
  // 实际项目中可替换为接口请求
})
</script>

<style lang="scss" scoped>
.profile-container {
  min-height: 100vh;
  background-color: #f8f8f8;
  padding-bottom: 120rpx; // 为底部功能区预留空间
}

// 用户信息区域样式调整
.user-info-section {
  padding: 60rpx 32rpx 40rpx;
  border-radius: 0 0 40rpx 40rpx;
  color: white;

  .user-header {
    display: flex;
    align-items: center;

    .user-details {
      margin-left: 10rpx;

      .user-name {
        font-size: 48rpx;
        font-weight: bold;
        margin-bottom: 8rpx;
      }

      .user-tags {
        display: flex;
        align-items: center;
        margin-bottom: 12rpx;
        font-size: 28rpx;
        opacity: 0.9;

        .tag {
          margin: 0 6rpx;
        }
      }

      .user-level {
        display: flex;
        align-items: center;
        font-size: 26rpx;

        .level-tag {
          background: rgba(255, 255, 255, 0.2);
          padding: 4rpx 16rpx;
          border-radius: 24rpx;
          margin-right: 16rpx;
        }
      }
    }
  }

  .user-stats {
    display: flex;
    justify-content: space-around;
    margin-top: 40rpx;
    padding-top: 30rpx;
    border-top: 1rpx solid rgba(255, 255, 255, 0.3);

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;

      .stat-value {
        font-size: 38rpx;
        font-weight: bold;
      }

      .stat-label {
        font-sizee: 26rpx;
        opacity: 0.9;
        margin-top: 8rpx;
      }
    }
  }
}

// 公共区块标题样式
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28rpx 32rpx;
  border-bottom: 1rpx solid #f0f0f0;

  .section-title {
    font-size: 34rpx;
    font-weight: bold;
    color: #333;
  }

  .add-btn {
    display: flex;
    align-items: center;
    font-size: 28rpx;
    color: #ff5e62; // 与顶部渐变红色呼应

    .iconfont {
      margin-right: 8rpx;
      font-size: 30rpx;
    }
  }
}

// 今日心情样式
.mood-section {
  background: white;
  margin: 24rpx;
  border-radius: 24rpx;
  overflow: hidden;

  .mood-content {
    display: flex;
    align-items: center;
    padding: 40rpx 32rpx;

    .mood-emoji {
      font-size: 64rpx;
      margin-right: 24rpx;
    }

    .mood-text {
      font-size: 34rpx;
      color: #333;
    }
  }
}

// 愿望清单样式
.wishlist-section {
  background: white;
  margin: 24rpx;
  border-radius: 24rpx;
  overflow: hidden;

  .wishlist-items {
    padding: 0 32rpx 24rpx;

    .wish-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 28rpx 0;
      border-bottom: 1rpx solid #f0f0f0;

      .wish-text {
        font-size: 32rpx;
        color: #333;
      }

      .wish-delete {
        font-size: 36rpx;
        color: #999;
        padding: 10rpx 20rpx;
      }
    }

    .empty-wish {
      text-align: center;
      padding: 60rpx 0;
      color: #999;
      font-size: 28rpx;
    }
  }
}

// 成就徽章样式（网格布局）
.achievement-section {
  background: white;
  margin: 24rpx;
  border-radius: 24rpx;
  overflow: hidden;

  .achievement-grid {
    display: flex;
    flex-wrap: wrap;
    padding: 24rpx 32rpx;

    .achievement-item {
      width: 50%;
      padding: 24rpx 16rpx;
      box-sizing: border-box;

      .badge-name {
        font-size: 30rpx;
        font-weight: 600;
        color: #333;
        display: block;
        margin-bottom: 8rpx;
      }

      .badge-desc {
        font-size: 24rpx;
        color: #666;
        opacity: 0.9;
      }
    }
  }
}

// 功能入口样式（底部导航风格）
.function-entrance {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100rpx;
  background: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);

  .entrance-item {
    display: flex;
    align-items: center;
    font-size: 30rpx;
    color: #333;

    .entrance-close {
      color: #ff5e62;
      margin-left: 10rpx;
      font-size: 24rpx;
    }
  }
}
</style>