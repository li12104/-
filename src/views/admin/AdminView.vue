<template>
  <div class="con">
    <div>
      <SidebarView @pageIndex="selectIndex" :admin="true"></SidebarView>
    </div>
    <div class="con-right">
      <div class="c-r-t">
        <HomeTop></HomeTop>
      </div>
      <HomeView v-if="current == '1'"></HomeView>
      <AdminUser v-if="current == '2'"></AdminUser>
      <AdminBooks v-if="current=='3-1'"></AdminBooks>
      <NewBook v-if="current=='3-2'"></NewBook>
      <CommentView v-if="current=='4-1'"></CommentView>
      <NewComment v-if="current=='4-2'"></NewComment>
      <BorrowView v-if="current==5"></BorrowView>
    </div>
  </div>
</template>

<script>
import HomeTop from "./../../components/HomeTop.vue";
import SidebarView from "./../../components/SidebarView.vue";
import HomeView from "./../HomeView.vue";
import AdminUser from './AdminUser.vue'
import AdminBooks from './AdminBooks.vue'
import NewBook from './NewBook.vue'
import CommentView from "./CommentView.vue";
import NewComment from './NewComment.vue'
import BorrowView from "./BorrowView.vue";
export default {
  components: {
    HomeTop,
    SidebarView,
    HomeView,
    AdminUser,
    AdminBooks,
    NewBook,
    CommentView,
    NewComment,
    BorrowView
  },
  data() {
    return {
      current: "1",
    };
  },
  methods: {
    selectIndex(index) {
      this.current = index;
    },
  },
};
</script>

<style>
.con {
  display: flex;
  justify-content: start;
}
.con-right {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}
.c-r-t {
  height: 10%;
  width: 100%;
  background: #80bdec;
}
</style>
