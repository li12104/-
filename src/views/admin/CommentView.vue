<template>
  <div>
    <div style="display: flex;justify-content: center;margin-top: 10px;">
      <el-radio-group v-model="type" @change="typeChange">
        <el-radio label="2">最新</el-radio>
        <el-radio label="1">最旧</el-radio>
      </el-radio-group>
    </div>
    <div style="display: flex; justify-content: center;height: 70vh;flex-direction: column;align-items: center;">
      <el-card class="comment-card" v-for="(item,index) in currentPage" :key="index">
        <div slot="header" class="clearfix">
          <span>留言</span>
        </div>
        <el-descriptions class="margin-top" :column="2" size="mini" border>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              用户名
            </template>
            {{ item.username }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-timer"></i>
              留言时间
            </template>
            {{ item.createTime }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-chat-square"></i>
              留言内容
            </template>
            {{ item.message }}
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </div>
    <div style="text-align: center;margin-top: 20px;">
      <el-pagination
        @current-change="currentChange"
        :page-size="pageSize"
        background
        layout="prev, pager, next"
        :total="commentList.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commentList: [],
      pageSize: 3,
      current: 1,
      type:"2"
    };
  },
  computed: {
    currentPage() {
      const start = (this.current - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.commentList.slice(start, end);
    },
  },
  methods: {
    currentChange(e) {
      this.current = e;
    },
    getCommentList(type){
        this.$axios({
          url: "/api/comment/"+type,
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          method: "get",
        })
          .then((res) => {
            if (res.data.code == 1006) {
              this.$toeknIsLate();
            }
            this.commentList = res.data.data;
          })
          .catch(() => {
            this.$mineShowMsg("获取数据失败请稍后再试", "warning");
          });
    },
    typeChange(){
      this.getCommentList(this.type)
    }
  },
  mounted(){
    this.getCommentList(this.type)
  }
};
</script>

<style>
.comment-card {
  width: 70%;
  margin-top: 20px;
}
</style>
