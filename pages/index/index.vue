<template>
  <view class="container">
    <!-- 顶部轮播 -->
    <swiper indicator-dots autoplay interval="5000" duration="500">
      <swiper-item v-for="(item, index) in swiperList" :key="index">
        <image :src="item.image" mode="widthFix" class="swiper-img"></image>
      </swiper-item>
    </swiper>
    
    <!-- 功能导航 -->
    <view class="nav-grid">
      <view class="nav-item" @click="switchTab('/pages/life/life')">
        <image src="/static/icons/life.png" class="nav-icon"></image>
        <text>生活记录</text>
      </view>
      <view class="nav-item" @click="switchTab('/pages/food/food')">
        <image src="/static/icons/food.png" class="nav-icon"></image>
        <text>美食打卡</text>
      </view>
      <view class="nav-item" @click="switchTab('/pages/travel/travel')">
        <image src="/static/icons/travel.png" class="nav-icon"></image>
        <text>旅游打卡</text>
      </view>
      <view class="nav-item" @click="switchTab('/pages/recipes/recipes')">
        <image src="/static/icons/recipe.png" class="nav-icon"></image>
        <text>食谱</text>
      </view>
    </view>
    
    <!-- 推荐动态 -->
    <view class="section">
      <view class="section-title">推荐动态</view>
      <view class="post-item" v-for="post in recommendPosts" :key="post.id">
        <view class="post-header">
          <image :src="post.avatar" class="avatar"></image>
          <text class="author">{{ post.author }}</text>
        </view>
        <text class="content">{{ post.content }}</text>
        <image :src="post.images[0]" class="post-img" v-if="post.images.length"></image>
        <view class="post-footer">
          <text>{{ post.timestamp }}</text>
          <view class="actions">
            <text class="action" @click="likePost(post.id)">{{ post.isLiked ? '已赞' : '点赞' }}({{ post.likes }})</text>
            <text class="action">评论({{ post.comments }})</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { getPublicPosts } from '../../api/life'

// 数据
const swiperList = ref([
  { image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=750&h=300&fit=crop' },
  { image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=750&h=300&fit=crop' }
])
const recommendPosts = ref([])

// 方法
const switchTab = (url) => {
  uni.switchTab({ url })
}

const likePost = (postId) => {
  // 调用点赞接口
}

// 生命周期
onLoad(async () => {
  const res = await getPublicPosts()
  if (res.code === 200) {
    recommendPosts.value = res.data.posts.slice(0, 3)
  }
})
</script>

<style scoped>
.container {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.swiper-img {
  width: 100%;
  height: 300rpx;
}

.nav-grid {
  display: flex;
  flex-wrap: wrap;
  padding: 20rpx;
  background-color: white;
}

.nav-item {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20rpx 0;
}

.nav-icon {
  width: 80rpx;
  height: 80rpx;
  margin-bottom: 10rpx;
}

.section {
  margin-top: 20rpx;
  background-color: white;
  padding: 20rpx;
}

.section-title {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.post-item {
  padding: 20rpx 0;
  border-bottom: 1px solid #eee;
}

.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 15rpx;
}

.avatar {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  margin-right: 15rpx;
}

.author {
  font-weight: bold;
}

.content {
  display: block;
  margin-bottom: 15rpx;
  line-height: 1.5;
}

.post-img {
  width: 100%;
  height: 300rpx;
  border-radius: 10rpx;
  margin-bottom: 15rpx;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  color: #999;
  font-size: 28rpx;
}

.actions {
  display: flex;
  gap: 20rpx;
}

.action {
  display: flex;
  align-items: center;
}
</style>