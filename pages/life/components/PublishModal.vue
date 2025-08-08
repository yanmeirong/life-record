<template>
  <view class="modal-overlay" @tap="$emit('hidePublishDialog')">
    <view class="modal-content" @tap.stop>
      <view class="modal-header">
        <text class="modal-title">发布动态</text>
        <text class="close-btn" @tap="$emit('hidePublishDialog')">×</text>
      </view>
      
      <textarea 
        class="publish-textarea"
        placeholder="分享你的生活..."
        v-model="newPost.content"
      />
	  <view class="space-y-3" >
		   <button @click="chooseImage">选择图片</button>
<!-- 		    <view class="flex items-center gap-2">
		                       <Image class="h-5 w-5 text-gray-500" />
		                       <Camera class="h-5 w-5 text-gray-500" />
		                     </view> -->
	  </view>
    
      <view class="publish-options">
        <view 
          class="option-item"
          :class="{ active: newPost.isPublic }"
          @tap="newPost.isPublic = true"
        >
          <text class="iconfont icon-globe"></text>
          公开
        </view>
        <view 
          class="option-item"
          :class="{ active: !newPost.isPublic }"
          @tap="newPost.isPublic = false"
        >
          <text class="iconfont icon-lock"></text>
          私密
        </view>
      </view>
      
      <button class="confirm-btn" @tap="$emit('publishPost')">发布动态</button>
    </view>
  </view>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
const props = defineProps({
  newPost: {
    type: Object,
    default: () => ({ content: '', isPublic: true })
  }
})
// 在life.vue的script中添加
const chooseImage = async () => {
  try {
    const res = await uni.chooseImage({
      count: 1,  // 最多选择1张
      sizeType: ['original', 'compressed'],  // 原图/压缩图
      sourceType: ['album']  // 仅从相册选择
    })
    
    // res.tempFilePaths 为选择的图片路径数组
    if (res.tempFilePaths.length) {
      const imagePath = res.tempFilePaths[0]
      // 可在这里调用上传接口将图片上传到服务器
      console.log('选择的图片路径：', imagePath)
      // 示例：将图片路径添加到新发布的内容中
      newPost.images = [imagePath]
    }
  } catch (err) {
    console.error('选择图片失败：', err)
  }
}
const uploadToServer = async (tempFilePath) => {
  const uploadRes = await uni.uploadFile({
    url: '你的上传接口地址',
    filePath: tempFilePath,
    name: 'file',
    formData: { 'user': 'test' }
  })
  return JSON.parse(uploadRes.data).url  // 返回服务器图片地址
}
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 40rpx;
}

.modal-content {
  background: white;
  border-radius: 32rpx;
  width: 100%;
  max-width: 600rpx;
  padding: 40rpx;
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32rpx;
    .modal-title {
      font-size: 36rpx;
      font-weight: 600;
    }
    .close-btn {
      font-size: 48rpx;
      color: #999;
      cursor: pointer;
    }
  }
  
  .publish-textarea {
    width: 100%;
    min-height: 200rpx;
    border: 2rpx solid #eee;
    border-radius: 16rpx;
    padding: 24rpx;
    font-size: 32rpx;
    line-height: 1.5;
    margin-bottom: 24rpx;
  }
  
  .publish-options {
    display: flex;
    gap: 24rpx;
    margin-bottom: 32rpx;
    .option-item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24rpx;
      border: 2rpx solid #eee;
      border-radius: 16rpx;
      transition: all 0.3s;
      &.active {
        border-color: #ff6b35;
        background: rgba(255, 107, 53, 0.1);
        color: #ff6b35;
      }
      .iconfont {
        margin-right: 8rpx;
      }
    }
  }
  
  .confirm-btn {
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
</style>