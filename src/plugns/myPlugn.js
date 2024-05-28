//myPlugn.js
export default {
  install(Vue) {
    (Vue.prototype.$mineShowMsg = function (
      message,
      type = "success",
      duration = 1500
    ) {
      this.$message({
        message: message,
        type: type,
        duration: duration,
      });
    }),
      (Vue.prototype.$toeknIsLate = function () {
        this.$alert("token信息过期", {
          confirmButtonText: "确定",
          callback: () => {
            localStorage.clear()
            this.$router.push('/login')
          },
        });
      });
  },
};
