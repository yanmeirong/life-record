<template>
  <view class="modal-overlay" @tap="$emit('hideDiaryDialog')">
    <view class="modal-content diary-modal" @tap.stop>
      <view class="modal-header">
        <text class="modal-title">写日记</text>
        <text class="close-btn" @tap="$emit('hideDiaryDialog')">×</text>
      </view>
      
      <input 
        class="diary-title-input"
        placeholder="今天的标题..."
        v-model="newDiary.title"
      />
      
      <view class="mood-selector">
        <text class="label">心情</text>
        <view class="mood-options">
          <view 
            v-for="mood in moodOptions"
            :key="mood.value"
            class="mood-option"
            :class="{ active: newDiary.mood === mood.value }"
            @tap="newDiary.mood = mood.value"
          >
            {{ mood.emoji }}
          </view>
        </view>
      </view>
      
      <textarea 
        class="diary-content-textarea"
        placeholder="记录今天的感受..."
        v-model="newDiary.content"
      />
      
      <input 
        class="diary-tags-input"
        placeholder="用逗号分隔，如：开心, 工作, 朋友"
        v-model="newDiary.tags"
      />
      
      <button class="confirm-btn" @tap="$emit('saveDiary')">保存日记</button>
    </view>
  </view>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  newDiary: {
    type: Object,
    default: () => ({ title: '', content: '', mood: 'happy', tags: '' })
  },
  moodOptions: {
    type: Array,
    default: () => []
  }
})
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
  
  .diary-content-textarea {
    width: 100%;
    min-height: 200rpx;
    border: 2rpx solid #eee;
    border-radius: 16rpx;
    padding: 24rpx;
    font-size: 32rpx;
    line-height: 1.5;
    margin-bottom: 24rpx;
  }
  
  .diary-title-input,
  .diary-tags-input {
    width: 100%;
    height: 80rpx;
    border: 2rpx solid #eee;
    border-radius: 16rpx;
    padding: 0 24rpx;
    font-size: 32rpx;
    margin-bottom: 24rpx;
  }
  
  .mood-selector {
    margin-bottom: 24rpx;
    .label {
      display: block;
      font-size: 32rpx;
      font-weight: 600;
      margin-bottom: 16rpx;
    }
    .mood-options {
      display: flex;
      gap: 16rpx;
      .mood-option {
        width: 80rpx;
        height: 80rpx;
        border: 4rpx solid #eee;
        border-radius: 16rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40rpx;
        transition: all 0.3s;
        &.active {
          border-color: #ff6b35;
          background: rgba(255, 107, 53, 0.1);
        }
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