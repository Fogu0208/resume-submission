import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/Register.vue'),
    },
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('../views/Dashboard.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/add',
      name: 'AddApplication',
      component: () => import('../views/AddApplication.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/edit/:id',
      name: 'EditApplication',
      component: () => import('../views/EditApplication.vue'),
      meta: { requiresAuth: true },
    },
  ],
});

// 路由守卫
// Navigation Guard
router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore();
  
  // 尝试获取用户信息（如果已登录但没有用户信息）
  if (authStore.token && !authStore.user) {
      try {
        await authStore.fetchUser();
      } catch (e) {
         // Token失效
      }
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
