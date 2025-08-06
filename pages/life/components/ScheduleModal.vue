<template>
  <view class="modal-overlay" @tap="$emit('hideScheduleDialog')">
    <view class="modal-content schedule-modal" @tap.stop>
      <view class="modal-header">
        <text class="modal-title">添加行程</text>
        <text class="close-btn" @tap="$emit('hideScheduleDialog')">×</text>
      </view>
      
     <input 
        class="diary-title-input"
        placeholder="时间，如：09:00"
        v-model="newSchedule.time"
      />
	 <view class="time-selector-container">
	   <picker mode="date" value="{{newSchedule.time}}" start="2015-09-01" end="2017-09-01" bindchange="bindDateChange">
	      <view class="picker">
	        当前选择: {{newSchedule.time}}
	      </view>
	    </picker>
	  </view>
	   <view class="time-filter">
	       <picker mode="date" :value="newSchedule.time" bindchange="bindDateChange">
	         <view class="picker-item">{{ newSchedule.time }}</view>
	       </picker>
	     </view>
		<!-- <view class="time-selector-container">
	      <select class="time-select" v-model="newSchedule.hour" @change="updateTime">
	        <option value="">选择小时</option>
	        <option v-for="hour in 23" :value="hour.toString().padStart(2, '0')" :key="hour">
	          {{ hour.toString().padStart(2, '0') }}
	        </option>
	      </select>
	      <text class="time-separator">:</text>
	      <select class="time-select" v-model="newSchedule.minute" @change="updateTime">
	        <option value="">选择分钟</option>
	        <option v-for="minute in minutes" :value="minute" :key="minute">
	          {{ minute }}
	        </option>
	      </select>
	    </view> -->
      
      <input 
        class="diary-title-input"
        placeholder="事项，要做什么..."
        v-model="newSchedule.title"
      />
      
      <button class="confirm-btn" @tap="$emit('saveSchedule')">添加行程</button>
    </view>
  </view>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  newSchedule: {
    type: Object,
    default: () => ({ time: '', title: '' })
  }
})
const minutes = ['00', '15', '30', '45']

const updateTime = () => {
  if (props.newSchedule.hour && props.newSchedule.minute) {
    props.newSchedule.time = `${props.newSchedule.hour}:${props.newSchedule.minute}`
  }
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
  z-index: 1000; /* 弹窗背景层级 */
  padding: 40rpx;
}

.modal-content {
  background: white;
  border-radius: 32rpx;
  width: 100%;
  max-width: 600rpx;
  padding: 40rpx;
  position: relative; /* 关键：添加相对定位 */
  z-index: 1001; /* 弹窗内容层级高于背景 */
  
  // 解决选择器被覆盖的核心样式
  .time-selector-container {
    position: relative; /* 确保选择器容器创建独立层叠上下文 */
    z-index: 1002; /* 高于弹窗内容的层级 */
    display: flex;
    align-items: center;
    gap: 16rpx;
    margin-bottom: 24rpx;
	
    
    .time-select {
      flex: 1;
      height: 80rpx;
      border: 2rpx solid #eee;
      border-radius: 16rpx;
      padding: 0 24rpx;
      font-size: 32rpx;
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 24rpx center;
      background-size: 24rpx;
      // 部分浏览器需要单独设置下拉框层级
      &:focus {
        z-index: 1003;
      }
    }
    
    .time-separator {
      font-size: 32rpx;
      color: #333;
    }
  }
  .time-filter {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20rpx;
	.uni-picker-container {
		z-index:1002 !important;
	}
  }
  /* 其他原有样式保持不变 */
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
  
  .diary-title-input {
    width: 100%;
    height: 80rpx;
    border: 2rpx solid #eee;
    border-radius: 16rpx;
    padding: 0 24rpx;
    font-size: 32rpx;
    margin-bottom: 24rpx;
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