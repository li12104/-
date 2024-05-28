<template>
  <div>
    <div class="books-top">
      <div style="width: 100%; height: 10vh"></div>
      <div class="book-search">
        <el-input type="text" v-model="search" placeholder="请输入书名"></el-input
        ><el-button icon="el-icon-search" type="primary" circle @click="searchBook"></el-button>
      </div>
      <el-table
        class="books-table"
        :data="currentPage"
        style="width: 100%"
        size="mini"
        row-key="sId"
      >
        <el-table-column type="index" label="序号" width="100" align="center">
        </el-table-column>
        <el-table-column prop="title" label="书籍名" align="center">
        </el-table-column>
        <el-table-column prop="author" label="作者" align="center">
        </el-table-column>
        <el-table-column prop="info" label="详情" align="center">
        </el-table-column>
        <el-table-column prop="number" label="数量" align="center">
        </el-table-column>
        <el-table-column prop="createTime" label="新增时间" align="center">
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              style="margin-right: 10px"
              type="primary"
              icon="el-icon-edit"
              circle
              @click="toUpBooks(scope.row)"
            ></el-button>
            <el-popconfirm
              title="确认删除该书籍吗？"
              icon="el-icon-info"
              icon-color="red"
              @confirm="delStu(scope.row.sId)"
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
      <div class="books-page">
        <el-pagination
          @current-change="currentChange"
          :page-size="pageSize"
          background
          layout="prev, pager, next"
          :total="booksList.length"
        >
        </el-pagination>
      </div>
      <div class="books-dialog">
        <el-dialog title="修改书籍信息" :visible.sync="updateVib"
          ><div class="books-d-item">
            <span>书籍名</span
            ><el-input v-model="book.title" :readonly="true"></el-input>
          </div>
          <div class="books-d-item">
            <span>作者</span
            ><el-input
              type="text"
              :readonly="true"
              v-model="book.author"
            ></el-input>
          </div>
          <div class="books-d-item">
            <span>数量</span
            ><el-input
              v-model="book.number"
              type="number"
              placeholder="请输入书籍数量不可小于0且应为整数"
            ></el-input>
          </div>
          <div class="books-d-item">
            <span>详情</span
            ><el-input
              v-model="book.info"
              placeholder="请输入书籍详情"
            ></el-input>
          </div>
          <div class="books-d-item">
            <span>录入时间</span
            ><el-input
              v-model="book.createTime"
              :readonly="true"
              type="text"
            ></el-input>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="updateVib = false">取 消</el-button>
            <el-button type="primary" @click="upBooks">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      booksList: [],
      pageSize: 5,
      current: 1,
      book: {},
      updateVib: false,
      search: "",
    };
  },
  methods: {
    getAllBooks() {
      this.$axios({
        url: "/api/books",
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
          this.booksList = res.data.data;
        })
        .catch(() => {
          this.$mineShowMsg("系统异常请稍后再试", "warning");
        });
    },
    currentChange(e) {
      this.current = e;
    },
    upBooks() {
      if (this.book.number < 0) {
        this.$mineShowMsg("书籍数量不可小于0", "error");
        return;
      }
      if (this.book.info == "") {
        this.$mineShowMsg("书籍信息不应为空", "error");
        return;
      }
      this.book.number = parseInt(this.book.number);
      this.$axios({
        url: "/api/books",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        method: "put",
        data: this.book,
      })
        .then((res) => {
          if (res.data.code == 1006) {
            this.$toeknIsLate();
            return;
          }
          if (res.data.code == 200) {
            this.$mineShowMsg(res.data.msg);
            this.updateVib = !this.updateVib;
            this.getAllBooks();
            return;
          }
          this.$mineShowMsg(res.data.msg, "warning");
        })
        .catch(() => {
          this.$mineShowMsg("系统异常请稍后再试", "warning");
        });
    },
    toUpBooks(e) {
      this.book = e;
      this.updateVib = !this.updateVib;
    },
    searchBook(){
      this.$axios({
        url: "/api/books/byName?name="+this.search,
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
          if (res.data.code == 200) {
            this.booksList=res.data.data
            return;
          }
          this.$mineShowMsg(res.data.msg, "warning");
        })
        .catch(() => {
          this.$mineShowMsg("系统异常请稍后再试", "warning");
        });
    }
  },
  mounted() {
    this.getAllBooks();
  },
  computed: {
    currentPage() {
      const start = (this.current - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.booksList.slice(start, end);
    },
  },
};
</script>

<style>
.books-table {
  height: 50vh;
  width: 100%;
}
.books-page {
  display: flex;
  justify-content: center;
  padding-top: 20px;
}
.books-top-search {
  height: 60px;
  padding-left: 40px;
}
.books-d-item {
  display: flex;
  align-items: center;
}
.books-d-item span {
  height: 50px;
  width: 80px;
  text-align: right;
  margin-right: 20px;
  line-height: 50px;
}
.book-search {
  display: flex;
  justify-content: space-around;
  width: 200px;
  padding-left: 10px;
}
.book-search input {
  width: 90%;
}
</style>
