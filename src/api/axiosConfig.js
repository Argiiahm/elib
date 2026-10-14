import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// initial
let accessToken = null;
let isRefreshed = false;
let failedQueue = [];

export const setAccessToken = (token) => {
  accessToken = token;
};

const processQueue = (error, token = null) => {
  failedQueue.forEach((request) => {
    if (error) {
      request.reject(error);
    } else {
      request.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor
apiClient.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      originalRequest.url?.includes('/auth/refresh')
    ) {
      return Promise.reject(error);
    }

    // Jika Refresh Sedang Berjalan, tunggu..
    if (isRefreshed) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return apiClient(originalRequest);
      });
    }

    // originalRequest._retry = Axios mengulang request pinjam buku tadi dengan token baru.
    // User nggak perlu menekan tombol lagi.
    originalRequest._retry = true;
    isRefreshed = true;

    let newToken;

    try {
      const response = await apiClient.post('/auth/refresh');
      newToken = response.data.data.accessToken;

      if (!newToken) {
        throw new Error('Access token tidak ditemukan');
      }

      setAccessToken(newToken);
      processQueue(null, newToken);
    } catch (error) {
      setAccessToken(null);
      processQueue(error);
      return Promise.reject(error);
    } finally {
      isRefreshed = false;
    }

    originalRequest.headers.Authorization = `Bearer ${newToken}`;
    return apiClient(originalRequest);
  }
);
