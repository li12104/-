<template>
  <div>
    <div class="user-top">
      <div style="width: 100%; height: 10vh"></div>
      <div style="display: flex; justify-content: start; margin: 20px">
        <el-radio-group v-model="type" @change="typeChange">
          <el-radio label="">所有</el-radio>
          <el-radio label="0">借出</el-radio>
          <el-radio label="1">归还</el-radio>
        </el-radio-group>
      </div>
      <el-table
        class="user-table"
        :data="currentPage"
        style="width: 100%"
        row-key="index"
      >
        <el-table-column type="index" label="序号" width="100" align="center">
        </el-table-column>
        <el-table-column prop="user" label="用户" align="center">
        </el-table-column>
        <el-table-column label="类型" prop="type" align="center">
        </el-table-column>
        <el-table-column label="书籍" prop="book" align="center">
        </el-table-column>
        <el-table-column prop="time" label="时间" align="center">
        </el-table-column>
      </el-table>
    </div>
    <div style="text-align: center">
      <el-pagination
        @current-change="currentChange"
        :page-size="pageSize"
        background
        layout="prev, pager, next"
        :total="borrowList.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      borrowList: [],
      pageSize: 5,
      current: 1,
      type: "",
    };
  },
  methods: {
    getBorrowList() {
      this.$axios({
        url: "/api/borrow",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        method: "get",
      })
        .then((res) => {
          if (res.data.code == 1006) {
            this.$toeknIsLate();
          }
          this.borrowList = res.data.data;
        })
        .catch(() => {
          this.$mineShowMsg("获取数据失败请稍后再试", "warning");
        });
    },
    getBorrowListByType(type) {
      this.$axios({
        url: "/api/borrow/" + type,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        method: "get",
      })
        .then((res) => {
          if (res.data.code == 1006) {
            this.$toeknIsLate();
          }
          this.borrowList = res.data.data;
        })
        .catch(() => {
          this.$mineShowMsg("获取数据失败请稍后再试", "warning");
        });
    },
    currentChange(e) {
      this.current = e;
    },
    typeChange(e) {
      if (e == "") {
        this.getBorrowList();
        return;
      }
      this.getBorrowListByType(e);
    },
  },
  mounted() {
    this.getBorrowList();
  },
  computed: {
    currentPage() {
      const start = (this.current - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.borrowList.slice(start, end);
    },
  },
};
</script>

<style>
.user-table {
  height: 50vh;
}
</style>
