## 功能说明

- **生活记录**：用户可以发布公开或私密的生活片段，并安排今日行程。
- **餐厅美食打卡**：用户可以上传美食照片、编辑描述并获取地理位置，支持打卡浏览和互动。
- **旅游打卡**：记录旅游经历，上传照片并与其他用户分享。
- **食谱模块**：提供食谱浏览、AI生成、收藏管理和分享功能。
- **我的页面**：整合用户个性化信息，包括今日心情、愿望清单和健康模块。
- 

## 安装与运行

1. 克隆项目到本地
2. 运行 `npm install` 安装依赖
3. 运行 `npm start` 启动应用


life-record-app/
├── api/                     # API请求相关
│   ├── request.js           # Axios实例配置
│   ├── auth.js              # 认证相关接口
│   ├── life.js              # 生活记录相关接口
│   ├── food.js              # 美食打卡相关接口
│   ├── recipe.js            # 食谱相关接口
│   ├── travel.js            # 旅游相关接口
│   └── profile.js           # 个人中心相关接口
├── components/              # 公共组件
│   ├── common/              # 通用组件
│   │   ├── PostCard.vue     # 动态卡片组件
│   │   ├── DiaryItem.vue    # 日记项组件
│   │   ├── ScheduleItem.vue # 行程项组件
│   │   ├── FoodCard.vue     # 美食卡片组件
│   │   └── RecipeCard.vue   # 食谱卡片组件
│   ├── layout/              # 布局组件
│   │   ├── Header.vue       # 头部组件
│   │   ├── Footer.vue       # 底部组件
│   │   └── TabBar.vue       # 标签栏组件
│   └── form/                # 表单组件
│       ├── ImageUpload.vue  # 图片上传组件
│       └── LocationPicker.vue # 位置选择组件
├── pages/                   # 页面文件
│   ├── index/               # 首页
│   │   └── index.vue
│   ├── auth/                # 认证相关
│   │   ├── login.vue
│   │   └── register.vue
│   ├── life/                # 生活记录
│   │   ├── index.vue
│   │   ├── publish.vue
│   │   ├── diary.vue
│   │   └── schedule.vue
│   ├── food/                # 美食打卡
│   │   ├── index.vue
│   │   └── publish.vue
│   ├── travel/              # 旅游记录
│   │   ├── index.vue
│   │   └── publish.vue
│   ├── recipe/              # 食谱模块
│   │   ├── index.vue
│   │   ├── detail.vue
│   │   └── generate.vue
│   └── profile/             # 个人中心
│       ├── index.vue
│       ├── wishes.vue
│       └── health.vue
├── static/                  # 静态资源
│   ├── icons/               # 图标
│   │   ├── home.png
│   │   ├── home-active.png
│   │   ├── life.png
│   │   ├── life-active.png
│   │   ├── food.png
│   │   ├── food-active.png
│   │   ├── recipe.png
│   │   ├── recipe-active.png
│   │   ├── profile.png
│   │   └── profile-active.png
│   └── images/              # 图片资源
├── store/                   # Pinia状态管理
│   ├── index.js             # 状态管理入口
│   ├── user.js              # 用户相关状态
│   ├── life.js              # 生活记录相关状态
│   ├── food.js              # 美食打卡相关状态
│   ├── recipe.js            # 食谱相关状态
│   └── travel.js            # 旅游相关状态
├── utils/                   # 工具函数
│   ├── date.js              # 日期处理工具
│   ├── format.js            # 格式化工具
│   └── validate.js          # 验证工具
├── App.vue                  # 应用入口组件
├── main.js                  # 入口文件
├── pages.json               # 页面路由配置
├── manifest.json            # 应用配置
├── package.json             # 项目依赖
└── README.md                # 项目说明
后端技术栈：
Python + Flask 框架提供 RESTful API
SQLAlchemy 作为 ORM 工具，简化数据库操作
JWT 认证确保接口安全
支持图片上传和存储
前端技术栈：
Vue3 + UniApp 实现跨平台小程序
Pinia 进行状态管理
响应式设计适配不同设备
组件化开发提高代码复用性
核心功能模块：
生活记录：支持发布公开 / 私密内容
行程安排：管理每日计划
美食打卡：上传图片、添加描述和地理位置
旅游打卡：记录旅行经历并分享
食谱模块：浏览、AI 生成和收藏食谱
个人中心：管理心情、愿望清单和健康数据
数据交互：
前端通过封装的 request 工具请求后端 API
采用 JWT 认证机制确保数据安全
支持图片等多媒体文件上传
