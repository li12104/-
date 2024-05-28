<!-- Page.vue -->
<template>
  <div>
    <component :is="currentView"></component>
  </div>
</template>

<script>
import AdminView from "./admin/AdminView.vue";
import UserView from "./user/UserView.vue";
export default {
  components: {
    AdminView,
    UserView,
  },
  data(){
    return{
        currentView:null
    }
  },mounted(){
    const isAdmin = localStorage.getItem('isAdmin') === '管理员';
    if (isAdmin) {  
        this.currentView = 'AdminView';  
      } else {  
        this.currentView = 'UserView';  
      } 
  }
};
</script>

<style></style>
