import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '../api';

interface User {
  _id: string;
  username: string;
  isAdmin: boolean;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem('token'));

  const isAuthenticated = computed(() => !!token.value);
  const isAdmin = computed(() => user.value?.isAdmin || false);

  // 登录
  // Login
  const login = async (userData: any) => {
    const response = await api.post('/auth/login', userData);
    token.value = response.data.token;
    user.value = response.data;
    localStorage.setItem('token', token.value as string);
  };

  // 注册
  // Register
  const register = async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    token.value = response.data.token;
    user.value = response.data;
    localStorage.setItem('token', token.value as string);
  };

  // 登出
  // Logout
  const logout = () => {
    token.value = null;
    user.value = null;
    localStorage.removeItem('token');
    // window.location.href = '/login'; // Simple redirect
  };

  // 获取当前用户信息
  // Get Current User
  const fetchUser = async () => {
    if (token.value) {
      try {
        const response = await api.get('/auth/me');
        user.value = response.data;
      } catch (error) {
        logout();
      }
    }
  };

  return {
    user,
    token,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
    fetchUser,
  };
});
