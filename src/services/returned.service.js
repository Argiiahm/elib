import { apiClient } from '../api/axiosConfig';

export const returnBook = async (borrowId) => {
  try {
    const response = await apiClient.post(`/borrow/${borrowId}/returned`);
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || 'Failed Return Book');
  }
};
