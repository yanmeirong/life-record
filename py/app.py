from flask import Flask, request, jsonify
from flask_jwt_extended import (
    JWTManager, create_access_token,
    jwt_required, get_jwt_identity
)
from flask_cors import CORS  # 导入跨域支持库
from datetime import datetime, timedelta
import uuid
import os

app = Flask(__name__)
# 启用跨域支持，允许小程序前端调用接口
CORS(app, resources={r"/api/*": {"origins": "*"}})

app.config['JWT_SECRET_KEY'] = 'super-secret'  # 实际项目中使用环境变量
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=7)
jwt = JWTManager(app)

# 模拟数据库
mock_db = {
    "users": [
        {"id": "1", "username": "test", "password": "123456", "avatar": "https://example.com/avatar.jpg"}
    ],
    "posts": [],  # 公开动态
    "diaries": [],  # 私人日记
    "schedules": [],  # 行程
    "recipes": [],  # 食谱
    "food_checkins": [],  # 美食打卡
    "topics": [],  # 话题
    "wishes": [],  # 愿望清单
    "achievements": []  # 成就
}


# 通用工具函数
def get_current_user():
    user_id = get_jwt_identity()
    return next((u for u in mock_db["users"] if u["id"] == user_id), None)


# 一、通用接口
@app.route('/api/v1/auth/login', methods=['POST'])
def login():
    data = request.json
    user = next((u for u in mock_db["users"] if
                 u["username"] == data.get("username") and u["password"] == data.get("password")), None)
    if not user:
        return jsonify({"code": 401, "message": "用户名或密码错误", "data": None}), 401
    access_token = create_access_token(identity=user["id"])
    return jsonify({
        "code": 200,
        "message": "登录成功",
        "data": {"token": access_token,
                 "user": {"id": user["id"], "username": user["username"], "avatar": user["avatar"]}}
    })


@app.route('/api/v1/upload/image', methods=['POST'])
@jwt_required()
def upload_image():
    if 'file' not in request.files:
        return jsonify({"code": 400, "message": "未上传图片", "data": None}), 400
    # 实际项目中需处理文件存储
    image_url = f"https://example.com/images/{uuid.uuid4()}.jpg"
    return jsonify({"code": 200, "message": "上传成功", "data": {"url": image_url}})


# 二、生活记录模块
# 1. 公开动态相关
@app.route('/api/v1/life/posts', methods=['GET'])
def get_public_posts():
    page = int(request.args.get('page', 1))
    size = int(request.args.get('size', 20))
    start = (page - 1) * size
    end = start + size
    posts = mock_db["posts"][start:end]
    return jsonify({
        "code": 200,
        "message": "success",
        "data": {"posts": posts, "total": len(mock_db["posts"])}
    })


@app.route('/api/v1/life/posts', methods=['POST'])
@jwt_required()
def publish_post():
    user = get_current_user()
    data = request.json
    if not data.get("content", "").strip():
        return jsonify({"code": 400, "message": "请输入内容", "data": None}), 400

    post = {
        "id": str(uuid.uuid4()),
        "author": user["username"],
        "avatar": user["avatar"],
        "content": data["content"],
        "images": data.get("images", []),
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "likes": 0,
        "comments": 0,
        "isLiked": False,
        "isPublic": data.get("isPublic", True),
        "user_id": user["id"]
    }
    mock_db["posts"].insert(0, post)
    return jsonify({"code": 201, "message": "发布成功", "data": post})


@app.route('/api/v1/life/posts/<post_id>/like', methods=['PUT'])
@jwt_required()
def toggle_post_like(post_id):
    post = next((p for p in mock_db["posts"] if p["id"] == post_id), None)
    if not post:
        return jsonify({"code": 404, "message": "动态不存在", "data": None}), 404

    post["isLiked"] = not post["isLiked"]
    post["likes"] += 1 if post["isLiked"] else -1
    return jsonify({
        "code": 200,
        "message": "操作成功",
        "data": {"likes": post["likes"], "isLiked": post["isLiked"]}
    })


# 2. 私人日记相关
@app.route('/api/v1/life/diaries', methods=['GET'])
@jwt_required()
def get_private_diaries():
    user = get_current_user()
    page = int(request.args.get('page', 1))
    size = int(request.args.get('size', 20))
    user_diaries = [d for d in mock_db["diaries"] if d["user_id"] == user["id"]]
    start = (page - 1) * size
    end = start + size
    return jsonify({
        "code": 200,
        "message": "success",
        "data": {"diaries": user_diaries[start:end], "total": len(user_diaries)}
    })


@app.route('/api/v1/life/diaries', methods=['POST'])
@jwt_required()
def save_diary():
    user = get_current_user()
    data = request.json
    if not data.get("title", "").strip() or not data.get("content", "").strip():
        return jsonify({"code": 400, "message": "请填写标题和内容", "data": None}), 400

    diary = {
        "id": str(uuid.uuid4()),
        "user_id": user["id"],
        "date": datetime.now().strftime("%Y-%m-%d"),
        "title": data["title"],
        "content": data["content"],
        "mood": data.get("mood", "happy"),
        "tags": [t.strip() for t in data.get("tags", "").split(",") if t.strip()]
    }
    mock_db["diaries"].insert(0, diary)
    return jsonify({"code": 201, "message": "保存成功", "data": diary})


# 3. 今日行程相关
@app.route('/api/v1/life/schedules', methods=['GET'])
@jwt_required()
def get_schedules():
    user = get_current_user()
    date = request.args.get('date', datetime.now().strftime("%Y-%m-%d"))
    user_schedules = [s for s in mock_db["schedules"] if s["user_id"] == user["id"] and s["date"] == date]
    return jsonify({
        "code": 200,
        "message": "success",
        "data": {"schedules": user_schedules}
    })


@app.route('/api/v1/life/schedules', methods=['POST'])
@jwt_required()
def add_schedule():
    user = get_current_user()
    data = request.json
    if not data.get("time", "").strip() or not data.get("title", "").strip():
        return jsonify({"code": 400, "message": "请填写时间和事项", "data": None}), 400

    schedule = {
        "id": str(uuid.uuid4()),
        "user_id": user["id"],
        "date": datetime.now().strftime("%Y-%m-%d"),
        "time": data["time"],
        "title": data["title"],
        "completed": False
    }
    mock_db["schedules"].append(schedule)
    # 按时间排序
    mock_db["schedules"].sort(key=lambda x: x["time"])
    return jsonify({"code": 201, "message": "添加成功", "data": schedule})


@app.route('/api/v1/life/schedules/<schedule_id>/complete', methods=['PUT'])
@jwt_required()
def update_schedule(schedule_id):
    user = get_current_user()
    schedule = next((s for s in mock_db["schedules"] if s["id"] == schedule_id and s["user_id"] == user["id"]), None)
    if not schedule:
        return jsonify({"code": 404, "message": "行程不存在", "data": None}), 404

    schedule["completed"] = not schedule["completed"]
    return jsonify({
        "code": 200,
        "message": "操作成功",
        "data": {"completed": schedule["completed"]}
    })


# 三、食谱模块
@app.route('/api/v1/recipes', methods=['GET'])
def get_recipes():
    search = request.args.get('searchTerm', '').lower()
    page = int(request.args.get('page', 1))
    size = int(request.args.get('size', 20))
    filtered = [r for r in mock_db["recipes"] if search in r["name"].lower() or search in r["tags"]]
    start = (page - 1) * size
    end = start + size
    return jsonify({
        "code": 200,
        "message": "success",
        "data": {"recipes": filtered[start:end], "total": len(filtered)}
    })


@app.route('/api/v1/recipes/<recipe_id>', methods=['GET'])
def get_recipe_detail(recipe_id):
    recipe = next((r for r in mock_db["recipes"] if r["id"] == recipe_id), None)
    if not recipe:
        return jsonify({"code": 404, "message": "食谱不存在", "data": None}), 404
    return jsonify({"code": 200, "message": "success", "data": recipe})


# 四、美食打卡模块
# 1. 美食打卡相关
@app.route('/api/v1/food/checkins', methods=['GET'])
def get_food_checkins():
    tab = request.args.get('tab', 'latest')
    page = int(request.args.get('page', 1))
    size = int(request.args.get('size', 20))
    location = request.args.get('location', '')

    checkins = mock_db["food_checkins"]
    # 筛选逻辑
    if tab == 'hot':
        checkins = sorted(checkins, key=lambda x: x["likes"], reverse=True)
    elif tab == 'nearby' and location:
        checkins = [c for c in checkins if location in c["location"]]

    start = (page - 1) * size
    end = start + size
    return jsonify({
        "code": 200,
        "message": "success",
        "data": {"checkins": checkins[start:end], "total": len(checkins)}
    })


@app.route('/api/v1/food/checkins', methods=['POST'])
@jwt_required()
def publish_checkin():
    user = get_current_user()
    data = request.json
    if not data.get("restaurantName") or not data.get("foodName"):
        return jsonify({"code": 400, "message": "请填写餐厅和美食名称", "data": None}), 400

    checkin = {
        "id": str(uuid.uuid4()),
        "author": user["username"],
        "avatar": user["avatar"],
        "restaurantName": data["restaurantName"],
        "foodName": data["foodName"],
        "rating": data.get("rating", 5),
        "location": data.get("location", ""),
        "content": data.get("content", ""),
        "image": data.get("image", ""),
        "tags": [t.strip() for t in data.get("tags", "").split(",") if t.strip()],
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "likes": 0,
        "comments": 0,
        "isLiked": False,
        "isBookmarked": False,
        "user_id": user["id"]
    }
    mock_db["food_checkins"].insert(0, checkin)
    return jsonify({"code": 201, "message": "打卡成功", "data": checkin})


@app.route('/api/v1/food/checkins/<checkin_id>/like', methods=['PUT'])
@jwt_required()
def toggle_checkin_like(checkin_id):
    checkin = next((c for c in mock_db["food_checkins"] if c["id"] == checkin_id), None)
    if not checkin:
        return jsonify({"code": 404, "message": "打卡记录不存在", "data": None}), 404

    checkin["isLiked"] = not checkin["isLiked"]
    checkin["likes"] += 1 if checkin["isLiked"] else -1
    return jsonify({
        "code": 200,
        "message": "操作成功",
        "data": {"likes": checkin["likes"], "isLiked": checkin["isLiked"]}
    })


@app.route('/api/v1/food/checkins/<checkin_id>/bookmark', methods=['PUT'])
@jwt_required()
def toggle_checkin_bookmark(checkin_id):
    checkin = next((c for c in mock_db["food_checkins"] if c["id"] == checkin_id), None)
    if not checkin:
        return jsonify({"code": 404, "message": "打卡记录不存在", "data": None}), 404

    checkin["isBookmarked"] = not checkin["isBookmarked"]
    return jsonify({
        "code": 200,
        "message": "操作成功",
        "data": {"isBookmarked": checkin["isBookmarked"]}
    })


# 2. 话题相关
@app.route('/api/v1/food/topics', methods=['GET'])
def get_topics():
    return jsonify({
        "code": 200,
        "message": "success",
        "data": {"topics": mock_db["topics"]}
    })


# 五、个人中心模块
# 1. 用户信息相关
@app.route('/api/v1/profile/stats', methods=['GET'])
@jwt_required()
def get_user_stats():
    user = get_current_user()
    # 统计数据计算
    stats = [
        {"label": "动态", "value": len([p for p in mock_db["posts"] if p["user_id"] == user["id"]])},
        {"label": "获赞", "value": sum(p["likes"] for p in mock_db["posts"] if p["user_id"] == user["id"])},
        {"label": "粉丝", "value": 89},  # 模拟数据
        {"label": "关注", "value": 42}  # 模拟数据
    ]
    return jsonify({"code": 200, "message": "success", "data": {"stats": stats}})


@app.route('/api/v1/profile/achievements', methods=['GET'])
@jwt_required()
def get_achievements():
    user = get_current_user()
    # 实际项目中需关联用户成就
    achievements = mock_db["achievements"]
    return jsonify({"code": 200, "message": "success", "data": {"achievements": achievements}})


# 2. 愿望清单相关
@app.route('/api/v1/profile/wishes', methods=['GET'])
@jwt_required()
def get_wishes():
    user = get_current_user()
    user_wishes = [w for w in mock_db["wishes"] if w["user_id"] == user["id"]]
    return jsonify({"code": 200, "message": "success", "data": {"wishes": user_wishes}})


@app.route('/api/v1/profile/wishes', methods=['POST'])
@jwt_required()
def add_wish():
    user = get_current_user()
    data = request.json
    if not data.get("text", "").strip():
        return jsonify({"code": 400, "message": "请输入愿望内容", "data": None}), 400

    wish = {
        "id": str(uuid.uuid4()),
        "user_id": user["id"],
        "text": data["text"]
    }
    mock_db["wishes"].insert(0, wish)
    return jsonify({"code": 201, "message": "添加成功", "data": wish})


@app.route('/api/v1/profile/wishes/<wish_id>', methods=['DELETE'])
@jwt_required()
def delete_wish(wish_id):
    user = get_current_user()
    wish_index = next((i for i, w in enumerate(mock_db["wishes"]) if w["id"] == wish_id and w["user_id"] == user["id"]),
                      None)
    if wish_index is None:
        return jsonify({"code": 404, "message": "愿望不存在", "data": None}), 404

    mock_db["wishes"].pop(wish_index)
    return jsonify({"code": 200, "message": "删除成功", "data": None})


if __name__ == '__main__':
    # 初始化模拟数据
    mock_db["posts"].append({
        "id": "1",
        "author": "小明",
        "avatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop&crop=face",
        "content": "今天天气真好，和朋友们一起去公园野餐！",
        "images": ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"],
        "timestamp": "2024-05-20 14:30:00",
        "likes": 12,
        "comments": 3,
        "isLiked": False,
        "isPublic": True,
        "user_id": "1"
    })

    app.run(debug=True)

