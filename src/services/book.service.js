import { apiClient } from '../api/axiosConfig';

export const getBooks = async (params, signal) => {
  try {
    const response = await apiClient.get('/books/', {
      params,
      signal,
    });
    return response.data;
  } catch (error) {
    throw new Error(error, 'Failed Fetch Data Books.');
  }
};

export const getBook = async (id) => {
  try {
    const response = await apiClient.get(`/book/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error, 'Failed Fetch Data Book.');
  }
};

export const createBook = async (data) => {
  try {
    const response = await apiClient.post('/book', data);
    return response.data;
  } catch (error) {
    throw new Error(error, 'Failed Create Book.');
  }
};

export const updateBook = async (id, data) => {
  try {
    const response = await apiClient.put(`/book/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error, 'Failed Update Book.');
  }
};

export const deleteBook = async (id) => {
  try {
    const response = await apiClient.delete(`/book/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error, 'Failed Delete Book.');
  }
};
