<template>
  <view class="tab-content">
    <view class="schedule-header">
      <text class="schedule-title">今日行程</text>
     <button class="add-schedule-btn" @tap="$emit('showScheduleDialog')">
        <text class="iconfont icon-add"></text>
        添加
      </button>
    </view>
    
    <view class="schedule-list">
      <view 
        v-for="item in scheduleList"
        :key="item.id"
        class="schedule-item"
        :class="{ completed: item.completed }"
      >
        <view 
          class="check-box"
          @tap="$emit('toggleSchedule', item.id)"
        >
          <text v-if="item.completed" class="check-mark">✓</text>
        </view>
        <view class="schedule-time">
          <text class="iconfont icon-clock"></text>
          {{ item.time }}
        </view>
        <text class="schedule-content">{{ item.title }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  scheduleList: {
    type: Array,
    default: () => []
  }
})
</script>

<style lang="scss" scoped>
.tab-content {
  .schedule-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32rpx;
    .schedule-title {
      font-size: 36rpx;
      font-weight: 600;
      color: #333;
    }
    .add-schedule-btn {
      background: linear-gradient(135deg, #ff6b35, #f093fb);
      color: white;
      border: none;
      // padding: 16rpx 24rpx;
      border-radius: 24rpx;
      font-size: 28rpx;
	  margin-right: 0;//让按钮靠右对齐
    }
  }

  .schedule-list {
    background: white;
    border-radius: 32rpx;
    overflow: hidden;
    box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
    .schedule-item {
      display: flex;
      align-items: center;
      padding: 32rpx;
      border-bottom: 2rpx solid #f5f5f5;
      transition: all 0.3s;
      &.completed {
        opacity: 0.6;
        .schedule-content {
          text-decoration: line-through;
          color: #999;
        }
      }
      &:last-child {
        border-bottom: none;
      }
      .check-box {
        width: 40rpx;
        height: 40rpx;
        border: 4rpx solid #ddd;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 24rpx;
        transition: all 0.3s;
        &:has(.check-mark) {
          background: #ff6b35;
          border-color: #ff6b35;
        }
        .check-mark {
          color: white;
          font-size: 24rpx;
          font-weight: bold;
        }
      }
      .schedule-time {
        display: flex;
        align-items: center;
        color: #666;
        font-size: 24rpx;
        margin-right: 24rpx;
        .iconfont {
          margin-right: 8rpx;
        }
      }
      .schedule-content {
        flex: 1;
        font-size: 32rpx;
      }
    }
  }
}
</style>