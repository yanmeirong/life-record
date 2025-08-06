<template>
  <view class="tab-content">
    <view 
      v-for="post in posts" 
      :key="post.id"
      class="post-card"
    >
      <view class="post-header">
        <image class="avatar" :src="post.avatar" />
        <view class="user-info">
          <text class="username">{{ post.author }}</text>
          <text class="timestamp">{{ post.timestamp }}</text>
        </view>
      </view>
      
      <view class="post-content">
        <text class="content-text">{{ post.content }}</text>
        <image 
          v-if="post.images && post.images.length > 0"
          class="post-image"
          :src="post.images[0]"
          mode="aspectFill"
        />
      </view>
      
      <view class="post-actions">
        <view 
          class="action-item"
          :class="{ liked: post.isLiked }"
          @tap="$emit('toggleLike', post.id)"
        >
          <text class="iconfont icon-heart"></text>
          <text>{{ post.likes }}</text>
        </view>
        <view class="action-item" @tap="$emit('showComments', post.id)">
          <text class="iconfont icon-comment"></text>
          <text>{{ post.comments }}</text>
        </view>
        <view class="action-item" @tap="$emit('sharePost', post.id)">
          <text class="iconfont icon-share"></text>
          <text>分享</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  posts: {
    type: Array,
    default: () => []
  }
})
</script>

<style lang="scss" scoped>
.tab-content {
  .post-card {
    background: white;
    border-radius: 32rpx;
    margin-bottom: 32rpx;
    overflow: hidden;
    box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);

    .post-header {
      display: flex;
      align-items: center;
      padding: 32rpx;
      border-bottom: 2rpx solid #f5f5f5;
      .avatar {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        margin-right: 24rpx;
      }
      .user-info {
        .username {
          display: block;
          font-weight: 600;
          font-size: 32rpx;
        }
        .timestamp {
          font-size: 24rpx;
          color: #999;
        }
      }
    }

    .post-content {
      padding: 32rpx;
      .content-text {
        display: block;
        line-height: 1.6;
        margin-bottom: 24rpx;
      }
      .post-image {
        width: 100%;
        height: 360rpx;
        border-radius: 16rpx;
      }
    }

    .post-actions {
      display: flex;
      padding: 24rpx 32rpx;
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
        .iconfont {
          margin-right: 8rpx;
        }
      }
    }
  }
}
</style>