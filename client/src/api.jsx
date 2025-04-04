import axios from 'axios';

const api = axios.create({
  baseURL: 'https://resumatch-backend-hud2d3crdue2d3ad.eastus2-01.azurewebsites.net',
  withCredentials: true,
  // For local development, you can switch this:
  // baseURL: 'http://localhost:8080',
});

export default api;
