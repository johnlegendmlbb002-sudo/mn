import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';

// Create a centralized Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
  // timeout: 10000, // Optional: add a timeout for requests
});

// ==========================================
// REQUEST INTERCEPTOR
// ==========================================
api.interceptors.request.use(
  (config) => {
    // We only have access to localStorage on the client-side
    if (typeof window !== 'undefined') {
      const token = useAuthStore.getState().token || localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ==========================================
// RESPONSE INTERCEPTOR
// ==========================================
api.interceptors.response.use(
  (response) => {
    // You can modify the response data here before it reaches the component
    // e.g., returning response.data directly so you don't have to destructure it everywhere
    return response;
  },
  (error) => {
    // Centralized error handling
    if (error.response) {
      const status = error.response.status;
      
      // Handle Unauthorized (401) globally
      if (status === 401) {
        console.warn('Unauthorized access. Clearing session.');
        if (typeof window !== 'undefined') {
          // Clean up auth state on client side if token expires
          useAuthStore.getState().logout();
          localStorage.removeItem('token');
          // Optional: redirect to login
          // window.location.href = '/login';
        }
      }

      // Handle forbidden (403)
      if (status === 403) {
        console.warn('Access Forbidden.');
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network Error: No response received', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request Error:', error.message);
    }

    // Always reject the promise so the component can handle specific errors if needed
    return Promise.reject(error);
  }
);

export default api;
