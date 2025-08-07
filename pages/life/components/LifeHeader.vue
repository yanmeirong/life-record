<template>
  <view class="header-section">
    <view class="header-content">
      <view class="header-text">
        <text class="title">生活记录</text>
        <text class="subtitle">分享生活，记录美好</text>

      </view>
      <button class="publish-btn" @tap="$emit('showPublishDialog')">
        <text class="iconfont icon-add"></text>
        发布
      </button>
    </view>
    
    <!-- 标签页 -->
    <view class="tabs-container">
      <view class="tabs">
        <view 
          class="tab-item"
          :class="{ active: activeTab === 'public' }"
          @tap="$emit('switchTab', 'public')"
        >
          公开动态
        </view>
        <view 
          class="tab-item"
          :class="{ active: activeTab === 'private' }"
          @tap="$emit('switchTab', 'private')"
        >
          私密日记
        </view>
        <view 
          class="tab-item"
          :class="{ active: activeTab === 'schedule' }"
          @tap="$emit('switchTab', 'schedule')"
        >
          今日行程
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  activeTab: {
    type: String,
    default: 'public'
  }
})
</script>

<style lang="scss" scoped>
.header-section {
  background: linear-gradient(135deg, #51a2ff 0%,#c07aff 50%, #fb66b6 100%);
   // background: linear-gradient(120deg, #4facfe 0%, #00f2fe 100%); // 新蓝绿渐变
  padding: 32rpx 48rpx 48rpx;
  border-radius: 0 0 60rpx 60rpx;
  color: white;

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32rpx;

    .header-text {
      .title {
        display: block;
        font-size: 48rpx;
        font-weight: 600;
        margin-bottom: 8rpx;
      }
      .subtitle {
        font-size: 28rpx;
        opacity: 0.8;
      }
    }

    .publish-btn {
      color: #ff6b35;
      // padding: 16rpx 24rpx;
      border-radius: 24rpx;
       font-size: 0.875rem; 
      backdrop-filter: blur(10rpx);
	  margin-right:0;
	  background-color: #ffffff;
	  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
	              0 4px 6px -4px rgba(0, 0, 0, 0.1);
	  
	  /* 过渡效果 */
	  transition-property: all;
	  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	  transition-duration: 0.15s;
	  &.hover {
	   background-color: 
	   color-mix(in oklab, var(--color-white) 20%, transparent);
	  }
    }
  }

  .tabs-container {
	
    .tabs {
      display: flex;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 24rpx;
      padding: 8rpx;
      backdrop-filter: blur(10rpx);
	  gap:0.35rem;
	  height:2.25rem;
	  box-sizing: border-box;
	
    }
    .tab-item {
      flex: 1;
      text-align: center;
	  box-sizing: border-box;
      padding: 8rpx;
      border-radius: 16rpx;
      font-size: 28rpx;
      transition: all 0.3s;
      &.active {
        background: white;
        color: #ff6b35;
      }
    }
  }
  // / 新增标签栏与按钮的容器样式
  .tabs-with-btn {
    display: flex;
    align-items: center;
    gap: 16rpx; // 标签与按钮间距
  }
  
  // 写日记按钮样式
  .diary-btn {
    background: white;
    color: #4facfe; // 与头部渐变颜色呼应
    border: none;
    padding: 16rpx 24rpx;
    border-radius: 24rpx;
    font-size: 28rpx;
    display: flex;
    align-items: center;
    gap: 8rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05); // 轻微阴影突出按钮
  }
}

</style>