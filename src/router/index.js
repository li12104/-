// // router/index.js
import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/LoginView.vue";
import PageView from "./../views/PageView.vue";

Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: "/login",
      component: Login,
      name: "login",
    },
    {
      path: "/page",
      component: PageView,
      name: "page",
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/",
      component: PageView,
      meta: {
        requiresAuth: true,
      },
    },
    // 其他路由...
  ],
});
// // 导航守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token"); // 尝试从localStorage中获取token

  // 如果目标路由是登录页面
  if (to.path === "/login") {
    // 检查是否存在token
    if (token) {
      // 如果存在token，重定向到首页或其他非登录页面
      next({ path: "/" }); // 或者其他您想要重定向到的页面
    } else {
      // 如果没有token，允许访问登录页面
      next();
    }
  } else {
    // 如果不是登录页面，检查是否需要认证
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      // 需要认证，检查token
      if (!token) {
        // 没有token，重定向到登录页面
        next({
          path: "/login",
          query: { redirect: to.fullPath },
        });
      } else {
        // 存在token，正常跳转
        next();
      }
    } else {
      // 不需要认证，直接跳转
      next();
    }
  }
});

export default router;
