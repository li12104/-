<template>
  <div>
    <div class="top">
      <p>书籍是人类进步的阶梯 ----高尔基</p>
      <div class="top-r">
        <p>{{ username }}</p>
        <p @click="logout">退出登录</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$confirm("确定要退出登录吗, 是否继续?", "退出", {
        confirmButtonText: "确定",
        cancelButtonText: "点错了",
        type: "warning",
      })
        .then(() => {
          localStorage.clear();
          this.$router.push("/login");
        })
        .catch(() => {
          this.$mineShowMsg("下次别点错了哦", "info");
        });
    },
  },
  data() {
    return {
      username: "",
    };
  },
  mounted() {
    this.username = localStorage.getItem("username");
  },
};
</script>

<style>
.top {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  height: 100%;
  align-items: center;
  width: 100%;
  font-size: 30px;
  font-family: "微软雅黑";
  color: #fff;
}
.top-r {
  display: flex;
  justify-content: space-around;
  width: 12%;
  cursor: pointer;
  font-size: 16px;
}
.top-r p:hover{
color: #000;
}
</style>
