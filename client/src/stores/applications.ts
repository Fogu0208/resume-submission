import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '../api';

export interface Application {
  _id: string;
  company: string;
  position: string;
  status: 'applied' | 'interview' | 'offer' | 'reject';
  date: string;
  note?: string;
  user?: {
    username: string;
  };
}

export const useApplicationStore = defineStore('application', () => {
  const applications = ref<Application[]>([]);
  const loading = ref(false);

  // 获取所有投递记录
  // Get all applications
  const fetchApplications = async () => {
    loading.value = true;
    try {
      const response = await api.get('/applications');
      applications.value = response.data;
    } catch (error) {
      console.error('Fetch failed', error);
    } finally {
      loading.value = false;
    }
  };

  // 新增投递记录
  // Add application
  const addApplication = async (appData: any) => {
    const response = await api.post('/applications', appData);
    applications.value.push(response.data);
  };

  // 更新投递记录
  // Update application
  const updateApplication = async (id: string, appData: any) => {
    const response = await api.put(`/applications/${id}`, appData);
    const index = applications.value.findIndex(app => app._id === id);
    if (index !== -1) {
      applications.value[index] = response.data;
    }
  };

  // 删除投递记录
  // Delete application
  const deleteApplication = async (id: string) => {
    await api.delete(`/applications/${id}`);
    applications.value = applications.value.filter(app => app._id !== id);
  };

  // 获取单个记录 (用于编辑)
  // Get single application
  const getApplicationById = (id: string) => {
    return applications.value.find(app => app._id === id);
  };

  return {
    applications,
    loading,
    fetchApplications,
    addApplication,
    updateApplication,
    deleteApplication,
    getApplicationById,
  };
});
