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
