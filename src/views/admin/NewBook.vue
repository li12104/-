<template>
  <div>
    <el-card class="book-card">
      <div slot="header" class="clearfix">
        <span>新增书籍</span>
      </div>
      <div>
        <div class="books-d-item">
          <span>书籍名</span><el-input v-model="newBook.title"></el-input>
        </div>
        <div class="books-d-item">
          <span>作者</span
          ><el-input type="text" v-model="newBook.author"></el-input>
        </div>
        <div class="books-d-item">
          <span>数量</span
          ><el-input
            v-model="newBook.number"
            type="number"
            placeholder="请输入书籍数量不可小于0且应为整数"
          ></el-input>
        </div>
        <div class="books-d-item">
          <span>详情</span
          ><el-input
            v-model="newBook.info"
            placeholder="请输入书籍详情"
          ></el-input>
        </div>
        <div style="text-align: center;margin-top: 20px;">
          <el-button style="width: 200px;" type="primary" @click="saveBook">确 定</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newBook: {
        title: "",
        author: "",
        number: 50,
        info: "说点什么",
      },
    };
  },
  methods: {
    saveBook() {
      if(this.newBook.title==""||this.newBook.author==""){
        this.$mineShowMsg("书名与作者不能为空","warning")
        return
      }
      if(this.newBook.number<0){
        this.$mineShowMsg("数量不能小于0","warning")
        return
      }
      this.newBook.number=parseInt(this.newBook.number)
      this.$axios({
        url:"/api/books",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        method:"post",
        data:this.newBook
      }).then((res) => {
          if (res.data.code == 1006) {
            this.$toeknIsLate();
            return;
          }
          if(res.data.code==200){
            this.$mineShowMsg(res.data.msg);
            this.newBook.title=""
            this.newBook.author=""
            return
          }
          this.$mineShowMsg(res.data.msg,"warning");
        })
        .catch(() => {
          this.$mineShowMsg("系统异常请稍后再试", "warning");
        });
    },
  },
};
</script>

<style>
.book-card {
  width: 50%;
  margin: 120px auto;
}
</style>
