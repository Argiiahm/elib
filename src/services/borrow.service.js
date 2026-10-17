import { apiClient } from '../api/axiosConfig';

export const myBorrow = async () => {
  try {
    const response = await apiClient.get('/borrows');
    return response.data;
  } catch (error) {
    throw new Error('Failed Fetch Borrow');
  }
};

export const borrowBook = async (bookId) => {
  try {
    const response = await apiClient.post('/borrow/book', { bookId });
    return response.data;
  } catch (error) {
    throw new Error('Failed Request BorrowBook.');
  }
};

// get all borrows admin
export const getAllBorrows = async (params) => {
  try {
    const response = await apiClient.get('/admin/borrows', {
      params,
    });
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || 'Failed Fetch Borrows.');
  }
};

// Accept Borrow
export const acceptBorrow = async (borrowId, data) => {
  try {
    const response = await apiClient.put(
      `/admin/borrow/book/${borrowId}/accepted`,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || 'Failed Accept Borrow.');
  }
};

// Accept Borrow
export const rejectBorrow = async (borrowId) => {
  try {
    const response = await apiClient.put(
      `/admin/borrow/book/${borrowId}/rejected`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || 'Failed Rejected Borrow.'
    );
  }
};
