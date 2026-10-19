import { apiClient } from '../api/axiosConfig';

// Request to return a book
export const returnBook = async (borrowId) => {
  try {
    const response = await apiClient.post(`/borrow/${borrowId}/returned`);
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || 'Failed Return Book');
  }
};

// get all returned borrows (ADMIN)
export const getReturnedBorrows = async (params) => {
  try {
    const response = await apiClient.get(`/admin/return/book`, { params });
    return response.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || 'Failed Get Returned Borrows'
    );
  }
};

// Confirmed Return Book (ADMIN)
export const confirmReturnBook = async (borrowId) => {
  try {
    const response = await apiClient.post(
      `/admin/return/book/${borrowId}/confirm`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || 'Failed Confirm Return Book'
    );
  }
};
