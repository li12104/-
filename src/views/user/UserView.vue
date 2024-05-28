<template>
  <div class="con">
    <div>
      <SidebarView @pageIndex="selectIndex" :admin="false"></SidebarView>
    </div>
    <div class="con-right">
      <div class="c-r-t">
        <HomeTop></HomeTop>
      </div>
      <HomeView v-if="current == '1'"></HomeView>
      <UserBooks v-if="current=='2'"></UserBooks>
      <BookShelf v-if="current=='3'"></BookShelf>
      <CommentView v-if="current=='4-1'"></CommentView>
      <NewComment v-if="current=='4-2'"></NewComment>
    </div>
  </div>
</template>

<script>
import HomeTop from "./../../components/HomeTop.vue";
import SidebarView from "@/components/SidebarView.vue";
import HomeView from "../HomeView.vue";
import UserBooks from "./UserBooks.vue";
import BookShelf from './BookShelf.vue'
import CommentView from "../admin/CommentView.vue";
import NewComment from "../admin/NewComment.vue";
export default {
  components: {
    HomeTop,
    SidebarView,
    HomeView,
    UserBooks,
    BookShelf,
    CommentView,
    NewComment
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
}
</style>
