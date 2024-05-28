<template>
  <div>
    <div>
      <el-menu
        @select="selectMenu"
        v-if="admin == true"
        default-active="1"
        class="el-menu-vertical-demo menu"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">
          <i class="el-icon-location"></i>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-s-custom"></i>
          <span>用户管理</span>
        </el-menu-item>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-shop"></i>
            <span>书籍管理</span>
          </template>
          <el-menu-item index="3-1">
            <i class="el-icon-document"></i>
            <span>查看书籍</span>
          </el-menu-item>
          <el-menu-item index="3-2">
            <i class="el-icon-edit"></i>
            <span>新增书籍</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-message"></i>
            <span>留言管理</span>
          </template>
          <el-menu-item index="4-1">
            <i class="el-icon-message"></i>
            <span>查看留言</span>
          </el-menu-item>
          <el-menu-item index="4-2">
            <i class="el-icon-edit"></i>
            <span>新增留言</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="5">
          <i class="el-icon-tickets"></i>
          <span>借阅记录</span>
        </el-menu-item>
      </el-menu>
      <el-menu
        v-if="admin == false"
        @select="selectMenu"
        default-active="1"
        class="el-menu-vertical-demo menu"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="min-height: 100vh"
      >
        <el-menu-item index="1">
          <i class="el-icon-location"></i>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-s-management"></i>
          <span>书城</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-folder"></i>
          <span>书架</span>
        </el-menu-item>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-info"></i>
            <span>留言</span>
          </template>
          <el-menu-item index="4-1">
            <i class="el-icon-message"></i>
            <span>查看留言</span>
          </el-menu-item>
          <el-menu-item index="4-2">
            <i class="el-icon-edit"></i>
            <span>新增留言</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    selectMenu(key) {
      this.$emit("pageIndex", key);
    },
  },
  props: {
    admin: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
.menu {
  width: 30vh;
  min-height: 100vh;
}
</style>
