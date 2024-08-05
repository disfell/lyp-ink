import { createWebHistory } from "vue-router";

export default {
  history: function (base) {
    // 在客户端使用 createWebHistory，服务器端返回 null
    return typeof window !== "undefined" ? createWebHistory(base) : null;
  },
};
