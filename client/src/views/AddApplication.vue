<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useApplicationStore } from '../stores/applications';
import { useRouter } from 'vue-router';

const company = ref('');
const position = ref('');
const status = ref('applied');
const date = ref(new Date().toISOString().split('T')[0]);
const note = ref('');

const appStore = useApplicationStore();
const router = useRouter();

const resetForm = () => {
  company.value = '';
  position.value = '';
  status.value = 'applied';
  date.value = new Date().toISOString().split('T')[0];
  note.value = '';
};

onMounted(() => {
  resetForm();
});

const handleSubmit = async () => {
  try {
    await appStore.addApplication({
      company: company.value,
      position: position.value,
      status: status.value,
      date: date.value,
      note: note.value,
    });
    router.push('/');
  } catch (error) {
    alert('添加失败');
  }
};
</script>

<template>
  <div class="bg-white shadow sm:rounded-lg">
    <div class="px-4 py-5 sm:p-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900">新增投递记录</h3>
      <form class="mt-5 space-y-6" @submit.prevent="handleSubmit" autocomplete="off">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label for="company" class="block text-sm font-medium text-gray-700">公司名称</label>
            <input type="text" id="company" v-model="company" required autocomplete="off" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>

          <div>
            <label for="position" class="block text-sm font-medium text-gray-700">岗位名称</label>
            <input type="text" id="position" v-model="position" required autocomplete="off" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>

          <div>
            <label for="status" class="block text-sm font-medium text-gray-700">状态</label>
            <select id="status" v-model="status" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value="applied">已投递</option>
              <option value="interview">面试中</option>
              <option value="offer">已录用</option>
              <option value="reject">被拒绝</option>
            </select>
          </div>

          <div>
            <label for="date" class="block text-sm font-medium text-gray-700">投递日期</label>
            <input type="date" id="date" v-model="date" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>

          <div class="sm:col-span-2">
            <label for="note" class="block text-sm font-medium text-gray-700">备注</label>
            <textarea id="note" v-model="note" rows="3" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
          </div>
        </div>

        <div class="flex justify-end">
          <router-link to="/" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            取消
          </router-link>
          <button type="submit" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            保存
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
