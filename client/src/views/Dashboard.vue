<script setup lang="ts">
import { onMounted } from 'vue';
import { useApplicationStore } from '../stores/applications';
import { useAuthStore } from '../stores/auth';

const appStore = useApplicationStore();
const authStore = useAuthStore();

onMounted(() => {
  appStore.fetchApplications();
});

const handleDelete = async (id: string) => {
  if (confirm('确定要删除这条记录吗？')) {
    await appStore.deleteApplication(id);
  }
};

const statusColors: Record<string, string> = {
  applied: 'bg-blue-100 text-blue-800',
  interview: 'bg-yellow-100 text-yellow-800',
  offer: 'bg-green-100 text-green-800',
  reject: 'bg-red-100 text-red-800',
};

const statusLabels: Record<string, string> = {
  applied: '已投递',
  interview: '面试中',
  offer: '已录用',
  reject: '被拒绝',
};
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-900">投递记录</h2>
      <router-link to="/add" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
        新增投递
      </router-link>
    </div>

    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <ul v-if="appStore.applications.length > 0" class="divide-y divide-gray-200">
        <li v-for="app in appStore.applications" :key="app._id">
          <div class="px-4 py-4 sm:px-6">
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium text-indigo-600 truncate">
                {{ app.company }} - {{ app.position }}
              </p>
              <div class="ml-2 flex-shrink-0 flex">
                <span :class="[statusColors[app.status], 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full']">
                  {{ statusLabels[app.status] }}
                </span>
              </div>
            </div>
            <div class="mt-2 sm:flex sm:justify-between">
              <div class="sm:flex">
                <p class="flex items-center text-sm text-gray-500">
                  投递时间: {{ new Date(app.date).toLocaleDateString() }}
                </p>
                <p v-if="authStore.isAdmin && app.user" class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                  用户: {{ app.user.username }}
                </p>
              </div>
              <div class="mt-2 flex items-center text-sm sm:mt-0">
                <router-link :to="`/edit/${app._id}`" class="text-indigo-600 hover:text-indigo-900 mr-4">
                  编辑
                </router-link>
                <button @click="handleDelete(app._id)" class="text-red-600 hover:text-red-900">
                  删除
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div v-else class="text-center py-10 text-gray-500">
        暂无记录
      </div>
    </div>
  </div>
</template>
