import { apiClient, setAccessToken } from '../../../api/axiosConfig';

export const register = async (data) => {
  try {
    const res = await apiClient.post('/auth/register', data);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed Register');
  }
};

export const login = async (data) => {
  try {
    const response = await apiClient.post('/auth/login', data);
    const token = response.data.data.accessToken;
    setAccessToken(token);
    return token;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed Login');
  }
};

export const refreshToken = async () => {
  try {
    const response = await apiClient.post('/auth/refresh');
    const token = response.data.data.accessToken;

    if (!token) {
      throw new Error('Invalid AccessToken');
    }

    setAccessToken(token);
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed RefreshToken');
  }
};

export const getMe = async () => {
  try {
    const response = await apiClient.get('/auth/me');
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed Me');
  }
};

export const logout = async () => {
  try {
    await apiClient.post('/auth/logout');
    setAccessToken(null);
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed Logout');
  }
};
