<template>
  <view class="tab-content">
 <!--   <view class="add-diary-btn" @tap="$emit('showDiaryDialog')">
      <text class="iconfont icon-edit"></text>
      写日记
    </view> -->
           <!--  <view class="grid grid-cols-2 gap-4 mb-6">
           <view class="bg-white rounded-2xl shadow-lg overflow-hidden">
             <view class="p-5">
               <view class="flex items-center justify-between">
                 <view class="flex-1">
                   <p class="text-sm text-gray-500 mb-1">总日记数</p>
                   <p class="text-2xl font-semibold text-gray-800">{{ diaries.length }}</p>
                   <p class="text-xs text-gray-500">篇</p>
                 </view>
                 <view class="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                   <book-open class="w-6 h-6 text-white" />
                 </view>
               </view>
             </view>
           </view>
           
       <view class="bg-white rounded-2xl shadow-lg overflow-hidden">
             <view class="p-5">
               <view class="flex items-center justify-between">
                 <view class="flex-1">
                   <p class="text-sm text-gray-500 mb-1">本月记录</p>
                   <p class="text-2xl font-semibold text-gray-800">{{ currentMonthEntries }}</p>
                   <p class="text-xs text-gray-500">天</p>
                 </view>
                 <view class="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center">
                   <calendar class="w-6 h-6 text-white" />
                 </view>
               </view>
             </view>
           </view> 
         </view>-->

    <view 
      v-for="diary in diaries"
      :key="diary.id"
      class="diary-card"
    >
      <view class="diary-header">
        <text class="diary-title">{{ diary.title }}</text>
        <view class="diary-meta">
          <text class="mood-icon" :class="`mood-${diary.mood}`">
            {{ getMoodEmoji(diary.mood) }}
          </text>
          <text class="iconfont icon-lock privacy-icon"></text>
        </view>
      </view>
      
      <view class="diary-date">
        <text class="iconfont icon-calendar"></text>
        {{ diary.date }}
      </view>
      
      <text class="diary-content">{{ diary.content }}</text>
      
      <view v-if="diary.tags.length > 0" class="diary-tags">
        <text 
          v-for="tag in diary.tags"
          :key="tag"
          class="tag"
        >
          # {{ tag }}
        </text>
      </view>
    </view>
	<!-- 写日记按钮容器 -->
	<view class="write-diary-btn-container" @tap="$emit('showDiaryDialog')">
	  <button class="write-diary-btn" bindtap="handleWriteDiary">写日记</button>
	</view>
  </view>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  diaries: {
    type: Array,
    default: () => []
  },
  getMoodEmoji: {
    type: Function,
    default: () => '😊'
  }
})
</script>

<style lang="scss" scoped>
.tab-content {
	position:relative;
	.write-diary-btn-container {
	  position: fixed;
	  bottom:120rpx; /* 距离底部的距离，可根据需求调整 */
	  right: 0;
	  transform: translateX(-50%); 
	  width: 160rpx; /* 按钮容器宽度，可按需调整 */
	}
	
	.write-diary-btn {
	     width: 100%;
	     height: 2.25rem;
	     line-height: 2.25rem;
	     border-radius: 1.25rem;
	     background: linear-gradient(135deg, #4fffab, #2ea8ff);
	     color: white;
	     border: none;
	     text-align: center;
	     font-size: 1rem;
	     box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.1);
	}

  .diary-card {
    background: white;
    border-radius: 32rpx;
    margin-bottom: 32rpx;
    overflow: hidden;
    box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
    padding: 40rpx;
	  // display: flex;
	  // flex-direction: column;
	  // width: 345rpx;
	  // border-radius: 24rpx;
	  // background: #fff;
	  // box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.08);
	  // overflow: hidden;
	  // transition: transform 0.2s, box-shadow 0.2s;

    /* 悬停时的弹起效果 */
      .diary-card:hover {
        transform: translateY(-12rpx);
        box-shadow: 0 20px 35px rgba(0, 0, 0, 0.15);
    }
    
    /* 按下时的动画效果 */
      .diary-cardactive {
        transform: translateY(-8rpx);
        transition: transform 0.1s;
	}

    .diary-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24rpx;
      .diary-title {
        font-size: 36rpx;
        font-weight: 600;
      }
      .diary-meta {
        display: flex;
        align-items: center;
        .mood-icon {
          font-size: 40rpx;
          margin-right: 16rpx;
        }
        .privacy-icon {
          color: #999;
        }
      }
    }

    .diary-date {
      display: flex;
      align-items: center;
      color: #666;
      font-size: 24rpx;
      margin-bottom: 24rpx;
      .iconfont {
        margin-right: 8rpx;
      }
    }

    .diary-content {
      line-height: 1.6;
      margin-bottom: 24rpx;
    }

    .diary-tags {
      .tag {
        display: inline-block;
        background: linear-gradient(135deg, #e3f2fd, #f3e5f5);
        color: #2196f3;
        padding: 8rpx 16rpx;
        border-radius: 16rpx;
        font-size: 24rpx;
        margin-right: 16rpx;
        margin-bottom: 16rpx;
        border: 2rpx solid rgba(33, 150, 243, 0.2);
      }
    }
  }
}
</style>