import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', 
});

export const setAuth = (username, password) => {
  if (!username || !password) {
    localStorage.removeItem('auth');
    delete api.defaults.headers.common['Authorization'];
    return;
  }
  const authHeader = `Basic ${btoa(`${username}:${password}`)}`;
  localStorage.setItem('auth', authHeader); 
  api.defaults.headers.common['Authorization'] = authHeader;
};

export const clearAuth = () => {
  localStorage.removeItem('auth');
  delete api.defaults.headers.common['Authorization'];
};

api.interceptors.request.use((config) => {
  const authHeader = localStorage.getItem('auth');
  if (authHeader) {
    config.headers.Authorization = authHeader;
  }
  return config;
});

export const registerUser = (userData) => api.post('/auth/register', userData);
export const getUser = () => api.get('/auth/current-user');
export const addTransaction = (transaction) => api.post('/transactions/add', transaction);
export const getTransactions = () => api.get('/transactions/all');
export const deleteTransaction = (id) => api.delete(`/transactions/${id}`);

export default api;