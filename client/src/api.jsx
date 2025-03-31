import axios from 'axios';

const api = axios.create({
  // For local development, you can switch this:
  baseURL: 'http://localhost:8080',
});

export default api;
