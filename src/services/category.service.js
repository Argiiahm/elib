import { apiClient } from '../api/axiosConfig';

export const getCategories = async (params, signal) => {
  try {
    const response = await apiClient.get('/categories', { params, signal });
    return response.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || 'Failed Fetch Categories'
    );
  }
};

export const getCategory = async (id) => {
  try {
    const response = await apiClient.get(`/category/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || 'Failed Fetch Category');
  }
};

export const createCategory = async (data) => {
  try {
    const response = await apiClient.post('/category', data);
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || 'Failed Create Category');
  }
};

export const updateCategory = async (id, data) => {
  try {
    const response = await apiClient.put(`/category/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || 'Failed Update Category');
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await apiClient.delete(`/category/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || 'Failed Delete Category');
  }
};
