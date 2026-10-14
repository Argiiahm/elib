import { apiClient } from '../api/axiosConfig';

export const getCategories = async () => {
  try {
    const response = await apiClient.get('/categories');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch Categories');
  }
};

export const getCategory = async (id) => {
  try {
    const response = await apiClient.get(`/category/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch Category');
  }
};
