import api from '../services/api.js';
import { handleApiError } from './errorHandler';

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { message, status } = handleApiError(error);
    console.error(`API Error (Status: ${status || 'N/A'}):`, message);
    return Promise.reject({ message, status });
  }
);