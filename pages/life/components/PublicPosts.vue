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
          <SvgIcon :iconClass="post.isLiked ?'icon-dianzan1':'icon-fabulous'" size="24"/>
          <text>{{ post.likes }}</text>
        </view>
        <view class="action-item" @tap="$emit('showComments', post.id)">
          <SvgIcon iconClass="icon-comments"  size="24"  />
          <text>{{ post.comments }}</text>
        </view>
        <view class="action-item" @tap="handleShare(post)">
          <SvgIcon iconClass="icon-share"  size="16"/>
          <text>分享</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { defineProps } from 'vue'
import { showActionSheet, shareAppMessage } from '@/utils/wechat' // 假设引入微信API工具

const props = defineProps({
  posts: {
    type: Array,
    default: () => []
  }
})

// 处理分享逻辑
const handleShare = (post) => {
	
  // 显示分享选项
  showActionSheet({
    itemList: ['分享给微信好友', '分享到朋友圈', '保存图片'],
    success: (res) => {
      switch(res.tapIndex) {
        case 0:
          // 分享给微信好友
          shareToWechatFriend(post)
          break
        case 1:
          // 分享到朋友圈
          shareToTimeline(post)
          break
        case 2:
          // 保存图片逻辑
          $emit('savePostImage', post.id)
          break
      }
    }
  })
}

// 分享给微信好友
const shareToWechatFriend = (post) => {
  shareAppMessage({
    title: `${post.author}的动态`,
    path: `/pages/post/detail?id=${post.id}`,
    imageUrl: post.images && post.images.length > 0 ? post.images[0] : '',
    success: () => {
      console.log('分享成功')
    },
    fail: (err) => {
      console.log('分享失败', err)
    }
  })
}

// 分享到朋友圈
const shareToTimeline = (post) => {
  // 微信朋友圈分享API
  wx.updateShareMenu({
    withShareTicket: true,
    isTimelineShare: true
  })
  
  wx.shareTimeline({
    title: `${post.author}的动态: ${post.content.substring(0, 20)}...`,
    query: `id=${post.id}`,
    imageUrl: post.images && post.images.length > 0 ? post.images[0] : '',
    success: () => {
      console.log('朋友圈分享成功')
    },
    fail: (err) => {
      console.log('朋友圈分享失败', err)
    }
  })
}
</script>

<style lang="scss" scoped>
.tab-content {
  .post-card {
    background: white;
    border-radius: 32rpx;
    margin-bottom: 32rpx;
    overflow: hidden;
    box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease; /* 添加过渡效果 */
    transform-origin: center top; /* 设置变换原点 */
    
    // 卡片抬起效果
    &:active {
      transform: translateY(-8rpx);
      box-shadow: 0 16rpx 40rpx rgba(0, 0, 0, 0.15);
    }

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
        &:active {
          background-color: #f5f5f5;
        }
        .iconfont {
          margin-right: 8rpx;
        }
      }
    }
  }
}
</style>