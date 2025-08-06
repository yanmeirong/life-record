"use strict";
const common_vendor = require("../common/vendor.js");
const store_modules_user = require("./modules/user.js");
const store_modules_life = require("./modules/life.js");
const store_modules_food = require("./modules/food.js");
const store = common_vendor.createStore({
  modules: {
    user: store_modules_user.user,
    life: store_modules_life.life,
    food: store_modules_food.food
  }
});
exports.store = store;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/index.js.map
