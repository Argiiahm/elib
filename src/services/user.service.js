import { apiClient } from '../api/axiosConfig';

export const getUsers = async (params) => {
  try {
    const response = await apiClient.get('/elib/admin/users', { params });
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || 'Failed to fetch users');
  }
};

export const createUser = async (data) => {
  try {
    const response = await apiClient.post('/elib/admin/user', data);
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || 'Failed to create user');
  }
};

export const updateUser = async (id, data) => {
  try {
    const response = await apiClient.put(`/elib/admin/user/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || 'Failed to update user');
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await apiClient.delete(`/elib/admin/user/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || 'Failed to delete user');
  }
};
