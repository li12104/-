<template>
  <div>
    <div
      style="
        display: flex;
        justify-content: center;
        height: 70vh;
        flex-direction: column;
        align-items: center;
      "
    >
      <el-card
        class="comment-card"
        v-for="(item, index) in currentPage"
        :key="index"
      >
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
          "
          slot="header"
        >
          <span>书架</span>
          <el-button
            slot="reference"
            round
            type="primary"
            @click="retunBook(item.bookId)"
            >删除</el-button
          >
        </div>
        <el-descriptions class="margin-top" :column="2" size="mini">
          <el-descriptions-item>
            <template slot="label"> 书籍名 </template>
            {{ item.title }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 作者 </template>
            {{ item.author }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 详情 </template>
            {{ item.info }}
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </div>
    <div style="text-align: center; margin-top: 20px">
      <el-pagination
        @current-change="currentChange"
        :page-size="pageSize"
        background
        layout="prev, pager, next"
        :total="bookshelf.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bookshelf: [],
      pageSize: 3,
      current: 1,
    };
  },
  methods: {
    currentChange(e) {
      this.current = e;
    },
    getBookShelf() {
      let id = localStorage.getItem("id");
      this.$axios({
        url: "/api/bookshelf/" + id,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        method: "get",
      })
        .then((res) => {
          if (res.data.code == 1006) {
            this.$toeknIsLate();
            return;
          }
          this.bookshelf = res.data.data.booksList;
        })
        .catch(() => {
          this.$mineShowMsg("系统异常请稍后再试", "warning");
        });
    },
    retunBook(id) {
      this.$confirm("是否归还图书?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const userId = localStorage.getItem("id");
          this.$axios({
            url: "/api/bookshelf?bookId=" + id + "&userId=" + userId,
            method: "delete",
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
            .then((res) => {
              if (res.data.code == 1006) {
                this.$toeknIsLate();
                return;
              }
              if (res.data.code == 200) {
                this.$mineShowMsg(res.data.msg);
                this.getBookShelf()
                return;
              }
              this.$mineShowMsg(res.data.msg, "warning");
            })
            .catch(() => {
              this.$mineShowMsg("系统异常请稍后再试", "warning");
            });
        })
        .catch(() => {});
    },
  },
  computed: {
    currentPage() {
      const start = (this.current - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.bookshelf.slice(start, end);
    },
  },
  mounted() {
    this.getBookShelf();
  },
};
</script>

<style>
.comment-card {
  width: 70%;
  margin-top: 20px;
}
</style>
