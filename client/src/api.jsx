import axios from 'axios';

const api = axios.create({
  baseURL: 'https://resumatch-backend-hud2d3crdue2d3ad.eastus2-01.azurewebsites.net',
  withCredentials: true,  // ✅ 關鍵：讓瀏覽器送出 Cookie / JWT header
  // For local development, you can switch this:
  // baseURL: 'http://localhost:8080',
});

export default api;
