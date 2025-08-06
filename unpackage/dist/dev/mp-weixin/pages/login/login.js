"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const username = common_vendor.ref("");
    const password = common_vendor.ref("");
    const errorMsg = common_vendor.ref("");
    const loading = common_vendor.ref(false);
    const showPassword = common_vendor.ref(false);
    const focusField = common_vendor.ref("");
    const showTestAccount = common_vendor.ref(true);
    common_vendor.useRouter();
    const canLogin = common_vendor.computed(() => {
      return username.value.trim().length > 0 && password.value.trim().length > 0;
    });
    const handleInput = (field, e) => {
      if (field === "username") {
        username.value = e.detail.value.trim();
      } else {
        password.value = e.detail.value.trim();
      }
      if (errorMsg.value) {
        errorMsg.value = "";
      }
    };
    const setFocus = (field) => {
      focusField.value = field;
    };
    const checkLoginStatus = () => {
      const token = common_vendor.index.getStorageSync("token");
      if (token) {
        common_vendor.index.switchTab({ url: "/pages/life/life" });
        return true;
      }
      return false;
    };
    const handleLogin = async () => {
      if (!username.value.trim()) {
        errorMsg.value = "请输入用户名";
        return;
      }
      if (!password.value.trim()) {
        errorMsg.value = "请输入密码";
        return;
      }
      try {
        loading.value = true;
        errorMsg.value = "";
        const res = await utils_request.request.post("/api/v1/auth/login", {
          username: username.value.trim(),
          password: password.value.trim()
        });
        if (res.code === 200) {
          common_vendor.index.setStorageSync("token", res.data.token);
          common_vendor.index.setStorageSync("userInfo", res.data.user);
          common_vendor.index.showToast({
            title: "登录成功",
            icon: "success",
            duration: 1500
          });
          setTimeout(() => {
            const pages = getCurrentPages();
            if (pages.length > 1) {
              common_vendor.index.navigateBack({ delta: 1 });
            } else {
              common_vendor.index.switchTab({ url: "/pages/life/life" });
            }
          }, 1500);
        } else {
          errorMsg.value = res.message || "登录失败，请重试";
        }
      } catch (err) {
        errorMsg.value = err.message || "网络异常，请检查网络连接";
      } finally {
        loading.value = false;
      }
    };
    const handleWechatLogin = async (e) => {
      try {
        loading.value = true;
        errorMsg.value = "";
        const userInfo = e.detail.userInfo;
        if (!userInfo) {
          errorMsg.value = "请授权用户信息";
          return;
        }
        const loginRes = await new Promise((resolve, reject) => {
          common_vendor.index.login({
            provider: "weixin",
            success: resolve,
            fail: reject
          });
        });
        const res = await utils_request.request.post("/api/v1/auth/wechat-login", {
          code: loginRes.code,
          userInfo
        });
        if (res.code === 200) {
          common_vendor.index.setStorageSync("token", res.data.token);
          common_vendor.index.setStorageSync("userInfo", res.data.user);
          common_vendor.index.showToast({
            title: "登录成功",
            icon: "success",
            duration: 1500
          });
          setTimeout(() => {
            const pages = getCurrentPages();
            if (pages.length > 1) {
              common_vendor.index.navigateBack({ delta: 1 });
            } else {
              common_vendor.index.switchTab({ url: "/pages/life/life" });
            }
          }, 1500);
        } else {
          errorMsg.value = res.message || "微信登录失败";
        }
      } catch (err) {
        errorMsg.value = err.message || "微信登录异常";
      } finally {
        loading.value = false;
      }
    };
    common_vendor.onMounted(() => {
      const timer = setTimeout(() => {
        checkLoginStatus();
      }, 500);
      common_vendor.onUnmounted(() => {
        clearTimeout(timer);
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o([($event) => username.value = $event.detail.value, ($event) => handleInput("username", $event)]),
        b: focusField.value === "username",
        c: common_vendor.o(($event) => setFocus("username")),
        d: common_vendor.o(($event) => setFocus("")),
        e: username.value,
        f: showPassword.value ? "text" : "password",
        g: common_vendor.o([($event) => password.value = $event.detail.value, ($event) => handleInput("password", $event)]),
        h: focusField.value === "password",
        i: common_vendor.o(($event) => setFocus("password")),
        j: common_vendor.o(($event) => setFocus("")),
        k: password.value,
        l: common_vendor.t(showPassword.value ? "隐藏" : "显示"),
        m: common_vendor.o(($event) => showPassword.value = !showPassword.value),
        n: errorMsg.value
      }, errorMsg.value ? {
        o: common_vendor.t(errorMsg.value)
      } : {}, {
        p: loading.value,
        q: !canLogin.value || loading.value,
        r: common_vendor.o(handleLogin),
        s: common_vendor.o(handleWechatLogin),
        t: showTestAccount.value
      }, showTestAccount.value ? {
        v: common_vendor.o(($event) => showTestAccount.value = false)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map
