<template>
    <div>
      <el-card class="book-card">
        <div slot="header" class="clearfix">
          <span>新增书籍</span>
        </div>
        <div>
          <div class="books-d-item">
            <el-input 
              v-model="comm.message"
              placeholder="请输入留言"
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
        comm:{
            userId:0,
            message:""
        }
      };
    },
    methods: {
      saveBook() {
        if(this.comm.message==""){
          this.$mineShowMsg("留言内容不能为空","error")
          return
        }
        this.comm.userId=localStorage.getItem("id")
        this.$axios({
          url:"/api/comment",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          method:"post",
          data:this.comm
        }).then((res) => {
            if (res.data.code == 1006) {
              this.$toeknIsLate();
              return;
            }
            if(res.data.code==200){
              this.$mineShowMsg(res.data.msg);
              this.comm.message=""
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
  