<template>
    <div>
      <div class="user-top" >
        <div style="width: 100%;height: 10vh;"></div>
        <el-table class="user-table" :data="currentPage" style="width: 100%" size="mini" row-key="id">
          <el-table-column type="index" label="序号" width="100" align="center">
          </el-table-column>
          <el-table-column prop="username" label="用户名" align="center">
          </el-table-column>
          <el-table-column label="用户类型" align="center">
            用户
          </el-table-column>
          <el-table-column prop="nickname" label="昵称" align="center">
            
          </el-table-column>
          <el-table-column prop="createTime" label="注册时间" align="center">
          </el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <el-popconfirm
                title="确认删除该用户吗？"
                icon="el-icon-info"
                icon-color="red"
                @confirm="delUser(scope.row.id)"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="text-align: center;">
          <el-pagination
            @current-change="currentChange"
            :page-size="pageSize"
            background
            layout="prev, pager, next"
            :total="userList.length"
          >
          </el-pagination>
        </div>
    </div>
  </template>
  
  <script>
  
  export default {
    data() {
      return {
        userList: [],
        pageSize: 5,
        current: 1
      };
    },
    methods: {
      getUsers() {
        this.$axios({
          url: "/api/user",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          method: "get",
        })
          .then((res) => {
            if (res.data.code == 1006) {
              this.$toeknIsLate();
            }
            this.userList = res.data.data;
          })
          .catch(() => {
            this.$mineShowMsg("获取数据失败请稍后再试", "warning");
          });
      },
      delUser(id) {
        this.$axios({
          url: "/api/user/" + id,
          method: "delete",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
          .then((res) => {
            if (res.data.code != 200) {
              if (res.data.code == 1006) {
                this.$toeknIsLate();
                return;
              }
              this.$mineShowMsg(res.data.msg, "info");
              return;
            }
            console.log(res)
            this.$mineShowMsg(res.data.msg);
            this.getUsers();
          })
          .catch(() => {
            this.$mineShowMsg("系统异常请稍后再试", "warning");
          });
      },currentChange(e) {
        this.current = e;
      }
    },
    mounted() {
      this.getUsers();
    },
    computed: {
      currentPage() {
        const start = (this.current - 1) * this.pageSize;
        const end = start + this.pageSize;
        return this.userList.slice(start, end);
      },
    },
  };
  </script>
  
  <style>
  
  .user-table {
    height: 50vh;
  }
  </style>
  